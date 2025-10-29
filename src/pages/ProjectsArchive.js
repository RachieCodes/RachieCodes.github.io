import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProjectsArchive.css";

const allProjects = [
   { 
    year: 2025, 
    title: "Blog Aggregator", 
    type: "Personal Project",
    status: "Completed",
    description: "Create an RSS (Really Simple Syndication) feed aggregator that collects blog posts from multiple sources and displays them in a unified interface.",
    tech: ["Go"],
    link: "https://github.com/RachieCodes/blogAggregator" 
  },
  { 
    year: 2025, 
    title: "AI Agent", 
    type: "Personal Project",
    status: "Completed",
    description: "An AI-powered personal assistant that helps scan files in a directory, read the file's contents, and execute a python interpreter on the file.",
    tech: ["Python", "Gemini"],
    link: "https://github.com/RachieCodes/AI_Agent" 
  },
  { 
    year: 2025, 
    title: "Portfolio Website", 
    type: "Personal Project",
    status: "Completed",
    description: "A responsive portfolio website showcasing development skills with a Fallout aesthetic. Features interactive elements, smooth animations, and a custom blog system.",
    tech: ["React", "CSS3", "JavaScript", "Formspree"],
    link: "https://rachiecodes.github.io" 
  },
  { 
    year: 2025, 
    title: "The Girl on Pheta-3", 
    type: "Game Project",
    status: "Completed",
    description: "A small interactive experience about making connections through games. How the Team Game Jam 2024 and Best Audio Narratives influenced our approach to immersive environments and emotional storytelling.",
    tech: ["Unity", "C#", "Game Engine", "Dialogue Systems", "Blender", "Game Logic Programming", "Pixel Art", "Visual Design"],
    link: "https://iriyams.itch.io/the-girl-on-pheta-3" 
  },
  { 
    year: 2024, 
    title: "Paycom Blog Redesign", 
    type: "Company Project",
    status: "Completed",
    description: "Complete redesign and development of Paycom's corporate blog platform. Improved user experience, load times, and content management workflows for better engagement.",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    link: "https://www.paycom.com/resources/blog/workforce-management-software-features/" 
  },
  { 
    year: 2024, 
    title: "Paycom Demo Form", 
    type: "Company Project",
    status: "Completed",
    description: "Redesigned and optimized the company's main demo request form. Implemented improved validation, user experience enhancements, and database integration for better lead capture.",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML", "SQL"],
    link: "https://www.paycom.com/demo/" 
  },
    { 
    year: 2021, 
    title: "NLP Projects", 
    type: "Academic Project",
    status: "Completed",
    description: "Projects for NLP coursework involving frequency distribution, Naive Bayes classification, neural networks, and text preprocessing techniques.",
    tech: ["Python", "NLTK", "TensorFlow", "Jupyter Notebook"],
    link: "https://github.com/RachieCodes/NLP" 
  },
  { 
    year: 2021, 
    title: "Lexical Analyzer", 
    type: "Academic Project",
    status: "Completed",
    description: "A comprehensive lexical analyzer built for UNT coursework. Tokenizes source code in R and breaks it into tokens using JFlex.",
    tech: ["Java", "R", "Flex"],
    link: "https://github.com/rachiecodes/lexical-analyzer" 
  },
];

const ProjectsArchive = () => {
  const [selectedProject, setSelectedProject] = useState(allProjects[0]);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Academic Project", "Company Project", "Game Project", "Personal Project"];

  const filteredProjects = activeFilter === "All" 
    ? allProjects 
    : allProjects.filter(project => project.type === activeFilter);

  return (
    <div className="pipboy-projects-archive">
      <div className="archive-header">
        <Link to="/projects" className="back-link">
          ← All Projects
        </Link>
      </div>

      <div className="archive-filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="archive-content">
        <div className="project-list-panel">
          <h2>PROJECT LIST</h2>
          <div className="project-list">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className={`project-item ${selectedProject === project ? 'selected' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-item-title">{project.title}</div>
                <div className="project-item-meta">
                  <span className="project-item-type">{project.type}</span>
                  <span className="project-item-year">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-details-panel">
          <h2>PROJECT DETAILS</h2>
          {selectedProject && (
            <div className="project-details">
              <div className="detail-section">
                <label>NAME:</label>
                <div className="detail-value">{selectedProject.title}</div>
              </div>
              
              <div className="detail-section">
                <label>TYPE:</label>
                <div className="detail-value">{selectedProject.type}</div>
              </div>
              
              <div className="detail-section">
                <label>YEAR:</label>
                <div className="detail-value">{selectedProject.year}</div>
              </div>
              
              <div className="detail-section">
                <label>STATUS:</label>
                <div className="detail-value">{selectedProject.status}</div>
              </div>
              
              <div className="detail-section">
                <label>DESCRIPTION:</label>
                <div className="detail-value description-box">
                  {selectedProject.description}
                </div>
              </div>
              
              <div className="detail-section">
                <label>BUILT WITH:</label>
                <div className="detail-value">
                  {selectedProject.tech && selectedProject.tech.length > 0 ? (
                    <ul className="tech-list">
                      {selectedProject.tech.map((tech, i) => (
                        <li key={i}>• {tech}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="tech-list">
                      <li>• Information not available</li>
                    </div>
                  )}
                </div>
              </div>

              {selectedProject.link && (
                <div className="detail-section">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    → View Project
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsArchive;