import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { apiRequest, getStoredAuth } from '../api/client';
import { FaUsersCog, FaQuestionCircle, FaChartLine, FaCogs } from 'react-icons/fa';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [paperSets, setPaperSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getStoredAuth();
  const token = auth?.token;

  const sliderRef = useRef(null);
  const scrollAmount = 320;
  const slideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };
  const slideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const loadData = async () => {
    try {
      setError('');
      setLoading(true);
      const [usersRes, setsRes] = await Promise.all([
        apiRequest('/api/users', { token }).catch(() => ({ users: [] })),
        apiRequest('/api/papersets').catch(() => []),
      ]);
      setUsers(usersRes.users || []);
      setPaperSets(Array.isArray(setsRes) ? setsRes : []);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold" style={{ fontFamily: "'Inter', sans-serif" }}>Admin Panel</h2>
        <p className="text-muted mb-0">Manage users, questions, and platform settings</p>
      </div>
      {/* KPI Cards */}
      <div className="row g-3 m-0 mb-3">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Total Users</div>
              <div className="display-6">{users.length}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Paper Sets</div>
              <div className="display-6">{paperSets.length}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Questions</div>
              <div className="display-6">{paperSets.reduce((a, s) => a + (s.questions?.length || 0), 0)}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Admins</div>
              <div className="display-6">{users.filter(u => u.role === 'admin').length}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative mb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="mb-0">Quick Actions</h5>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={slideLeft}>&larr;</button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={slideRight}>&rarr;</button>
          </div>
        </div>
        <div
          ref={sliderRef}
          className="d-flex gap-3 pb-2"
          style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}
        >
          <div style={{ minWidth: 260 }}>
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaUsersCog className="text-primary" />
                  <h5 className="mb-0">Users</h5>
                </div>
                <p className="text-muted mb-3">View, verify, and manage student accounts.</p>
                <Link to="/admin/users" className="btn btn-sm btn-outline-primary">Open</Link>
              </div>
            </div>
          </div>
          <div style={{ minWidth: 260 }}>
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaQuestionCircle className="text-primary" />
                  <h5 className="mb-0">Question Bank</h5>
                </div>
                <p className="text-muted mb-3">Add, edit, and organize MCQs and solutions.</p>
                <Link to="/admin/question-bank" className="btn btn-sm btn-outline-primary">Open</Link>
              </div>
            </div>
          </div>
          <div style={{ minWidth: 260 }}>
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaChartLine className="text-primary" />
                  <h5 className="mb-0">Analytics</h5>
                </div>
                <p className="text-muted mb-3">Track performance, usage, and trends.</p>
                <Link to="/admin/analytics" className="btn btn-sm btn-outline-primary">Open</Link>
              </div>
            </div>
          </div>
          <div style={{ minWidth: 260 }}>
            <div className="card border-0 shadow-sm rounded-3 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaCogs className="text-primary" />
                  <h5 className="mb-0">Settings</h5>
                </div>
                <p className="text-muted mb-3">Platform preferences and configurations.</p>
                <Link to="/admin/settings" className="btn btn-sm btn-outline-primary">Open</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4 m-0 mt-1">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recent Users</h5>
                {loading && <span className="text-muted small">Loading...</span>}
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(-5).reverse().map((u) => (
                        <tr key={u.id || u._id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td><span className="badge bg-secondary text-uppercase">{u.role}</span></td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">No users</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-3 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recent Paper Sets</h5>
                {loading && <span className="text-muted small">Loading...</span>}
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {!loading && !error && (
                <ul className="list-group list-group-flush">
                  {paperSets.slice(-5).reverse().map((ps) => (
                    <li className="list-group-item" key={ps._id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold">{ps.name}</div>
                          <div className="text-muted small">{(ps.questions || []).length} questions</div>
                        </div>
                        <Link to="/admin/question-bank" className="btn btn-sm btn-outline-primary">Open</Link>
                      </div>
                    </li>
                  ))}
                  {paperSets.length === 0 && (
                    <li className="list-group-item text-muted">No paper sets yet</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminPanel;


