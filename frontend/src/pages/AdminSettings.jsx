import { motion } from 'framer-motion';

function AdminSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <h4 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Settings</h4>
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="maintenanceMode" />
            <label className="form-check-label" htmlFor="maintenanceMode">Maintenance mode</label>
          </div>
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="registrationOpen" defaultChecked />
            <label className="form-check-label" htmlFor="registrationOpen">Allow new registrations</label>
          </div>
          <button className="btn btn-primary">Save Settings</button>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminSettings;


