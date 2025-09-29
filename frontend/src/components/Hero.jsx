import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBook, FaChartBar, FaRocket, FaClock, FaLightbulb, FaCertificate } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardHoverVariants = {
  hover: { scale: 1.03, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } },
};

function Hero() {
  const services = [
    { icon: <FaBook />, title: 'Practice Tests', description: 'Access thousands of NEET MCQs with detailed explanations to master every topic.' },
    { icon: <FaChartBar />, title: 'Performance Analytics', description: 'Track your progress with personalized insights and detailed performance reports.' },
    { icon: <FaRocket />, title: 'Exam Strategies', description: 'Learn expert techniques to boost your confidence and NEET score.' },
    { icon: <FaClock />, title: 'Timed Mock Exams', description: 'Simulate real exam pressure with timed tests and pacing guidance.' },
    { icon: <FaLightbulb />, title: 'Concept Boosters', description: 'Strengthen weak areas with smart recommendations and micro-lessons.' },
    { icon: <FaCertificate />, title: 'Achievements & Badges', description: 'Stay motivated with milestones, badges, and shareable achievements.' },
  ];

  const portfolioItems = [
    { title: 'NEET Mock Test 2025', description: 'Full-length exam simulation with real-time feedback.' },
    { title: 'Subject-Wise Quizzes', description: 'Targeted practice for Physics, Chemistry, and Biology.' },
    { title: 'Custom Study Plans', description: 'Tailored schedules to optimize your NEET preparation.' },
  ];

  const blogPosts = [
    { title: 'Top 10 NEET Preparation Tips', to: '/blog/neet-tips' },
    { title: 'Mastering MCQs in Biology', to: '/blog/biology-mcqs' },
  ];

  return (
    <section className="m-0 p-0 w-100">
      {/* Hero Header */}
      <motion.div
        className="py-5 text-center hero-gradient text-white w-100 m-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container px-3 px-md-4 px-lg-5 py-5 w-100">
          <motion.h1
            className="display-3 fw-bold mb-4 w-100"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            NEET & JEE Preparation Made Simple
          </motion.h1>
          <motion.p
            className="lead mb-5 fs-4 mx-auto"
            style={{ maxWidth: '700px', fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            Master Physics, Chemistry, and Biology with exam‑style MCQs, mocks, and analytics.
          </motion.p>
          <motion.div
            className="d-flex flex-column flex-md-row justify-content-center gap-3"
            variants={itemVariants}
          >
            <Link
              to="/practice"
              className="btn btn-primary btn-lg fw-medium rounded-pill px-5"
            >
              Start Practicing
            </Link>
            <Link
              to="/about"
              className="btn btn-outline-light btn-lg fw-medium rounded-pill px-5"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* About/Introduction */}
      <motion.div
        className="py-5 w-100 m-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container px-3 px-md-4 px-lg-5">
          <motion.h2
            className="fw-bold mb-4 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            About ExamCrafters
          </motion.h2>
          <motion.p
            className="fs-5 mx-auto text-center"
            style={{ maxWidth: '800px', fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            ExamCrafters is your trusted partner in NEET/JEE preparation, offering cutting-edge tools, 
            expertly curated content, and personalized insights to help you excel in your exams.
          </motion.p>
        </div>
      </motion.div>

      {/* Featured Services */}
      <motion.div
        className="py-5 w-100 m-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container px-3 px-md-4 px-lg-5">
          {/* NEET & JEE Highlight Section */}
          <motion.div
            className="py-5 w-100 m-0 alt-section-bg rounded-3"
            variants={itemVariants}
          >
            <div className="container px-3 px-md-4 px-lg-5">
              <h2
                className="fw-bold mb-3 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Built for NEET & JEE Aspirants
              </h2>
              <p className="section-subtitle text-center mx-auto mb-0" style={{maxWidth: '820px'}}>
                Tailored practice and analytics for Physics, Chemistry, Biology, and Maths with exam-realistic mocks and topic-wise insights.
              </p>
            </div>
          </motion.div>
          <div className="my-4" />
          <motion.h2
            className="fw-bold mb-5 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            Our Featured Services
          </motion.h2>
          <motion.p
            className="section-subtitle text-center mx-auto mb-4"
            variants={itemVariants}
          >
            Explore powerful tools crafted to accelerate your preparation — from rich practice tests to clear analytics and proven strategies.
          </motion.p>
          <div className="row g-4">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="col-md-4"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="card border-0 shadow-sm rounded-3 h-100 home-card"
                  variants={cardHoverVariants}
                >
                  <div className="card-body text-center p-4">
                    <div className="home-card-icon mb-3 fs-4">{service.icon}</div>
                    <h5 className="card-title fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {service.title}
                    </h5>
                    <p className="card-text" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Portfolio/Demos */}
      <motion.div
        className="py-5 w-100 m-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container px-3 px-md-4 px-lg-5">
          <motion.h2
            className="fw-bold mb-5 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            Our Demos
          </motion.h2>
          <motion.p
            className="section-subtitle text-center mx-auto mb-4"
            variants={itemVariants}
          >
            Preview core experiences before you dive in — see how mock tests, subject quizzes, and study plans come together.
          </motion.p>
          <div className="row g-4">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="col-md-4"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="card border-0 shadow-sm rounded-3 h-100 home-card"
                  variants={cardHoverVariants}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.title}
                    </h5>
                    <p className="card-text mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {item.description}
                    </p>
                    <Link
                      to="/practice"
                      className="btn btn-outline-light rounded-pill fw-medium"
                    >
                      Try Now
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Blog/Resources */}
      <motion.div
        className="py-5 w-100 m-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-fluid px-0">
          <motion.h2
            className="fw-bold mb-5 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
            variants={itemVariants}
          >
            Latest Resources
          </motion.h2>
          <motion.p
            className="section-subtitle text-center mx-auto mb-4"
            variants={itemVariants}
          >
            Read quick, practical insights to sharpen your approach — tips, techniques, and guidance from exam experts.
          </motion.p>
          <div className="row g-4 m-0">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={idx}
                className="col-md-6"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div
                  className="card border-0 shadow-sm rounded-3 home-card"
                  variants={cardHoverVariants}
                >
                  <div className="card-body p-4">
                    <h5
                      className="card-title fw-bold mb-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {post.title}
                    </h5>
                    <Link
                      to={post.to}
                      className="btn btn-outline-light rounded-pill fw-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;

