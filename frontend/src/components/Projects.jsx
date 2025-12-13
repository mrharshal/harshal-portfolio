import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      title: 'Skill-Sync 360',
      description: 'A comprehensive skill management and learning platform that helps users track their skills, set learning goals, and sync their progress. Features include skill assessments, progress tracking, and personalized learning paths.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      category: 'Full Stack',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      github: 'https://github.com/harshalshirsath',
      live: '#',
      featured: true,
    },
    {
      title: 'Matrimony Application',
      description: 'A comprehensive online matrimony application designed to connect individuals looking for matrimonial partners. Features include personalized profiles, match searching based on preferences, and a secure messaging system for communication.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
      category: 'Full Stack',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      github: 'https://github.com/harshalshirsath',
      live: '#',
      featured: true,
    },
    {
      title: 'Neo Bank',
      description: 'A modern digital banking application with features like account management, fund transfers, transaction history, and secure authentication. Built with Java for robust backend processing.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
      category: 'Backend',
      tech: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
      github: 'https://github.com/harshalshirsath',
      live: '#',
    },
    {
      title: 'Task Management System',
      description: 'A web-based task management application for organizing and tracking daily tasks with features like priority setting, due dates, and status tracking.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
      category: 'Full Stack',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      github: 'https://github.com/harshalshirsath',
      live: '#',
    },
  ]

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend']

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Some of the projects I've worked on
          </p>
        </div>

        <div className="projects-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub />
                  </a>
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="project-tech-item">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="https://github.com/harshalshirsath" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View All Projects on GitHub
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
