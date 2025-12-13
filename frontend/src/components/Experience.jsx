import { FaGraduationCap, FaCertificate } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const experiences = [
    {
      role: 'Software Developer',
      company: 'Stoic and Salamander Global Corporation, Pune',
      date: 'July 2025 - Present',
      description: 'Working as a Full Stack Developer building modern web applications using MERN Stack. Developing scalable solutions and collaborating with cross-functional teams to deliver high-quality software products.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    },
    {
      role: 'Software Development Intern',
      company: 'Paarsh Infotech Pvt Ltd, Nashik',
      date: 'January 2024 - July 2024',
      description: 'Developed a comprehensive online matrimony application designed to connect individuals looking for matrimonial partners. Built features for personalized profiles, match searching, and secure messaging system.',
      tech: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
    },
  ]

  const education = [
    {
      degree: 'Master of Computer Applications (MCA)',
      school: "RCPET's Institute of Management Research and Development, Shirpur",
      year: 'Nov 2022 - June 2024 | CGPA: 8.40/10.0',
      icon: <FaGraduationCap />,
    },
    {
      degree: 'Bachelor of Computer Science (BCS)',
      school: 'B.P. Arts SMA Science And K.K.C Commerce College, Chalisgaon',
      year: 'Aug 2019 - Aug 2022 | CGPA: 9.31/10.0',
      icon: <FaGraduationCap />,
    },
  ]

  const certifications = [
    {
      title: 'Certified Java',
      issuer: 'Spoken Tutorial, IIT Bombay',
      icon: <FaCertificate />,
    },
    {
      title: 'Certified Java Full Stack Developer',
      issuer: 'SCDL Pune',
      icon: <FaCertificate />,
    },
  ]

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <div className="experience-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My professional journey and work experience
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <span className="experience-date">{exp.date}</span>
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-tech">
                  {exp.tech.map((tech, idx) => (
                    <span key={idx} className="experience-tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="education-section">
          <div className="education-header">
            <h3>Education</h3>
            <p className="section-subtitle">Academic background</p>
          </div>
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">{edu.icon}</div>
                <div>
                  <h4 className="education-degree">{edu.degree}</h4>
                  <p className="education-school">{edu.school}</p>
                  <p className="education-year">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="education-section">
          <div className="education-header">
            <h3>Certifications</h3>
            <p className="section-subtitle">Professional certifications</p>
          </div>
          <div className="education-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">{cert.icon}</div>
                <div>
                  <h4 className="education-degree">{cert.title}</h4>
                  <p className="education-school">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
