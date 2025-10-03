import express from 'express';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Dummy data for demonstration. Replace with DB logic.
// In-memory demo store. Replace with persistent DB in production.
export const paperSets = [
  {
    _id: '1',
    name: 'Sample Set 1',
    questions: [
      { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
      { question: 'Capital of France?', options: ['Paris', 'London', 'Berlin'], answer: 'Paris' }
    ]
  },
  {
    _id: '2',
    name: 'Sample Set 2',
    questions: [
      { question: 'What is 3+5?', options: ['7', '8', '9'], answer: '8' }
    ]
  }
];

router.get('/', (req, res) => {
  const { setType, examType, subject, year } = req.query || {};
  let results = [...paperSets];
  if (setType) results = results.filter((p) => (p.setType || '').toLowerCase() === String(setType).toLowerCase());
  if (examType) results = results.filter((p) => (p.examType || '').toLowerCase() === String(examType).toLowerCase());
  if (subject) results = results.filter((p) => (p.subject || '').toLowerCase() === String(subject).toLowerCase());
  if (year) results = results.filter((p) => String(p.year || '') === String(year));
  res.json(results);
});

// Create a new paper set (admin only)
router.post('/', authenticate, requireRole('admin'), (req, res) => {
  const { title, questions, setType, examType, subject, year } = req.body || {};
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: 'Title and questions are required' });
  }

  const newSet = {
    _id: String(Date.now()),
    name: title,
    setType: setType || 'general', // general | subjectwise | previous
    examType: examType || 'NEET', // NEET | JEE | OTHER
    subject: subject || '',
    year: year || null,
    questions: questions.map((q) => ({
      question: q.question,
      options: Array.isArray(q.options) ? q.options : [],
      answer: q.correctAnswer,
    })),
    createdBy: req.user?.id,
    createdAt: new Date().toISOString(),
  };
  paperSets.push(newSet);
  res.status(201).json(newSet);
});

// Get a single paper set
router.get('/:id', (req, res) => {
  const found = paperSets.find((p) => p._id === req.params.id);
  if (!found) return res.status(404).json({ message: 'Not found' });
  res.json(found);
});

// Update a paper set (admin only)
router.put('/:id', authenticate, requireRole('admin'), (req, res) => {
  const idx = paperSets.findIndex((p) => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const { title, questions, setType, examType, subject, year } = req.body || {};
  if (!title || !Array.isArray(questions)) return res.status(400).json({ message: 'Invalid payload' });
  const updated = {
    ...paperSets[idx],
    name: title,
    setType: setType ?? paperSets[idx].setType,
    examType: examType ?? paperSets[idx].examType,
    subject: subject ?? paperSets[idx].subject,
    year: year ?? paperSets[idx].year,
    questions: questions.map((q) => ({ question: q.question, options: Array.isArray(q.options) ? q.options : [], answer: q.correctAnswer })),
    updatedAt: new Date().toISOString(),
  };
  paperSets[idx] = updated;
  res.json(updated);
});

// Delete a paper set (admin only)
router.delete('/:id', authenticate, requireRole('admin'), (req, res) => {
  const idx = paperSets.findIndex((p) => p._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  paperSets.splice(idx, 1);
  res.json({ ok: true });
});

export default router;
