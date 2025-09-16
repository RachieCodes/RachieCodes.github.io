import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pipboy-header">
      <nav className="pipboy-navbar">
        {/* Desktop nav */}
        <div className="nav-links desktop-nav">
          {navItems.map((item) => (
            <span key={item.to} className="pipboy-nav-item">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "active" : undefined
                }
                end={item.to === "/"}
              >
                [{item.label}]
              </NavLink>
            </span>
          ))}
        </div>
        {/* Mobile menu button on the right */}
        <button
          className="menu-btn mobile-nav"
          aria-label="Open menu"
          onClick={() => setOpen((prev) => !prev)}
          style={{ marginLeft: "auto" }}
        >
          [Menu]
        </button>
        {/* Mobile slide-in menu */}
        {open && (
          <div className="pipboy-mobile-menu">
            <button
              className="close-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <ul>
              {navItems.map((item) => (
                <li key={item.to} className="pipboy-nav-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "active" : undefined
                    }
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                  >
                    [{item.label}]
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;