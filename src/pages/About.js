
import React from "react";
import photo from "../assets/stylized_photo.jpg";
import "../css/About.css";

const aboutContent = [
  "Hi, I'm Rachel Johnson - a Full Stack Developer based out of Dallas, Texas. I like to learn new things and build innovative web applications.",
  "I want to craft user focused experiences and I want to learn as much as possible. I constantly strive to improve my skills and knowledge in web development, design, and user experience that blend creativity with robust functionality.",
  "I have been a fan of Final Fantasy, Dungeons&Dragons, Bioshock, and Super Mario Era. Just to name a few. I love the way these games tell stories and create immersive worlds. They inspire me to bring that same level of creativity and engagement to the applications I build.",
  "When I'm not coding, you can find me exploring the great outdoors, reading sci-fi or epic fantasy novels, thrifting, trying to find the best matcha, going to concerts, or playing video games. I love to stay curious and keep learning!",
];

const About = () => {
  return (
    <div className="pipboy-container">
      <div className="noise-overlay"></div>
      <div className="scanlines"></div>

      <div className="pipboy-content">
        {/* LEFT PANEL */}
        <div className="pipboy-left-panel">
          <div className="pipboy-section-title">⊳ PERSONNEL FILE</div>
          
          <div className="pipboy-profile-image">
            <img 
              src={photo}
              alt="Profile" 
              className="profile-img"
            />
          </div>

          <div className="pipboy-detail-container">
            <div className="detail-item">
              <span className="detail-label">NAME:</span>
              <span className="detail-value">Rachel Johnson</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">OCCUPATION:</span>
              <span className="detail-value">Full Stack Developer</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">LOCATION:</span>
              <span className="detail-value">Dallas, Texas</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">STATUS:</span>
              <span className="detail-value">Available for Hire</span>
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-title">⊳ CONTACT</div>
            <div className="contact-links">
              <a href="mailto:RachieCodes@outlook.com" className="contact-link">
                [Email]
              </a>
              <a href="https://www.linkedin.com/in/rachel-johnson-codes/" target="_blank" rel="noopener noreferrer" className="contact-link">
                [LinkedIn]
              </a>
              <a href="https://github.com/RachieCodes" target="_blank" rel="noopener noreferrer" className="contact-link">
                [GitHub]
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="pipboy-right-panel">
          <div className="section-header">ABOUT ME</div>
          <div className="about-text">
            {aboutContent.map((text, i) => (
              <p key={i}>
                <span className="bullet">{'>'}</span> {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;