import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) { return res.status(401).json({ message: 'Unauthorized' }); }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}


