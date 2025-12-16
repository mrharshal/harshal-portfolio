const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');
const { sendNotificationEmail, sendAutoReply } = require('../config/email');
const { validateContactForm, handleValidationErrors } = require('../middleware/validation');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', validateContactForm, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Create new message
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent
    });
    
    // INSTANT RESPONSE - No waiting for anything!
    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        id: Date.now().toString(),
        timestamp: new Date()
      }
    });
    
    // Everything happens in background (zero blocking)
    setImmediate(async () => {
      const emailData = { name, email, subject, message };
      
      console.log('🔄 Processing contact form submission...');
      console.log('📝 Data:', { name, email, subject });
      
      // Save to database (background)
      if (mongoose.connection.readyState === 1) {
        try {
          const saved = await newMessage.save();
          console.log('✅ DB saved:', saved._id);
        } catch (err) {
          console.log('❌ DB failed:', err.message);
        }
      }
      
      // Send emails (background) with detailed logging
      try {
        console.log('📧 Sending admin notification...');
        await sendNotificationEmail(emailData);
        console.log('✅ Admin email sent successfully');
      } catch (err) {
        console.log('❌ Admin email failed:', err.message);
        console.error('Full admin email error:', err);
      }
      
      try {
        console.log('📧 Sending user auto-reply...');
        await sendAutoReply(emailData);
        console.log('✅ User email sent successfully');
      } catch (err) {
        console.log('❌ User email failed:', err.message);
        console.error('Full user email error:', err);
      }
    });
    
    return; // Exit here - no more processing
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contact/messages
// @desc    Get all messages (for admin use)
// @access  Private (you can add authentication later)
router.get('/messages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    
    const query = status ? { status } : {};
    
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent'); // Hide sensitive info
    
    const total = await Message.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
    
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
});

// @route   PUT /api/contact/messages/:id/status
// @desc    Update message status
// @access  Private
router.put('/messages/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: message
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// @route   GET /api/contact/quick-email-test
// @desc    Quick email test
// @access  Public
router.get('/quick-email-test', async (req, res) => {
  try {
    console.log('🧪 Quick email test starting...');
    
    const { sendNotificationEmail, sendAutoReply } = require('../config/email');
    
    const testData = {
      name: 'Quick Test',
      email: 'harshalshirsath2001@gmail.com',
      subject: 'Quick Email Test',
      message: 'This is a quick test to check email functionality.'
    };
    
    // Test both emails
    const adminResult = await sendNotificationEmail(testData);
    const userResult = await sendAutoReply(testData);
    
    res.json({
      success: true,
      message: 'Quick email test completed',
      data: {
        adminSent: !!adminResult,
        userSent: !!userResult,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Quick email test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Quick email test failed',
      error: error.message
    });
  }
});

module.exports = router;

// @route   GET /api/contact/test-db
// @desc    Test database connection and operations
// @access  Public (for testing)
router.get('/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected',
        connectionState: mongoose.connection.readyState
      });
    }
    
    // Test creating and deleting a message
    const testMessage = new Message({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Database Test',
      message: 'This is a test message to verify database operations.'
    });
    
    const saved = await testMessage.save();
    console.log('Test message created:', saved._id);
    
    // Delete the test message
    await Message.findByIdAndDelete(saved._id);
    console.log('Test message deleted');
    
    // Get message count
    const count = await Message.countDocuments();
    
    res.json({
      success: true,
      message: 'Database test successful',
      data: {
        connected: true,
        testPassed: true,
        totalMessages: count,
        connectionState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        database: mongoose.connection.name
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message,
      connectionState: mongoose.connection.readyState
    });
  }
});
// @route   POST /api/contact/test-email
// @desc    Test email functionality
// @access  Public (for testing)
router.post('/test-email', async (req, res) => {
  try {
    const { testEmail } = req.body;
    const userEmail = testEmail || 'test@example.com';
    
    console.log('🧪 Testing email functionality...');
    console.log('📧 Email config check:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
    console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? '✅ Set' : '❌ Missing');
    
    const testData = {
      name: 'Test User',
      email: userEmail,
      subject: 'Email Functionality Test',
      message: 'This is a test message to verify that email functionality is working correctly.'
    };
    
    let results = {
      adminNotified: false,
      userReplied: false,
      errors: [],
      config: {
        emailUser: process.env.EMAIL_USER || 'Not set',
        recipientEmail: process.env.RECIPIENT_EMAIL || 'Not set',
        emailPassSet: !!process.env.EMAIL_PASS
      }
    };
    
    // Test admin notification
    try {
      console.log('🔄 Testing admin notification...');
      await sendNotificationEmail(testData);
      results.adminNotified = true;
      console.log('✅ Admin notification test passed');
    } catch (error) {
      results.errors.push(`Admin notification failed: ${error.message}`);
      console.error('❌ Admin notification test failed:', error.message);
      console.error('Full error:', error);
    }
    
    // Test user auto-reply
    try {
      console.log('🔄 Testing user auto-reply...');
      await sendAutoReply(testData);
      results.userReplied = true;
      console.log('✅ User auto-reply test passed');
    } catch (error) {
      results.errors.push(`Auto-reply failed: ${error.message}`);
      console.error('❌ User auto-reply test failed:', error.message);
      console.error('Full error:', error);
    }
    
    const success = results.adminNotified && results.userReplied;
    
    res.json({
      success,
      message: success ? 'All email tests passed!' : 'Some email tests failed',
      data: {
        testEmail: userEmail,
        adminEmail: process.env.RECIPIENT_EMAIL,
        results,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: error.message
    });
  }
});

// @route   GET /api/contact/debug-config
// @desc    Debug email configuration
// @access  Public (for testing)
router.get('/debug-config', (req, res) => {
  res.json({
    success: true,
    message: 'Email configuration debug info',
    data: {
      emailUser: process.env.EMAIL_USER || 'Not set',
      emailHost: process.env.EMAIL_HOST || 'Not set',
      emailPort: process.env.EMAIL_PORT || 'Not set',
      recipientEmail: process.env.RECIPIENT_EMAIL || 'Not set',
      emailPassSet: !!process.env.EMAIL_PASS,
      nodeEnv: process.env.NODE_ENV || 'Not set',
      timestamp: new Date().toISOString()
    }
  });
});