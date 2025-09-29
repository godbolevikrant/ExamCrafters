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
    <footer className="bg-dark text-white py-5">
      <div className="container-fluid px-0">
        <div className="row g-4">
          {/* About ExamCrafters */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3">About ExamCrafters</h5>
            <p className="text-light">
              ExamCrafters is your trusted platform for exam preparation, offering practice tests, 
              performance analytics, and resources to help you succeed. Join thousands of students 
              achieving their academic goals with us.
            </p>
          </div>

          {/* Page Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              {navItems.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <Link
                    to={item.to}
                    className="text-light text-decoration-none hover-text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-5 col-md-12">
            <h5 className="fw-bold text-uppercase mb-3">Newsletter</h5>
            <p className="text-light mb-3">Subscribe to get the latest updates and tips!</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control rounded-start"
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
        <div className="border-top border-secondary pt-4 mt-4 text-center">
          <div className="mb-3">
            <a
              href="https://facebook.com"
              className="text-light mx-2 fs-4 hover-text-primary transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="text-light mx-2 fs-4 hover-text-primary transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="text-light mx-2 fs-4 hover-text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="text-light mb-0">&copy; 2025 ExamCrafters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;