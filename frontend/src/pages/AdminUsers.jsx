import { useEffect, useState } from 'react';
import { apiRequest, getStoredAuth } from '../api/client';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getStoredAuth();
  const token = auth?.token;

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await apiRequest('/api/users', { token });
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message || 'Failed to load users');
      }
      setLoading(false);
    };
    load();
  }, [token]);

  const verifyUser = async (id) => {
    await apiRequest(`/api/users/${id}/verify`, { method: 'PATCH', token });
    setUsers((prev) => prev.map((u) => (u._id === id || u.id === id ? { ...u, verified: true } : u)));
  };

  const changeRole = async (id, role) => {
    await apiRequest(`/api/users/${id}/role`, { method: 'PATCH', body: { role }, token });
    setUsers((prev) => prev.map((u) => (u._id === id || u.id === id ? { ...u, role } : u)));
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await apiRequest(`/api/users/${id}`, { method: 'DELETE', token });
    setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Users</h4>
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
                <th>Created</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const id = u._id || u.id;
                const isAdmin = u.role === 'admin';
                return (
                  <tr key={id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="badge bg-secondary text-uppercase">{u.role}</span></td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</td>
                    <td>{u.verified ? <span className="badge bg-success">Verified</span> : <span className="badge bg-warning text-dark">Unverified</span>}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        {!u.verified && (
                          <button className="btn btn-sm btn-outline-success" onClick={() => verifyUser(id)}>Verify</button>
                        )}
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => changeRole(id, 'admin')}
                          >Admin</button>
                          <button
                            className={`${!isAdmin ? 'btn-primary' : 'btn-outline-primary'} btn`}
                            onClick={() => changeRole(id, 'student')}
                          >Student</button>
                        </div>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;


