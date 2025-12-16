import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiPaperAirplane } from 'react-icons/hi'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    
    try {
      // Use proxy for localhost, direct URL for production
      const apiUrl = window.location.hostname === 'localhost' 
        ? '/api/contact' 
        : 'https://harshal-portfolio-w409.onrender.com/api/contact';
      
      // Add 8 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId);
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Success response:', data);
        setStatus({ 
          type: 'success', 
          message: 'Message sent successfully! Thank you for contacting me.' 
        })
        // Reset form immediately
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const errorData = await response.text();
        console.log('Error response:', errorData);
        setStatus({ 
          type: 'error', 
          message: `Failed to send message (${response.status}). Please try again.` 
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      if (error.name === 'AbortError') {
        setStatus({ 
          type: 'error', 
          message: 'Request timeout. Please try again.' 
        })
      } else {
        setStatus({ 
          type: 'error', 
          message: 'Network error. Please try again.' 
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactDetails = [
    { icon: <FaEnvelope />, label: 'Email', value: 'harshalshirsath2001@gmail.com', href: 'mailto:harshalshirsath2001@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+91 8308072730', href: 'tel:+918308072730' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Jalgaon, Maharashtra, India', href: null },
  ]

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together!
          </p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-info-header">
              <h3>Let's talk</h3>
              <p>
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </div>

            <div className="contact-details">
              {contactDetails.map((detail, index) => (
                <a 
                  key={index} 
                  href={detail.href || '#'} 
                  className="contact-detail"
                  style={{ cursor: detail.href ? 'pointer' : 'default' }}
                >
                  <div className="contact-detail-icon">{detail.icon}</div>
                  <div>
                    <p className="contact-detail-label">{detail.label}</p>
                    <p className="contact-detail-value">{detail.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-socials">
              <a href="https://github.com/harshalshirsath" target="_blank" rel="noopener noreferrer" className="contact-social">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/harshalshirsath" target="_blank" rel="noopener noreferrer" className="contact-social">
                <FaLinkedin />
              </a>
              <a href="mailto:harshalshirsath2001@gmail.com" className="contact-social">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <HiPaperAirplane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
