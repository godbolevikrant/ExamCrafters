import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';
import { User } from '../models/User.js';

const router = Router();

// Admin-only: list users (basic example)
router.get('/', authenticate, requireRole('admin'), async (_req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json({ users });
  } catch (err) { next(err); }
});

export default router;


