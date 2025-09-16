
import React, { useState } from "react";
import vaultboy from "../assets/avatar.png";
import "../css/About.css"

const skills = [
  {
    name: "Origin Story",
    desc: "Texas born and raised, I've always been passionate about science and technology. When I was young, I wanted to be an astronaut, but I quickly found out that I was afraid of heights. After seeing my Dad create something new on the computer, I knew I wanted to be a developer.",
    img: vaultboy,
  },
  {
    name: "Long-Term Vision",
    desc: "I want to craft user focused experiences and I want to learn as much as possible. I constantly strive to improve my skills and knowledge in web development, design, and user experience that blend creativity with robust functionality.",
    img: vaultboy,
  },
  {
    name: "Inspiration",
    desc: "I'm a huge Fallout, Nier, Final Fantasy, Dungeons&Dragons, Bioshock, and Super Mario fan. Just to name a few. I love the way these games tell stories and create immersive worlds. They inspire me to create my own unique experiences through web development and game development.",
    img: vaultboy,
  },
  {
    name: "Areas of Expertise",
    desc: "Software Development, Web Design, User Experience, Fullstack Development, Cybersecurity, Augmented Reality, Game Design, Large Language Models, Natural Language Processing, and more.",
    img: vaultboy,
  },
  {
    name: "Our Princess is in Another Castle",
    desc: "When I'm not coding, you can find me exploring the great outdoors, reading sci-fi or epic fantasy novels, thrifting, trying to find the best matcha, going to concerts, or playing video games. I love to travel and experience new cultures, and I often draw inspiration from my adventures for my projects.",
    img: vaultboy,
  },
];

const About = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="pipboy-about-main">
      <div className="pipboy-about-grid">
        <div className="pipboy-about-left">
          <div className="pipboy-name-bar">Name: Rachel Johnson</div>
          <ul className="pipboy-skill-list">
            {skills.map((skill, i) => (
              <React.Fragment key={skill.name + i}>
                <li
                  className={selected === i ? "selected" : ""}
                  onClick={() => setSelected(i)}
                  tabIndex={0}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected(i)}
                  role="button"
                  aria-pressed={selected === i}
                >
                  <span className="pipboy-skill-name">{skill.name}</span>
                </li>
                {/* Accordion content directly under the selected topic on mobile */}
                {selected === i && (
                  <div className="pipboy-skill-accordion">
                    <div className="pipboy-skill-accordion-content">
                      <img
                        src={skill.img}
                        alt={skill.name}
                        className="vaultboy-img"
                      />
                      <div className="pipboy-skill-detail">
                        <h2>{skill.name}</h2>
                        <p>{skill.desc}</p>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
        </ul>
        </div>
        {/* Desktop right panel */}
        <div className="pipboy-about-right">
          <img
            src={skills[selected].img || vaultboy}
            alt={skills[selected].name}
            className="vaultboy-img"
          />
          <div className="pipboy-skill-detail">
            <h2>{skills[selected].name}</h2>
            <p>{skills[selected].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;