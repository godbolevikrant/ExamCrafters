import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest, setStoredAuth } from '../api/client';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await apiRequest('/api/auth/login', { method: 'POST', body: { email, password } });
      setStoredAuth(res);
      if (res?.user?.role === 'admin') navigate('/admin');
      else navigate('/student');
    } catch (err) {
      setError(err.message || 'Login failed');
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
              <h2 className="fw-bold mb-3 text-center" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-primary)' }}>Welcome back</h2>
              <p className="text-center text-muted mb-4">Sign in to continue to ExamCrafters</p>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
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
                      placeholder="••••••••"
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
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <small className="text-muted">Don't have an account? </small>
                <Link to="/register" className="fw-semibold">Create one</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;


