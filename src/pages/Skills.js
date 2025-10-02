import { useState, useEffect } from "react";
import map from "../assets/map.png";
import "../css/Skills.css";

// Animated text component that scrambles letters before settling
const AnimatedText = ({ text, isHovered }) => {
  const [displayText, setDisplayText] = useState(text);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};

const skills = [
  {
    name: "React",
    icon: <i className="fab fa-react"></i>,
    top: "28%",
    left: "68%",
    url: "https://react.dev/"
  },
  {
    name: "JavaScript",
    icon: <i className="fab fa-js-square"></i>,
    top: "40%",
    left: "38%",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    name: "CSS",
    icon: <i className="fab fa-css3-alt"></i>,
    top: "65%",
    left: "40%",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    name: "HTML",
    icon: <i className="fab fa-html5"></i>,
    top: "70%",
    left: "60%",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    name: "Go",
    icon: <i className="fa-brands fa-golang"></i>,
    top: "35%",
    left: "20%",
    url: "https://golang.org/"
  },
  {
    name: "Node.js",
    icon: <i className="fab fa-node-js"></i>,
    top: "55%",
    left: "80%",
    url: "https://nodejs.org/"
  },
  {
    name: "SQL",
    icon: <i className="fa-solid fa-database"></i>,
    top: "50%",
    left: "62%",
    url: "https://www.w3schools.com/sql/"
  },
  {
    name: "Java",
    icon: <i className="fab fa-java"></i>,
    top: "38%",
    left: "75%",
    url: "https://www.oracle.com/java/"
  },
  {
    name: "Python",
    icon: <i className="fab fa-python"></i>,
    top: "52%",
    left: "25%",
    url: "https://www.python.org/"
  },
  {
    name: "PHP",
    icon: <i className="fab fa-php"></i>,
    top: "75%",
    left: "25%",
    url: "https://www.php.net/"
  },
  {
    name: "WordPress",
    icon: <i className="fab fa-wordpress"></i>,
    top: "80%",
    left: "70%",
    url: "https://wordpress.org/"
  },
  {
    name: "Github",
    icon: <i className="fab fa-github"></i>,
    top: "20%",
    left: "50%",
    url: "https://github.com/RachieCodes"
  },
  {
    name: "Linux",
    icon: <i className="fab fa-linux"></i>,
    top: "85%",
    left: "45%",
    url: "https://www.linux.org/"
  },
  {
    name: "Japanese",
    icon: <i className="fa-solid fa-language"></i>,
    top: "90%",
    left: "85%",
    url: "https://www.japan-guide.com/e/e621.html"
  },
  {
    name: "Docker",
    icon: <i className="fab fa-docker"></i>,
    top: "85%",
    left: "10%",
    url: "https://www.docker.com/"
  },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="skills-map-container">
      <img className="skills-map-bg" src={map} alt="Skills Map" />
      {skills.map((skill) => (
        <a
          key={skill.name}
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
          className="skills-map-point"
          style={{ top: skill.top, left: skill.left }}
          title={`Learn about ${skill.name}`}
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <span className="skills-map-icon">{skill.icon}</span>
          <span className="skills-map-label">
            <AnimatedText 
              text={skill.name} 
              isHovered={hoveredSkill === skill.name}
            />
          </span>
        </a>
      ))}
    </div>
  );
};

export default Skills;