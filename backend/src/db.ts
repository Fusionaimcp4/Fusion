import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'loveboy',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'aiappdb',
});

export default pool; 