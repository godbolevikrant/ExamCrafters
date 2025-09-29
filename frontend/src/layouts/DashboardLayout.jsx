import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaTachometerAlt, FaUser, FaCog, FaSchool } from 'react-icons/fa';
import { useState } from 'react';
import { clearStoredAuth, getStoredAuth } from '../api/client';

function DashboardLayout({ variant = 'admin' }) {
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = variant === 'admin';
  const base = isAdmin ? '/admin' : '/student';
  const brand = isAdmin ? 'Admin' : 'Student';
  const navigate = useNavigate();

  // Simple guard: redirect if role mismatch
  const auth = getStoredAuth();
  const role = auth?.user?.role;
  if ((isAdmin && role !== 'admin') || (!isAdmin && role !== 'student')) {
    navigate('/login');
  }

  const menu = [
    { to: base, label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: `${base}/profile`, label: 'Profile', icon: <FaUser /> },
    { to: `${base}/settings`, label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="container-fluid px-0">
      {/* Topbar */}
      <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom" style={{ background: 'var(--bs-body-bg)' }}>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
          <Link to={base} className="navbar-brand fw-bold text-decoration-none">
            <FaSchool className="text-primary me-2" /> {brand} Panel
          </Link>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaUserCircle className="fs-4 text-primary" />
          <button className="btn btn-sm btn-outline-secondary" onClick={() => { clearStoredAuth(); navigate('/login'); }}>Logout</button>
        </div>
      </div>

      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Sidebar */}
        <aside className={`border-end ${collapsed ? 'd-none d-md-block' : ''}`} style={{ width: collapsed ? 64 : 240 }}>
          <nav className="p-3">
            <ul className="list-unstyled m-0">
              {menu.map((item, idx) => (
                <li key={idx} className="mb-2">
                  <NavLink
                    to={item.to}
                    end={item.to === base}
                    className={({ isActive }) => `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${isActive ? 'bg-primary text-white' : 'text-body'}`}
                  >
                    <span className="fs-6">{item.icon}</span>
                    {!collapsed && <span className="fw-medium text-uppercase" style={{ fontSize: 13 }}>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;


