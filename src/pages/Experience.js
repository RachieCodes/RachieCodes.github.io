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
      "Software Developer (2022-2025) - Frontend development and UX specialist.",
    tasks: [
      "FORM CONV: +250% conversion rate improvement",
      "AR PROJECT: Gold Addy Award winner (2025)",
      "BLOG DESIGN: Enhanced user engagement metrics",
      "MIGRATION: Managed regional content segmentation",
      "WP DEV: Custom blocks and plugin development",
      "DEVOPS: Docker/Kubernetes implementation",
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
        
        {/* Fallout-style footer */}
        <div className="pipboy-experience-footer">
          <div className="pipboy-button">Status</div>
          <div className="pipboy-button">S.P.E.C.I.A.L</div>
          <div className="pipboy-nav-buttons">
            <div 
              className="pipboy-button selected"
              onClick={() => navigate("/skills")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/skills")}
            >Skills</div>
            <div className="pipboy-button">Perks</div>
            <div className="pipboy-button">General</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;