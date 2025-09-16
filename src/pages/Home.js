import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import "../css/Homepage.css";
import "../css/Footer.css";

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
  const [scanningPause, setScanningPause] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      typewriter("LOADING", 80, setStatusText, () => {
        setStatusLoaded(true);
        setStatusText("ONLINE");
        setTimeout(() => {
          typewriter("SCANNING...", 80, setLocationText, () => {
            setScanningPause(true);
            setTimeout(() => {
              setScanningPause(false);
              typewriter("Secure Terminal", 60, setLocationText, () => {
                setLocationLoaded(true);
                setTimeout(() => {
                  setShowAnimation(false);
                  sessionStorage.setItem("AnimationSeen", "true");
                }, 700);
              });
            }, 900);
          });
        }, 400);
      });
    }
  }, [showAnimation]);

  return (
    <div>
      {showAnimation && (
        <div className="animation-overlay">
          <pre className="terminal cool-terminal">
            <span className="terminal-line">
              {`>`} Status:{" "}
              <span className={statusLoaded ? "flicker" : ""}>
                {!statusLoaded ? (
                  <>
                    {statusText}
                    <span className="cursor-blink" />
                  </>
                ) : (
                  <>
                    ONLINE
                    <span className="cursor-blink" />
                  </>
                )}
              </span>
            </span>
            {"\n"}
            <span className="terminal-line">
              {`>`} Location:{" "}
              <span className={locationLoaded ? "flicker" : ""}>
                {!locationLoaded ? (
                  statusLoaded ? (
                    <>
                      {locationText}
                      <span className="cursor-blink" />
                      {scanningPause && <span className="cursor-blink" />}
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  <>
                    Secure Terminal
                    <span className="cursor-blink" />
                  </>
                )}
              </span>
            </span>
          </pre>
        </div>
      )}

      <div className="homepage" aria-hidden={showAnimation}>
        <pre className="terminal">
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