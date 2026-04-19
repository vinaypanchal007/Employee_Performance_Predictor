import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="brand">Employee Performance Predictor</div>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      <div className={`nav-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu} />

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button className="drawer-close" type="button" aria-label="Close menu" onClick={closeMenu}>
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
