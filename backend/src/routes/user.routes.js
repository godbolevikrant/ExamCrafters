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

// Verify a user
router.patch('/:id/verify', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { verified: true }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) { next(err); }
});

// Change role
router.patch('/:id/role', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { role } = req.body || {};
    if (!['admin', 'student'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) { next(err); }
});

// Delete user
router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;


