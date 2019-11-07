import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export const config = {
  port: 6000,
};
