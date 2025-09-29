import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsersCog, FaQuestionCircle, FaChartLine, FaCogs } from 'react-icons/fa';

function AdminPanel() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Admin Panel</h2>
        <p className="text-muted mb-0">Manage users, questions, and platform settings</p>
      </div>

      <div className="row g-4 m-0">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaUsersCog className="text-primary" />
                <h5 className="mb-0">Users</h5>
              </div>
              <p className="text-muted mb-3">View, verify, and manage student accounts.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaQuestionCircle className="text-primary" />
                <h5 className="mb-0">Question Bank</h5>
              </div>
              <p className="text-muted mb-3">Add, edit, and organize MCQs and solutions.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaChartLine className="text-primary" />
                <h5 className="mb-0">Analytics</h5>
              </div>
              <p className="text-muted mb-3">Track performance, usage, and trends.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaCogs className="text-primary" />
                <h5 className="mb-0">Settings</h5>
              </div>
              <p className="text-muted mb-3">Platform preferences and configurations.</p>
              <Link to="#" className="btn btn-sm btn-outline-primary" onClick={(e) => e.preventDefault()}>Open</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminPanel;


