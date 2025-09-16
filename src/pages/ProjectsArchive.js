import { Link } from "react-router-dom";
import "../css/ProjectsArchive.css";

const allProjects = [
  { 
    year: 2025, 
    title: "Portfolio", 
    type: "Personal Project", 
    tech: ["React", "CSS3", "JavaScript", "Formspree"], 
    link: "https://rachiecodes.github.io" 
  },
  { 
    year: 2025, 
    title: "The Girl on Pheta-3", 
    type: "Game Project", 
    tech: ["Godot", "Blender", "GDScript", "Pixel Art"], 
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
            <div key={index} className="project-card">
              <div className="project-year">{project.year}</div>
              <div className="project-title">{project.title}</div>
              <div className="project-type">{project.type}</div>
              <div className="project-tech">
                <ul>
                  {project.tech.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <div className="project-link">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsArchive;