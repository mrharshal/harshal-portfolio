require('dotenv').config();
const nodemailer = require('nodemailer');

const testWorkingEmail = async () => {
  console.log('🧪 Testing Working Email Configuration\n');
  
  // Check environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing email credentials in .env file');
    console.log('Make sure you have:');
    console.log('EMAIL_USER=harshalshirsath2001@gmail.com');
    console.log('EMAIL_PASS=your-16-character-app-password');
    process.exit(1);
  }
  
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('🔑 Password Set:', process.env.EMAIL_PASS ? 'Yes' : 'No');
  console.log('📬 Recipient:', process.env.RECIPIENT_EMAIL);
  console.log('');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  try {
    // Test 1: Verify connection
    console.log('🔄 Step 1: Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
    
    // Test 2: Send admin notification
    console.log('🔄 Step 2: Sending admin notification...');
    const adminEmail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Test Admin Notification - Portfolio Contact',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Test Admin Notification</h2>
          <p>This is a test email to verify admin notifications are working.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Name:</strong> Test User</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Subject:</strong> Test Message</p>
            <p><strong>Message:</strong> This is a test message to verify email functionality.</p>
          </div>
          <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
        </div>
      `
    });
    console.log('✅ Admin notification sent! Message ID:', adminEmail.messageId);
    
    // Test 3: Send user auto-reply
    console.log('\n🔄 Step 3: Sending user auto-reply...');
    const userEmail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Auto-Reply - Thank you for contacting me',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #007bff; color: white; padding: 20px; text-align: center;">
            <h1>Thank You!</h1>
            <p>Your message has been received</p>
          </div>
          <div style="padding: 20px;">
            <p>Hi <strong>Test User</strong>,</p>
            <p>Thank you for reaching out! I've received your message and will respond within 24-48 hours.</p>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff;">
              <h3>What happens next?</h3>
              <ul>
                <li>I'll review your message carefully</li>
                <li>You can expect a personal response soon</li>
                <li>For urgent matters, call +91 8308072730</li>
              </ul>
            </div>
            <p>Best regards,<br><strong>Harshal Shirsath</strong></p>
          </div>
          <div style="text-align: center; padding: 10px; background: #f8f9fa; font-size: 12px;">
            <p>This is an automated response. Sent at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    });
    console.log('✅ User auto-reply sent! Message ID:', userEmail.messageId);
    
    console.log('\n🎉 ALL EMAIL TESTS PASSED!');
    console.log('📬 Check your email inbox to verify both emails were received.');
    console.log('✅ Email functionality is working correctly!');
    
  } catch (error) {
    console.error('\n❌ Email test failed:', error.message);
    
    if (error.responseCode === 535) {
      console.log('\n🔧 Authentication Error - Fix Steps:');
      console.log('1. Go to https://myaccount.google.com/security');
      console.log('2. Enable 2-Step Verification');
      console.log('3. Go to App passwords → Generate new password');
      console.log('4. Update EMAIL_PASS in .env with the 16-character password');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n🔧 Network Error - Check your internet connection');
    } else {
      console.log('\n🔧 Error Details:', error);
    }
  }
  
  process.exit(0);
};

testWorkingEmail();