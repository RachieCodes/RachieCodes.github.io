import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ProjectsArchive from './pages/ProjectsArchive';
import "./App.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <div className="old-crt-monitor">
        <div className="retro-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/archive" element={<ProjectsArchive />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="pipboy-footer" aria-label="Site Footer">
            <hr className="footer-divider" />
            <div className="social-links" aria-label="Social links">
              <ul className="footer-icons-row">
                <li>
                  <a
                    className="fa-icon"
                    href="https://github.com/RachieCodes"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="fa-icon"
                    href="https://www.linkedin.com/in/rachel-johnson-484772172/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="fa-icon"
                    href="https://www.instagram.com/rachieions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="fa-icon"
                    href="mailto:RachieCodes@outlook.com"
                    aria-label="Email"
                  >
                    <span className="email-icon">
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-text">
              <p>© 2025 Rachie Codes. Stay upgraded.</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);