import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/practice", label: "Practice" },
    { to: "/results", label: "Results" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="modern-footer py-5">
      <div className="container-fluid px-3 px-lg-4">
        <div className="row g-4 align-items-start">
          {/* About ExamCrafters */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3 footer-heading">About ExamCrafters</h5>
            <p className="footer-text">
              ExamCrafters is your trusted platform for exam preparation, offering practice tests, 
              performance analytics, and resources to help you succeed. Join thousands of students 
              achieving their academic goals with us.
            </p>
          </div>

          {/* Page Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3 footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              {navItems.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <Link
                    to={item.to}
                    className="footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-5 col-md-12">
            <h5 className="fw-bold text-uppercase mb-3 footer-heading">Newsletter</h5>
            <p className="footer-text mb-3">Subscribe to get the latest updates and tips!</p>
            <div className="input-group footer-input-group">
              <input
                type="email"
                className="form-control footer-input rounded-start"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
              />
              <button className="btn btn-primary rounded-end" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="footer-separator pt-4 mt-4 text-center">
          <div className="mb-3 footer-social">
            <a
              href="https://facebook.com"
              className="footer-social-link mx-2"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="footer-social-link mx-2"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="footer-social-link mx-2"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="footer-text mb-0">&copy; 2025 ExamCrafters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;