import { motion } from 'framer-motion';
import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
  const isFormValid = name.trim() && isValidEmail(email) && message.trim();
  return (
    <motion.div
      className="container-fluid px-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="py-5 w-100 m-0 text-center">
        <h1 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Contact Us</h1>
        <p className="section-subtitle mx-auto" style={{ maxWidth: '760px' }}>
          Have questions or feedback? Reach out and we’ll get back within 1-2 business days.
        </p>
      </div>

      {/* Contact details + form */}
      <div className="row g-4 m-0">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm rounded-3 home-card h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Get in Touch</h4>
              <p className="mb-2"><strong>Email:</strong> support@examcrafters.com</p>
              <p className="mb-2"><strong>Phone:</strong> +91 8087992028</p>
              <p className="mb-0"><strong>Address:</strong> Ambajogai Road, Latur, MH 413512</p>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-3 home-card h-100 contact-form">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Send a Message</h4>
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-invalid={!name.trim()}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={email ? !isValidEmail(email) : false}
                  />
                  {email && !isValidEmail(email) && (
                    <small style={{ color: 'var(--color-muted)' }}>Please enter a valid email.</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-control"
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    aria-invalid={!message.trim()}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4"
                  disabled={!isFormValid}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map: Latur, Maharashtra, India */}
      <div className="py-4 w-100 m-0">
        <div className="text-center mb-3">
          <h4 className="fw-bold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Our Location</h4>
          <p className="section-subtitle mx-auto" style={{ maxWidth: '720px' }}>
            Find us on Ambajogai Road, Latur, Maharashtra 413512.
          </p>
        </div>
        <div className="card border-0 shadow-sm rounded-3 home-card">
          <div className="card-body p-2 p-md-3">
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
              <iframe
                title="Latur, Maharashtra, India - Map"
                src="https://www.google.com/maps?q=Latur,+Maharashtra,+India&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;