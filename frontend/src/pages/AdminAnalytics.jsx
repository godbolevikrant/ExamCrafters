import { useEffect, useMemo, useState } from 'react';
import { apiRequest, getStoredAuth } from '../api/client';

function AdminAnalytics() {
  const [metrics, setMetrics] = useState({ users: { total: 0, admins: 0, students: 0, verified: 0 }, paperSets: { total: 0, questions: 0, byExamType: {} } });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const auth = getStoredAuth();
        const token = auth?.token;
        const data = await apiRequest('/api/analytics', { token });
        setMetrics(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const examBreakdown = useMemo(() => {
    const entries = Object.entries(metrics.paperSets.byExamType || {});
    return entries.map(([key, count]) => ({ key, count }));
  }, [metrics]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Analytics</h4>
        {loading && <span className="text-muted small">Loading...</span>}
      </div>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Total Users</div>
              <div className="display-6">{metrics.users.total}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Verified Users</div>
              <div className="display-6">{metrics.users.verified}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Admins</div>
              <div className="display-6">{metrics.users.admins}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Students</div>
              <div className="display-6">{metrics.users.students}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Paper Sets</div>
              <div className="display-6">{metrics.paperSets.total}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small">Total Questions</div>
              <div className="display-6">{metrics.paperSets.questions}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-muted small mb-1">By Exam Type</div>
              <ul className="list-group list-group-flush">
                {examBreakdown.map((row) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={row.key}>
                    <span>{row.key}</span>
                    <span className="badge bg-primary rounded-pill">{row.count}</span>
                  </li>
                ))}
                {examBreakdown.length === 0 && (
                  <li className="list-group-item text-muted">No data</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
