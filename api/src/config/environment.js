import { resolve }  from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;

dotenv.config({ path: resolve(process.cwd(), `.env.${nodeEnv}`.replace(/\.$/, '')) })

