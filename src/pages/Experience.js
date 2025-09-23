import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Experience.css";

// Add skill levels that match Fallout's format
const quests = [
  {
    title: "Google UX Design",
    description:
      "Completed the Google UX Design Professional Certificate in 2025, gaining skills in user research, wireframing, prototyping, and usability testing.",
    tasks: [
      "Built wireframes, user flows, and prototypes",
      "Tested early concepts and conducted research",
      "Built dynamic user interfaces and learned how to build prototypes",
    ],
  },
  {
    title: "Paycom",
    description:
      "Software Developer (2022-2025) - Website/Frontend development.",
    tasks: [
      "Multi-Step Form Project: +250% conversion rate",
      "Augmented Reality Project: Led a project that won the American Advertising Awards Oklahoma Gold Addy Award (2025)",
      "Blog Design: Revamped the blog design and enhanced user engagement metrics",
      "Migration: Managed regional content segmentation",
      "WP Dev: Developed custom WordPress blocks, taxonomies, metadata, and plugins to enhance website functionality and user experience",
      "DevOps: Docker/Kubernetes container implementation",
    ],
  },
  {
    title: "UNT Computer Science",
    description:
      "Bachelor of Science in Computer Science, Minor in Mathematics, and Technical Writing Certificate.",
    tasks: [
      "Automata Theory",
      "Natural Language Processing",
      "Operating Systems",
      "Data Structures and Algorithms",
      "Fundamentals of Database Systems",
      "UNT Cybersecurity Club Officer",
    ],
  },
];

const Experience = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="pipboy-main">
      <div className="pipboy-experience-grid">
        {/* Left panel - Skills list with up/down arrows */}
        <div className="pipboy-quest-list">
          
          {quests.map((quest, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`pipboy-quest-item${selected === idx ? " selected" : ""}`}
                onClick={() => setSelected(idx)}
                tabIndex={0}
                role="button"
                aria-pressed={selected === idx}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected(idx)}
                style={{paddingLeft: selected === idx ? '2rem' : '1rem'}}
              >
                {quest.title} 
              </div>
              {/* Accordion content for mobile view */}
              {selected === idx && (
                <div className="pipboy-quest-accordion">
                  <div className="pipboy-quest-desc">{quest.description}</div>
                  <div className="pipboy-quest-tasks">
                    {quest.tasks.map((task, i) => (
                      <div key={i} className="pipboy-task">
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Right panel - Details with description */}
        <div className="pipboy-quest-details">
          <div className="pipboy-quest-desc">{quests[selected].description}</div>
          <div className="pipboy-quest-tasks">
            {quests[selected].tasks.map((task, i) => (
              <div key={i} className="pipboy-task">
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;