import React, { useState } from "react";
import "../css/Experience.css";

const quests = [
  {
    title: "Google UX Design Certificate",
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
      "Worked from 2022-2025 as a Software Developer, focusing on frontend development and user experience on the company's website.",
    tasks: [
      "Increased form conversions by 250% by designing and implementing a new dynamic multi-step form. Utilized: React.js, PHP, Wordpress, HTML, CSS, JavaScript, and Bootstrap.",
      "Led an augmented reality project for the 2024 Paycom Codeathon. The project recieved an Gold Addy Award for Augmented Reality issued by American Advertising Awards Oklahoma 2025. Utilized: AR.Js, Three.js, Python (Demo version)",
      "Revamped the Blog Layout, leading to a notable increase in content engagement and user interaction. Utilized: React.js, PHP, Wordpress, HTML, CSS, JavaScript, and Bootstrap.",
      "A key contributor to content migration for multiple subdomains for regional segmentation. Utilized: React.js, PHP, Wordpress, HTML, CSS, JavaScript, SQL, and Bootstrap.",
      "Developed custom WordPress blocks, taxonomies, metadata, and plugins to enhance website functionality and user experience. Utilized: PHP, WordPress, HTML, CSS, JavaScript, SQL, and Bootstrap.",
      "Helped utilize containerization using Docker and Kubernetes to streamline development and deployment processes.",
      "Identified errors, resolved bugs, and ensured responsive/accessible design across various devices and browsers.",
      "Used Playwright and Jest for testing and debugging.",
    ],
  },
  {
    title: "University of North Texas",
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

  return (
    <div className="pipboy-main">
      <div className="pipboy-experience-grid">
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
              >
                {quest.title}
              </div>
              {/* Accordion content directly under the selected topic on mobile */}
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
        {/* Desktop/tablet details panel */}
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