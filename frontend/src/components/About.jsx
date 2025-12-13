import { FaReact, FaNodeJs, FaDatabase, FaCode } from 'react-icons/fa'
import { SiMongodb, SiExpress } from 'react-icons/si'
import { HiArrowRight } from 'react-icons/hi'
import './About.css'

const About = () => {
  const highlights = [
    { icon: <FaReact />, text: 'React.js' },
    { icon: <FaNodeJs />, text: 'Node.js' },
    { icon: <SiExpress />, text: 'Express.js' },
    { icon: <SiMongodb />, text: 'MongoDB' },
  ]

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-image">
          <div className="about-image-wrapper">
            <div className="about-image-main">
              <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&h=500&fit=crop" alt="Developer workspace" />
            </div>
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number">8.40</div>
                <div className="about-stat-label">MCA CGPA</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">9.31</div>
                <div className="about-stat-label">BCS CGPA</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">6+</div>
                <div className="about-stat-label">Months Exp.</div>
              </div>
            </div>
          </div>
          <div className="about-decoration"></div>
        </div>

        <div className="about-content">
          <h2>About <span>Me</span></h2>
          <p className="about-tagline">Turning ideas into reality through code</p>

          <p className="about-text">
            I'm Harshal Shirsath, an enthusiastic MERN Stack Developer from Jalgaon, Maharashtra.
            I'm dedicated to contributing to team success through diligence, attention to detail,
            and strong organizational skills.
          </p>

          <p className="about-text">
            With a Master's in Computer Applications (MCA) and hands-on experience from my internship
            at Paarsh Infotech, I specialize in building comprehensive web applications using
            MongoDB, Express.js, React.js, and Node.js. I'm adaptable to various environments and always eager to learn.
          </p>

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <div key={index} className="about-highlight">
                <div className="about-highlight-icon">{item.icon}</div>
                <span className="about-highlight-text">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="about-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work
              <HiArrowRight />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
