import { Link } from "react-router-dom";
import "../css/ProjectsArchive.css";

const allProjects = [
  { 
    year: 2025, 
    title: "Portfolio", 
    type: "Personal Project", 
    tech: [
      { name: "React", purpose: "Frontend Framework" },
      { name: "CSS3", purpose: "Styling & Animations" },
      { name: "JavaScript", purpose: "Interactive Features" },
      { name: "Formspree", purpose: "Contact Form Handling" }
    ], 
    link: "https://rachiecodes.github.io" 
  },
  { 
    year: 2025, 
    title: "The Girl on Pheta-3", 
    type: "Game Project", 
    tech: [
      { name: "Godot", purpose: "Game Engine" },
      { name: "Blender", purpose: "3D Modeling & Animation" },
      { name: "GDScript", purpose: "Game Logic Programming" },
      { name: "Pixel Art", purpose: "Visual Design" }
    ], 
    link: "https://iriyams.itch.io/the-girl-on-pheta-3" 
  }
];

const ProjectsArchive = () => {
  return (
    <div className="pipboy-main archive-main">
      <div className="archive-container">
        <div className="archive-header">
          <Link to="/projects" className="back-link">
            ← All Projects
          </Link>
          <h1>Archive</h1>
        </div>

        {/* Card View for All Screen Sizes */}
        <div className="projects-list">
          {allProjects.map((project, index) => (
            project.link ? (
              <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="archive-card-link">
                <div className="project-card">
                  <div className="project-year">{project.year}</div>
                  <div className="project-title">{project.title}</div>
                  <div className="project-type">{project.type}</div>
                  <div className="project-tech">
                    <h4 className="tech-label">Built with:</h4>
                    <ul>
                      {project.tech.map((tech, i) => (
                        <li key={i}>
                          <span className="tech-name">{tech.name}</span>
                          <span className="tech-purpose"> — {tech.purpose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            ) : (
              <div key={index} className="project-card">
                <div className="project-year">{project.year}</div>
                <div className="project-title">{project.title}</div>
                <div className="project-type">{project.type}</div>
                <div className="project-tech">
                  <h4 className="tech-label">Built with:</h4>
                  <ul>
                    {project.tech.map((tech, i) => (
                      <li key={i}>
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-purpose"> — {tech.purpose}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsArchive;