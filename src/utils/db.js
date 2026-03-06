import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_CONN,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
