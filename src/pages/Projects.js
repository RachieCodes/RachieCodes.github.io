import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import "../css/Projects.css";
import "../css/UniversalButtons.css";

const featuredProjects = [
   {
    id: 1,
    title: "The Girl on Pheta-3",
    description: "A small interactive experience about sibling connection through games. Won the JADS Game Jam 2025 and Best Audio Category.",
    technologies: [
      { name: "Godot", purpose: "Game Engine" },
      { name: "Blender", purpose: "3D Modeling & Animation" },
      { name: "GDScript", purpose: "Game Logic Programming" },
      { name: "Pixel Art", purpose: "Visual Design" }
    ],
    liveUrl: "https://iriyams.itch.io/the-girl-on-pheta-3",
    featured: true
  },
];

const Projects = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="pipboy-main projects-main">
      <div className="projects-container">
        <div className="projects-header">
          <h1>Some Things I've Built</h1>
          <Link 
            to="/projects/archive" 
            className="btn-primary"
            onMouseEnter={() => setHoveredButton('archive')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <AnimatedText 
              text="[ Access the Archive ]" 
              isHovered={hoveredButton === 'archive'}
            />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <a key={project.id} href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card-link">
                <div className="project-card">
                  <div className="project-content">
                    <p className="project-featured">[Featured Project]</p>
                    <h3 className="project-title">
                      {project.title}
                    </h3>
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                  <div className="project-tech-section">
                    <h4 className="tech-label">Built with:</h4>
                    <ul className="project-tech-list">
                      {project.technologies.map((tech, i) => (
                        <li key={i}>
                          <span className="tech-name">{tech.name}</span>
                          <span className="tech-purpose"> — {tech.purpose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                  {project.stars && (
                    <div className="project-stats">
                      <i className="fas fa-star"></i> {project.stars}
                    </div>
                  )}
                  {project.installs && (
                    <div className="project-stats">
                      <i className="fas fa-download"></i> {project.installs}
                    </div>
                  )}
                </div>
              </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <div className="terminal-loading">
              <pre className="loading-text">
                {`> STATUS: SCANNING FOR PROJECTS...
                > LOCATION: GitHub Repositories
                > 
                > [████████████████████████████████] 100%
                > 
                > PROJECTS LOADED: ${featuredProjects.length}
                > 
                > [ MORE PROJECTS COMING SOON ]`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;