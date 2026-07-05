import { Pool } from "pg";
import { config } from "./env.js";

const pool = new Pool({
  user: config.db_username,
  database: config.db_name,
  host: config.db_host,
  port: config.db_port,
  password: config.db_password,
});

pool.on("connect", async (client) => {
  const db = await client.query("SELECT current_database()");
  console.log("Connected to database", db.rows[0]);
});

pool.on("error", (err) => {
  console.log("Database Error", err);
});

export default pool;
