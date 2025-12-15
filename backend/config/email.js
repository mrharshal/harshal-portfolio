const nodemailer = require('nodemailer');

// Create a working Gmail transporter
const createTransporter = () => {
  return nodemailer.createTransport({
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
};

// Send notification email to admin
const sendNotificationEmail = async (messageData) => {
  try {
    console.log('📧 Sending notification email to admin...');
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact: ${messageData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
              <div style="background: rgba(255,255,255,0.15); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px; color: white;">📧</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Portfolio inquiry received</p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              
              <!-- Contact Details -->
              <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 16px; font-weight: 600;">Contact Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500; width: 80px;">Name:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${messageData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Email:</td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${messageData.email}" style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 500;">${messageData.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Subject:</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${messageData.subject}</td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="background: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #1e293b; margin: 0 0 12px; font-size: 16px; font-weight: 600;">Message</h3>
                <p style="color: #475569; line-height: 1.6; margin: 0; font-size: 14px; white-space: pre-wrap;">${messageData.message}</p>
              </div>

              <!-- Action Buttons -->
              <div style="text-align: center; margin-bottom: 20px;">
                <a href="mailto:${messageData.email}?subject=Re: ${encodeURIComponent(messageData.subject)}" 
                   style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; margin: 0 8px;">
                  Reply via Email
                </a>
                <a href="tel:+918308072730" 
                   style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; margin: 0 8px;">
                  Call Back
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Received on ${new Date().toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit', 
                  minute: '2-digit'
                })} • Portfolio Contact System
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent successfully');
    return result;
    
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error.message);
    throw error;
  }
};

// Send auto-reply to user
const sendAutoReply = async (messageData) => {
  try {
    console.log('📧 Sending auto-reply to user:', messageData.email);
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: messageData.email,
      subject: `Thank you for contacting me, ${messageData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - Harshal Shirsath</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #059669, #047857); padding: 30px; text-align: center;">
              <div style="background: rgba(255,255,255,0.15); width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px; color: white;">✓</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Thank You!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Your message has been received</p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              
              <!-- Personal Greeting -->
              <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0 0 10px;">
                  Hi ${messageData.name},
                </h2>
                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0;">
                  Thank you for reaching out! I've received your message about "<strong>${messageData.subject}</strong>" and appreciate you taking the time to contact me.
                </p>
              </div>

              <!-- What's Next -->
              <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 16px; font-weight: 600;">What happens next?</h3>
                <div style="space-y: 12px;">
                  <div style="display: flex; align-items: start; margin-bottom: 12px;">
                    <span style="color: #059669; font-size: 16px; margin-right: 10px; margin-top: 2px;">✓</span>
                    <div>
                      <p style="color: #374151; margin: 0; font-size: 14px; font-weight: 500;">I'll review your message carefully</p>
                      <p style="color: #6b7280; margin: 2px 0 0; font-size: 13px;">Every inquiry gets my personal attention</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: start; margin-bottom: 12px;">
                    <span style="color: #059669; font-size: 16px; margin-right: 10px; margin-top: 2px;">⏰</span>
                    <div>
                      <p style="color: #374151; margin: 0; font-size: 14px; font-weight: 500;">Expect a response within 24-48 hours</p>
                      <p style="color: #6b7280; margin: 2px 0 0; font-size: 13px;">I'll get back to you as soon as possible</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: start;">
                    <span style="color: #059669; font-size: 16px; margin-right: 10px; margin-top: 2px;">📞</span>
                    <div>
                      <p style="color: #374151; margin: 0; font-size: 14px; font-weight: 500;">Urgent? Call me directly</p>
                      <p style="color: #6b7280; margin: 2px 0 0; font-size: 13px;">
                        <a href="tel:+918308072730" style="color: #2563eb; text-decoration: none;">+91 8308072730</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Connect Section -->
              <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center;">
                <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 16px; font-weight: 600;">Let's connect!</h3>
                <p style="color: #64748b; margin: 0 0 15px; font-size: 14px;">Check out my work while you wait for my response</p>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                  <a href="https://github.com/harshalshirsath" 
                     style="display: inline-block; background: #374151; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/harshalshirsath" 
                     style="display: inline-block; background: #0077b5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 500;">
                    LinkedIn
                  </a>
                </div>
              </div>

              <!-- Signature -->
              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
                <p style="color: #1e293b; margin: 0 0 5px; font-size: 16px; font-weight: 600;">Harshal Shirsath</p>
                <p style="color: #64748b; margin: 0 0 8px; font-size: 14px;">Full Stack Developer</p>
                <p style="color: #64748b; margin: 0; font-size: 13px;">
                  <a href="mailto:harshalshirsath2001@gmail.com" style="color: #2563eb; text-decoration: none;">harshalshirsath2001@gmail.com</a>
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                This is an automated confirmation • ${new Date().toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply sent successfully');
    return result;
    
  } catch (error) {
    console.error('❌ Failed to send auto-reply:', error.message);
    throw error;
  }
};

module.exports = {
  sendNotificationEmail,
  sendAutoReply
};