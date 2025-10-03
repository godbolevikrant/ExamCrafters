import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getStoredAuth } from '../api/client';
import PaperSetWizard from '../components/PaperSetWizard';

function AdminQuestionBank() {
  const [paperSets, setPaperSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [recreateMeta, setRecreateMeta] = useState(null);
  const [filters, setFilters] = useState({ setType: '', examType: '', subject: '', year: '' });

  const auth = getStoredAuth();
  const token = auth?.token;

  const load = async () => {
    try {
      setError('');
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.setType) params.set('setType', filters.setType);
      if (filters.examType) params.set('examType', filters.examType);
      if (filters.subject) params.set('subject', filters.subject);
      if (filters.year) params.set('year', filters.year);
      const query = params.toString();
      const data = await apiRequest(`/api/papersets${query ? `?${query}` : ''}`);
      setPaperSets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load question bank');
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [filters]);

  const startEdit = (ps) => {
    setEditing({ id: ps._id, title: ps.name, questions: (ps.questions || []).map((q) => ({ question: q.question, options: q.options || [], correctAnswer: q.answer })) });
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    await apiRequest(`/api/papersets/${editing.id}`, { method: 'PUT', body: { title: editing.title, questions: editing.questions }, token });
    setEditing(null);
    load();
  };

  const deleteSet = async (id) => {
    if (!window.confirm('Delete this paper set?')) return;
    await apiRequest(`/api/papersets/${id}`, { method: 'DELETE', token });
    load();
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Question Bank</h4>
        {loading && <span className="text-muted small">Loading...</span>}
      </div>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-3">
              <label className="form-label">Set Type</label>
              <select className="form-select" value={filters.setType} onChange={(e) => setFilters({ ...filters, setType: e.target.value })}>
                <option value="">All</option>
                <option value="general">General</option>
                <option value="subjectwise">Subject-wise</option>
                <option value="previous">Previous Exams</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Exam</label>
              <select className="form-select" value={filters.examType} onChange={(e) => setFilters({ ...filters, examType: e.target.value })}>
                <option value="">All</option>
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Subject</label>
              <input className="form-control" value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} placeholder="e.g., Physics" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Year</label>
              <input type="number" className="form-control" value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })} placeholder="e.g., 2022" />
            </div>
          </div>
        </div>
      </div>

      {/* Guided creation flow only */}
      <PaperSetWizard onCreated={load} presetMeta={recreateMeta || undefined} initialStep={recreateMeta ? 2 : 1} />

      {/* Edit */}
      {editing && (
        <div className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <h5 className="mb-3">Edit Paper Set</h5>
            <div className="mb-2">
              <label className="form-label">Title</label>
              <input className="form-control" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Set Type</label>
                <select className="form-select" value={editing.setType || ''} onChange={(e) => setEditing({ ...editing, setType: e.target.value })}>
                  <option value="general">General</option>
                  <option value="subjectwise">Subject-wise</option>
                  <option value="previous">Previous Exams</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Exam</label>
                <select className="form-select" value={editing.examType || ''} onChange={(e) => setEditing({ ...editing, examType: e.target.value })}>
                  <option value="NEET">NEET</option>
                  <option value="JEE">JEE</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Subject</label>
                <input className="form-control" value={editing.subject || ''} onChange={(e) => setEditing({ ...editing, subject: e.target.value })} />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Year</label>
                <input type="number" className="form-control" value={editing.year || ''} onChange={(e) => setEditing({ ...editing, year: e.target.value })} />
              </div>
            </div>
            {editing.questions.map((q, idx) => (
              <div key={idx} className="mb-3 border rounded p-3">
                <label className="form-label">Question {idx + 1}</label>
                <input className="form-control mb-2" value={q.question} onChange={(e) => {
                  const qs = [...editing.questions];
                  qs[idx].question = e.target.value;
                  setEditing({ ...editing, questions: qs });
                }} />
                <div className="row">
                  {(q.options || []).map((opt, oIdx) => (
                    <div className="col-6 mb-2" key={oIdx}>
                      <input className="form-control" value={opt} onChange={(e) => {
                        const qs = [...editing.questions];
                        qs[idx].options[oIdx] = e.target.value;
                        setEditing({ ...editing, questions: qs });
                      }} />
                    </div>
                  ))}
                </div>
                <input className="form-control mb-2" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e) => {
                  const qs = [...editing.questions];
                  qs[idx].correctAnswer = e.target.value;
                  setEditing({ ...editing, questions: qs });
                }} />
              </div>
            ))}
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
              <button className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <ul className="list-group list-group-flush">
          {paperSets.map((ps) => (
            <li className="list-group-item" key={ps._id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{ps.name}</div>
                  <div className="text-muted small">{(ps.questions || []).length} questions</div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(ps)}>Edit</button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setRecreateMeta({ setType: ps.setType, examType: ps.examType, subject: ps.subject, year: ps.year })}>Recreate</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteSet(ps._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
          {paperSets.length === 0 && (
            <li className="list-group-item text-muted">No paper sets yet</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default AdminQuestionBank;


