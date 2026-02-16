import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/blog", label: "Blog" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  
  // Prevent body scrolling when the mobile menu is open
  useEffect(() => {
    if (open) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scrolling when menu is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Cleanup function
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [open]);

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
          className={`menu-btn ${open ? 'menu-hidden' : ''}`}
          aria-label="Open menu"
          onClick={() => setOpen((prev) => !prev)}
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