import { useEffect, useState } from 'react';
import PaperSetCreator from './PaperSetCreator';

const LOCAL_KEY = 'paperset_wizard_defaults';

function PaperSetWizard({ onCreated, presetMeta, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);
  const [meta, setMeta] = useState({ setType: 'general', examType: 'NEET', subject: '', year: '' });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setMeta((prev) => ({ ...prev, ...saved }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply external preset meta/step when provided
  useEffect(() => {
    if (presetMeta) {
      setMeta((prev) => ({ ...prev, ...presetMeta }));
      if (initialStep) setStep(initialStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetMeta, initialStep]);

  const saveDefaults = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(meta));
  };

  if (step === 1) {
    return (
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <h5 className="mb-3">Select Paper Set Type</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Set Type</label>
              <select className="form-select" value={meta.setType} onChange={(e) => setMeta({ ...meta, setType: e.target.value })}>
                <option value="general">General</option>
                <option value="subjectwise">Subject-wise</option>
                <option value="previous">Previous Exams</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Exam</label>
              <select className="form-select" value={meta.examType} onChange={(e) => setMeta({ ...meta, examType: e.target.value })}>
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Subject</label>
              <input className="form-control" placeholder="e.g., Physics" value={meta.subject} onChange={(e) => setMeta({ ...meta, subject: e.target.value })} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Year (for Previous)</label>
              <input type="number" className="form-control" placeholder="e.g., 2022" value={meta.year} onChange={(e) => setMeta({ ...meta, year: e.target.value })} />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary" onClick={() => { saveDefaults(); setStep(2); }}>Continue</button>
            <button className="btn btn-outline-secondary" onClick={saveDefaults}>Save Defaults</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Add Questions</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setStep(1)}>Back</button>
        </div>
        <PaperSetCreator onCreated={onCreated} initialMeta={meta} hideMeta />
      </div>
    </div>
  );
}

export default PaperSetWizard;


