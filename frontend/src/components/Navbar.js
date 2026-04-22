import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.add("drawer-open");    // prevents background scroll
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("drawer-open"); // restores background scroll
  };

  return (
    <header className="navbar">
      <div className="brand">Employee Performance Predictor</div>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={openMenu}
      >
        <FaBars size={18} />
      </button>

      {/* Dark overlay behind the drawer */}
      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <nav
        className={`nav-links ${menuOpen ? "open" : ""}`}
        aria-label="Main navigation"
      >
        <button
          className="drawer-close"
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <FaTimes size={18} />
        </button>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/predict"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={closeMenu}
        >
          Predict
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={closeMenu}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
