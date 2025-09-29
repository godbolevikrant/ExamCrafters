import 'dotenv/config';
import { connectDb } from '../utils/db.js';
import { User } from '../models/User.js';

async function main() {
  await connectDb();
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const name = process.env.SEED_ADMIN_NAME || 'Admin User';
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

  const exists = await User.findOne({ email });
  if (exists) {
    // eslint-disable-next-line no-console
    console.log('Admin already exists');
    process.exit(0);
  }

  const passwordHash = await User.hashPassword(password);
  await User.create({ name, email, passwordHash, role: 'admin' });
  // eslint-disable-next-line no-console
  console.log('Admin created:', email);
  process.exit(0);
}

main();


