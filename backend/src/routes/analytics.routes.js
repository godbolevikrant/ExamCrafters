import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';
import { User } from '../models/User.js';
import { paperSets } from './paperset.routes.js';

const router = Router();

router.get('/', authenticate, requireRole('admin'), async (_req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: 'admin' });
    const students = await User.countDocuments({ role: 'student' });
    const verified = await User.countDocuments({ verified: true });

    const totalPaperSets = paperSets.length;
    const totalQuestions = paperSets.reduce((a, p) => a + (p.questions?.length || 0), 0);
    const byExamType = paperSets.reduce((acc, p) => {
      const key = p.examType || 'OTHER';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    res.json({
      users: { total: totalUsers, admins, students, verified },
      paperSets: { total: totalPaperSets, questions: totalQuestions, byExamType },
      // Placeholder for future usage metrics like daily actives, attempts, etc.
    });
  } catch (err) { next(err); }
});

export default router;


