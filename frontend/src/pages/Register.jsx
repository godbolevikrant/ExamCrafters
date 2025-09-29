import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, setStoredAuth } from '../api/client';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminInvite, setAdminInvite] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      setError('');
      const body = { name, email, password };
      if (admin) {
        body.role = 'admin';
        body.adminInvite = adminInvite;
      }
      const res = await apiRequest('/api/auth/register', { method: 'POST', body });
      setStoredAuth(res);
      if (res?.user?.role === 'admin') navigate('/admin');
      else navigate('/student');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="row justify-content-center m-0">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body p-4 p-lg-5">
              <h2 className="fw-bold mb-3 text-center" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-primary)' }}>Create account</h2>
              <p className="text-center text-muted mb-4">Start practicing smarter with ExamCrafters</p>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" id="isAdmin" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
                  <label className="form-check-label" htmlFor="isAdmin">Register as admin</label>
                </div>
                {admin && (
                  <div className="mt-2">
                    <label className="form-label">Admin invite code</label>
                    <input type="text" className="form-control" value={adminInvite} onChange={(e) => setAdminInvite(e.target.value)} placeholder="Enter invite code" />
                  </div>
                )}
              </form>
              <div className="text-center mt-3">
                <small className="text-muted">Already have an account? </small>
                <Link to="/login" className="fw-semibold">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;


