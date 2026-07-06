import pool from "../../db/db.js";
import type { AllEmployeesData } from "../../types/admin.types.js";

export const getAllEmployeesFromDB = async (): Promise<AllEmployeesData[]> => {
  const query: string = `
      SELECT
        user_id,
        full_name,
        role,
        email,
        must_change_password,
        department,
        designation,
        created_at,
        updated_at
      FROM users
    `;

  const result = await pool.query<AllEmployeesData>(query);

  return result.rows;
};
