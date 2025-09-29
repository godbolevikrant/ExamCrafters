import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaChartBar,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSignInAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/practice", label: "Practice", icon: <FaBook /> },
    { to: "/results", label: "Results", icon: <FaChartBar /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
    { to: "/login", label: "Login", icon: <FaSignInAlt /> },
  ];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm modern-navbar sticky-top">
      <div className="container-fluid px-0 py-2">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2 text-white ms-3" to="/">
          <span className="brand-mark" aria-hidden="true">EC</span>
          <span className="brand-text fw-bold">
            Exam<span className="brand-accent">Crafters</span>
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={22} className="text-white" /> : <FaBars size={22} className="text-white" />}
        </button>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse px-3 px-lg-4" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item, idx) => (
              <li className="nav-item" key={idx}>
                <Link
                  className="nav-link modern-link d-flex align-items-center gap-2 fw-medium text-uppercase px-3 py-2"
                  to={item.to}
                >
                  <span className="fs-5">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu (Animated with Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-top w-100 px-3 py-3 d-lg-none"
          >
            <ul className="navbar-nav">
              {navItems.map((item, idx) => (
                <li className="nav-item border-bottom border-light" key={idx}>
                  <Link
                    className="nav-link d-flex align-items-center gap-3 text-dark py-3 px-3 fw-medium"
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="fs-5">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;