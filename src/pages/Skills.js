import map from "../assets/map.png";
import "../css/Skills.css";

const skills = [
  {
    name: "React",
    icon: <i className="fab fa-react"></i>,
    top: "28%",
    left: "68%",
  },
  {
    name: "JavaScript",
    icon: <i className="fab fa-js-square"></i>,
    top: "40%",
    left: "38%",
  },
  {
    name: "CSS",
    icon: <i className="fab fa-css3-alt"></i>,
    top: "65%",
    left: "40%",
  },
  {
    name: "HTML",
    icon: <i className="fab fa-html5"></i>,
    top: "70%",
    left: "60%",
  },
  {
    name: "Go",
    icon: <i className="fa-brands fa-golang"></i>,
    top: "35%",
    left: "20%",
  },
  {
    name: "Node.js",
    icon: <i className="fab fa-node-js"></i>,
    top: "55%",
    left: "80%",
  },
  {
    name: "SQL",
    icon: <i className="fa-solid fa-database"></i>,
    top: "50%",
    left: "62%",
  },
  {
    name: "Java",
    icon: <i className="fab fa-java"></i>,
    top: "38%",
    left: "75%",
  },
  {
    name: "Python",
    icon: <i className="fab fa-python"></i>,
    top: "52%",
    left: "25%",
  },
  {
    name: "PHP",
    icon: <i className="fab fa-php"></i>,
    top: "75%",
    left: "25%",
  },
  {
    name: "WordPress",
    icon: <i className="fab fa-wordpress"></i>,
    top: "80%",
    left: "70%",
  },
  {
    name: "Github",
    icon: <i className="fab fa-github"></i>,
    top: "20%",
    left: "50%",
  },
  {
    name: "Linux",
    icon: <i className="fab fa-linux"></i>,
    top: "85%",
    left: "45%",
  },
  {
    name: "Japanese",
    icon: <i className="fa-solid fa-language"></i>,
    top: "90%",
    left: "85%",
  },
  {
    name: "Docker",
    icon: <i className="fab fa-docker"></i>,
    top: "85%",
    left: "10%",
  },
];

const Skills = () => (
  <div className="skills-map-container">
    <img className="skills-map-bg" src={map} alt="Skills Map" />
    {skills.map((skill) => (
      <div
        key={skill.name}
        className="skills-map-point"
        style={{ top: skill.top, left: skill.left }}
        title={skill.name}
      >
        <span className="skills-map-icon">{skill.icon}</span>
        <span className="skills-map-label">{skill.name}</span>
      </div>
    ))}
  </div>
);

export default Skills;