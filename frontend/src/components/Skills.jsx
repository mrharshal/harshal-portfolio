import {
  FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaDatabase, FaGitAlt, FaGithub, FaReact, FaNodeJs, FaNpm
} from 'react-icons/fa'
import {
  SiMysql, SiPostman, SiMongodb, SiExpress, SiTailwindcss,
  SiRedux, SiNextdotjs, SiTypescript
} from 'react-icons/si'
import { HiCode, HiServer, HiDatabase, HiCog } from 'react-icons/hi'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      subtitle: 'Building user interfaces',
      icon: <HiCode />,
      skills: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'Redux', icon: <SiRedux /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      ]
    },
    {
      title: 'Backend',
      subtitle: 'Server-side development',
      icon: <HiServer />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Express.js', icon: <SiExpress /> },
        { name: 'REST APIs', icon: <HiServer /> },
        { name: 'Python', icon: <FaPython /> },
      ]
    },
    {
      title: 'Database',
      subtitle: 'Data management',
      icon: <HiDatabase />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'MySQL', icon: <SiMysql /> },
        { name: 'SQL', icon: <FaDatabase /> },
      ]
    },
    {
      title: 'Tools & Platforms',
      subtitle: 'Development environment',
      icon: <HiCog />,
      skills: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'NPM', icon: <FaNpm /> },
        { name: 'VS Code', icon: <HiCode /> },
        { name: 'Postman', icon: <SiPostman /> },
      ]
    },
  ]

  const techStack = [
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Redux', icon: <SiRedux /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Tailwind', icon: <SiTailwindcss /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Postman', icon: <SiPostman /> },
  ]

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <div className="skills-header">
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I've been working with
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="skill-category-header">
                <div className="skill-category-icon">{category.icon}</div>
                <div>
                  <h3 className="skill-category-title">{category.title}</h3>
                  <p className="skill-category-subtitle">{category.subtitle}</p>
                </div>
              </div>
              <div className="skill-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <span className="skill-item-icon">{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="tech-marquee">
          <p className="tech-marquee-title">MERN STACK DEVELOPER</p>
          <div className="tech-marquee-track">
            {[...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="tech-marquee-item">
                <span className="tech-marquee-icon">{tech.icon}</span>
                <span className="tech-marquee-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
