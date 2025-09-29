import { motion } from 'framer-motion';

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
        <h1 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>About ExamCrafters</h1>
        <p className="section-subtitle mx-auto" style={{ maxWidth: '820px' }}>
          We help students prepare smarter for competitive exams with practice-ready MCQs, real-time analytics,
          and focused revision tools built for sustained progress.
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
              <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>What We Offer</h4>
              <ul className="mb-0" style={{ lineHeight: 1.9 }}>
                <li>Extensive MCQ bank with detailed solutions</li>
                <li>Timed mocks and subject-wise quizzes</li>
                <li>Performance analytics and insights</li>
                <li>Personalized revision recommendations</li>
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