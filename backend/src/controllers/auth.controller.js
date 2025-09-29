import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

function signToken(user) {
  const payload = { sub: user._id.toString(), role: user.role, email: user.email };
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  const expiresIn = '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role, adminInvite } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    let finalRole = 'student';
    if (role === 'admin') {
      const invite = process.env.ADMIN_INVITE_CODE || 'EXAM_ADMIN_123';
      if (adminInvite !== invite) return res.status(403).json({ message: 'Invalid admin invite code' });
      finalRole = 'admin';
    }

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role: finalRole });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
}

export async function me(req, res) {
  const user = req.user;
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}


