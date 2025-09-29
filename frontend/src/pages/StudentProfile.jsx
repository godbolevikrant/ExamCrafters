import { motion } from 'framer-motion';

function StudentProfile() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Profile</h4>
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input className="form-control" defaultValue="Student User" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" defaultValue="student@example.com" />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StudentProfile;


