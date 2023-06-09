import * as dotenv from 'dotenv';
import { join } from 'node:path';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    'backend',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});

export const Configuration = () => ({
  database: {},
  broker: {},
});
