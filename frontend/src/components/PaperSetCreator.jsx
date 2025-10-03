import { useState } from 'react';
import { apiRequest, getStoredAuth } from '../api/client';

function PaperSetCreator({ onCreated, initialMeta, hideMeta }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [setType, setSetType] = useState(initialMeta?.setType || 'general'); // general | subjectwise | previous
  const [examType, setExamType] = useState(initialMeta?.examType || 'NEET'); // NEET | JEE | OTHER
  const [subject, setSubject] = useState(initialMeta?.subject || '');
  const [year, setYear] = useState(initialMeta?.year ? String(initialMeta.year) : '');

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    if (field === 'options') updated[idx][field] = value;
    else updated[idx][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!title.trim()) throw new Error('Title is required');
      if (!questions.length) throw new Error('At least one question is required');

      const auth = getStoredAuth();
      const token = auth?.token;
      await apiRequest('/api/papersets', {
        method: 'POST',
        body: { title, questions, setType, examType, subject: subject.trim(), year: year ? Number(year) : undefined },
        token,
      });
      setTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
      setSetType('general');
      setExamType('NEET');
      setSubject('');
      setYear('');
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="fw-bold mb-3">Create New Paper Set</h5>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      {!hideMeta && (
      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">Set Type</label>
          <select className="form-select" value={setType} onChange={(e) => setSetType(e.target.value)}>
            <option value="general">General</option>
            <option value="subjectwise">Subject-wise</option>
            <option value="previous">Previous Exams</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Exam</label>
          <select className="form-select" value={examType} onChange={(e) => setExamType(e.target.value)}>
            <option value="NEET">NEET</option>
            <option value="JEE">JEE</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Subject</label>
          <input className="form-control" placeholder="e.g., Physics" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Year (for Previous)</label>
          <input type="number" className="form-control" placeholder="e.g., 2022" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
      </div>
      )}
      {questions.map((q, idx) => (
        <div key={idx} className="mb-3 border rounded p-3">
          <label className="form-label">Question {idx + 1}</label>
          <input className="form-control mb-2" value={q.question} onChange={e => handleQuestionChange(idx, 'question', e.target.value)} required />
          <div className="row">
            {q.options.map((opt, oIdx) => (
              <div className="col-6 mb-2" key={oIdx}>
                <input className="form-control" placeholder={`Option ${oIdx + 1}`} value={opt} onChange={e => handleOptionChange(idx, oIdx, e.target.value)} required />
              </div>
            ))}
          </div>
          <input className="form-control mb-2" placeholder="Correct Answer" value={q.correctAnswer} onChange={e => handleQuestionChange(idx, 'correctAnswer', e.target.value)} required />
          {questions.length > 1 && <button type="button" className="btn btn-danger btn-sm" onClick={() => removeQuestion(idx)}>Remove</button>}
        </div>
      ))}
      <button type="button" className="btn btn-secondary mb-3" onClick={addQuestion}>Add Question</button>
      <br />
      <button type="submit" className="btn btn-primary" disabled={loading}>Create Paper Set</button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}

export default PaperSetCreator;
