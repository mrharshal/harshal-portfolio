import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Available for opportunities
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="hero-title-gradient">Harshal</span>
        </h1>

        <p className="hero-subtitle">
          Full Stack Developer specializing in{' '}
          <span className="hero-subtitle-highlight">MERN Stack</span>
        </p>

        <p className="hero-description">
          I build modern web applications and mobile apps that deliver
          exceptional user experiences
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/harshalshirsath" target="_blank" rel="noopener noreferrer" className="hero-social">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/harshalshirsath" target="_blank" rel="noopener noreferrer" className="hero-social">
            <FaLinkedin />
          </a>
          <a href="mailto:harshalshirsath2001@gmail.com" className="hero-social">
            <FaEnvelope />
          </a>
        </div>

        <a href="#about" className="hero-scroll">
          <FaArrowDown className="hero-scroll-icon" />
        </a>
      </div>
    </section>
  )
}

export default Hero
