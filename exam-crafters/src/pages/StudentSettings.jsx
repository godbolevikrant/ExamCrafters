import { motion } from 'framer-motion';

function StudentSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Settings</h4>
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="emailUpdates" defaultChecked />
            <label className="form-check-label" htmlFor="emailUpdates">Email me quiz updates</label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="darkModePref" />
            <label className="form-check-label" htmlFor="darkModePref">Prefer dark mode</label>
          </div>
          <button className="btn btn-primary">Save Settings</button>
        </div>
      </div>
    </motion.div>
  );
}

export default StudentSettings;


