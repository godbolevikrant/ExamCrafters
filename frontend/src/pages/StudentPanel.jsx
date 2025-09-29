import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaListAlt, FaChartBar, FaMedal } from 'react-icons/fa';

function StudentPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Student Panel</h2>
        <p className="text-muted mb-0">Quick links to start practicing and track progress</p>
      </div>

      <div className="row g-4 m-0">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaPlayCircle className="text-primary" />
                <h5 className="mb-0">Start Practice</h5>
              </div>
              <p className="text-muted mb-3">Timed quizzes and subject-wise sets.</p>
              <Link to="/practice" className="btn btn-sm btn-outline-primary">Go</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaListAlt className="text-primary" />
                <h5 className="mb-0">My Attempts</h5>
              </div>
              <p className="text-muted mb-3">Review past quizzes and solutions.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaChartBar className="text-primary" />
                <h5 className="mb-0">Analytics</h5>
              </div>
              <p className="text-muted mb-3">Track strengths and areas to improve.</p>
              <Link to="/results" className="btn btn-sm btn-outline-primary">View</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaMedal className="text-primary" />
                <h5 className="mb-0">Achievements</h5>
              </div>
              <p className="text-muted mb-3">Badges and milestones from practice.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StudentPanel;


