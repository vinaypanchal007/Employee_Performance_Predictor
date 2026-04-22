import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.add("drawer-open");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("drawer-open");
  };

  // 🔥 Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // 🔥 Cleanup (prevents stuck scroll lock)
  useEffect(() => {
    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, []);

  return (
    <header className="navbar">
      <div className="brand">Employee Performance Predictor</div>

      {/* ✅ TOGGLE BUTTON FIX */}
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={menuOpen ? closeMenu : openMenu}
      >
        {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* Overlay */}
      <div
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* Drawer */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button
          className="drawer-close"
          type="button"
          onClick={closeMenu}
        >
          <FaTimes size={18} />
        </button>

        <NavLink to="/" className="nav-link" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/predict" className="nav-link" onClick={closeMenu}>
          Predict
        </NavLink>

        <NavLink to="/about" className="nav-link" onClick={closeMenu}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
