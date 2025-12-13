import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ]

  const resources = [
    { name: 'Resume', href: '/resume.pdf' },
    { name: 'GitHub', href: 'https://github.com/harshalshirsath' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/harshalshirsath' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">H</span>
              <span>Harshal</span>
            </div>
            <p className="footer-description">
              Java Full Stack Developer passionate about creating robust,
              functional, and user-friendly web applications.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/harshalshirsath" target="_blank" rel="noopener noreferrer" className="footer-social">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/harshalshirsath" target="_blank" rel="noopener noreferrer" className="footer-social">
                <FaLinkedin />
              </a>
              <a href="mailto:harshalshirsath2001@gmail.com" className="footer-social">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <div className="footer-links">
              {resources.map((link) => (
                <a key={link.name} href={link.href} className="footer-link" target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="mailto:harshalshirsath2001@gmail.com" className="footer-link">harshalshirsath2001@gmail.com</a>
              <a href="tel:+918308072730" className="footer-link">+91 8308072730</a>
              <span className="footer-link">Jalgaon, Maharashtra, India</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Harshal Shirsath
          </p>
          <button onClick={scrollToTop} className="footer-back-to-top">
            Back to top <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
