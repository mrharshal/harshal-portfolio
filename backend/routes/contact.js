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
    setImmediate(() => {
      const emailData = { name, email, subject, message };
      
      // Save to database (background)
      if (mongoose.connection.readyState === 1) {
        newMessage.save()
          .then(saved => console.log('✅ DB saved:', saved._id))
          .catch(err => console.log('❌ DB failed:', err.message));
      }
      
      // Send emails (background)
      sendNotificationEmail(emailData)
        .then(() => console.log('✅ Admin email sent'))
        .catch(err => console.log('❌ Admin email failed'));
      
      sendAutoReply(emailData)
        .then(() => console.log('✅ User email sent'))
        .catch(err => console.log('❌ User email failed'));
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
    
    const testData = {
      name: 'Test User',
      email: userEmail,
      subject: 'Email Functionality Test',
      message: 'This is a test message to verify that email functionality is working correctly.'
    };
    
    let results = {
      adminNotified: false,
      userReplied: false,
      errors: []
    };
    
    // Test admin notification
    try {
      await sendNotificationEmail(testData);
      results.adminNotified = true;
      console.log('✅ Admin notification test passed');
    } catch (error) {
      results.errors.push(`Admin notification failed: ${error.message}`);
      console.error('❌ Admin notification test failed:', error.message);
    }
    
    // Test user auto-reply
    try {
      await sendAutoReply(testData);
      results.userReplied = true;
      console.log('✅ User auto-reply test passed');
    } catch (error) {
      results.errors.push(`Auto-reply failed: ${error.message}`);
      console.error('❌ User auto-reply test failed:', error.message);
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