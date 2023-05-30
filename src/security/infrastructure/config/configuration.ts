import dotenv from 'dotenv';
import { join } from 'node:path';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    'security',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});

export const Configuration = () => ({
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    database: process.env.DATABASE_NAME ?? 'ToDoDB',
  },
});
