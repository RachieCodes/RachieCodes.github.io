import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import "../css/Homepage.css";
import "../css/Footer.css";
import "../css/TerminalAnimation.css";

const typewriter = (text, speed, cb, done) => {
  let i = 0;
  let output = "";
  const next = () => {
    if (i < text.length) {
      output += text[i++];
      cb(output);
      setTimeout(next, speed);
    } else if (done) {
      done();
    }
  };
  next();
};

const Home = () => {
  const [statusLoaded, setStatusLoaded] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(() => {
    return !sessionStorage.getItem("AnimationSeen");
  });

  const [statusText, setStatusText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [sessionId] = useState(() => {
    // Generate random 8-character hex string
    return Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
  });
  
  useEffect(() => {
    if (showAnimation) {
      // First initialize the system
      typewriter("Initializing system", 60, setStatusText, () => {
        setTimeout(() => {
          setStatusLoaded(true);
          
          // Then start connection process
          setTimeout(() => {
            typewriter("Establishing secure connection", 50, setLocationText, () => {
              setTimeout(() => {
                setLocationLoaded(true);
                setShowSystemInfo(true);
                
                // Finally show a command prompt
                setTimeout(() => {
                  setShowPrompt(true);
                  
                  // Exit animation after showing prompt
                  setTimeout(() => {
                    setShowAnimation(false);
                    sessionStorage.setItem("AnimationSeen", "true");
                  }, 1800);
                }, 1000);
              }, 500);
            });
          }, 400);
        }, 500);
      });
    }
  }, [showAnimation]);

  return (
    <div>
      {showAnimation && (
        <div className="animation-overlay">
          <div className="cool-terminal">
            <div className="terminal-line">
              <span>{`> Status: `}</span>
              {!statusLoaded ? (
                <>
                  <span>{statusText}</span>
                  <span className="loading-dots"></span>
                  <span className="cursor-blink" />
                </>
              ) : (
                <span className="flicker">ONLINE</span>
              )}
            </div>
            
            {statusLoaded && (
              <div className="terminal-line">
                <span>{`> Location: `}</span>
                {!locationLoaded ? (
                  <>
                    <span>{locationText}</span>
                    <span className="loading-dots"></span>
                    <span className="cursor-blink" />
                  </>
                ) : (
                  <span className="flicker">Secure Terminal</span>
                )}
              </div>
            )}
            
            {showSystemInfo && (
              <div className="session-info">
                <div className="terminal-line">
                  <span>{`> Session ID: ${sessionId}`}</span>
                </div>
              </div>
            )}
            
            {showPrompt && (
              <div className="terminal-line" style={{ marginTop: "1rem" }}>
                <span>{`> `}</span>
                <span className="cursor-blink"></span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="homepage" aria-hidden={showAnimation}>
        <pre className="terminal simple-terminal">
{`> Status: ONLINE
> Location: Secure Terminal`}
        </pre>
        <div className="intro">
          <div className="name">
            <h1>Rachel Johnson</h1>
          </div>
          <div className="intro-btn-row">
            <a
              href="Rachel_Johnson_Resume.pdf"
              aria-label="Download My Resume"
              className="cv-btn"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              [ Download CV ]
            </a>
            <Link to="/contact" className="contact-btn">
              [ Contact Me ]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;