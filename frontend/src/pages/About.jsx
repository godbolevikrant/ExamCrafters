import { motion } from 'framer-motion';
import { FaUserTie, FaUsers, FaCode, FaClipboardList, FaBookOpen, FaCogs } from 'react-icons/fa';

function About() {
  return (
    <motion.div
      className="container-fluid px-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="py-5 w-100 m-0 text-center">
        <h1 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>About ExamCrafters for NEET & JEE</h1>
        <p className="section-subtitle mx-auto" style={{ maxWidth: '820px' }}>
          We help NEET & JEE aspirants prepare smarter with syllabus-aligned MCQs, real-time analytics,
          and focused revision tools built for long-term retention and confident performance.
        </p>
      </div>

      {/* Mission / What we do */}
      <div className="row g-4 m-0">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-3 home-card h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Our Mission</h4>
              <p className="mb-0">
                Empower learners with a structured, data-driven practice experience that mirrors the real exam,
                reduces anxiety, and improves outcomes.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-3 home-card h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>What We Offer for NEET & JEE</h4>
              <ul className="mb-0" style={{ lineHeight: 1.9 }}>
                <li>Extensive NEET/JEE MCQ bank with step-by-step solutions</li>
                <li>Timed mocks and subject-wise quizzes (Physics, Chemistry, Biology/Maths)</li>
                <li>Performance analytics with topic-level strengths and gaps</li>
                <li>Adaptive revision recommendations and custom study plans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="py-5 w-100 m-0">
        <h3 className="fw-bold mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>Why Students Choose Us</h3>
        <div className="row g-4 m-0">
          {[
            { title: 'Realistic Practice', desc: 'Exam-like mocks with pacing to build confidence.' },
            { title: 'Clear Explanations', desc: 'Concise solutions to learn from every attempt.' },
            { title: 'Track Progress', desc: 'See trends, strengths, and areas to improve.' },
          ].map((item, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card border-0 shadow-sm rounded-3 home-card h-100">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{item.title}</h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Administration */}
      <div className="py-5 w-100 m-0">
        <h3 className="fw-bold mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>Administration</h3>
        <div className="row g-4 m-0">
          {[
            { icon: <FaUserTie className="text-primary me-2" />, role: 'Founder', name: 'Aarav Sharma', desc: 'Owns vision, culture, and long-term strategy for ExamCrafters.' },
            { icon: <FaUsers className="text-primary me-2" />, role: 'Co‑Founder', name: 'Zara Khan', desc: 'Builds partnerships, leads community programs and collaborations.' },
            { icon: <FaCode className="text-primary me-2" />, role: 'Engineering Lead', name: 'Rohit Mehta', desc: 'Leads platform architecture, security, and performance engineering.' },
            { icon: <FaClipboardList className="text-primary me-2" />, role: 'Product Lead', name: 'Ishita Verma', desc: 'Drives roadmap, UX, and learning outcomes across features.' },
            { icon: <FaBookOpen className="text-primary me-2" />, role: 'Content Head', name: 'Neha Gupta', desc: 'Ensures question quality, syllabus coverage, and explanations.' },
            { icon: <FaCogs className="text-primary me-2" />, role: 'Operations Lead', name: 'Arjun Patel', desc: 'Oversees releases, support processes, and smooth day-to-day ops.' },
          ].map((item, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card border-0 shadow-sm rounded-3 home-card h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-2">
                    {item.icon}
                    <h5 className="fw-bold mb-0" style={{ fontFamily: "'Inter', sans-serif" }}>{item.role}</h5>
                  </div>
                  <p className="text-primary mb-1">{item.name}</p>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-4 text-center">
        <motion.a
          href="/practice"
          className="btn btn-primary btn-lg rounded-pill px-5"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Practicing
        </motion.a>
      </div>
    </motion.div>
  );
}

export default About;