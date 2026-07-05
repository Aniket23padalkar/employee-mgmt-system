import pool from "../../db/db.js";
import type {
  CreateUserParams,
  CreateUserResult,
  User,
} from "../../types/auth.types.js";

export const getUserFromDB = async (
  email: string,
): Promise<User | undefined> => {
  const query: string = `
        SELECT * FROM users WHERE email = $1
    `;

  const result = await pool.query<User>(query, [email]);

  return result.rows[0];
};

export const createUserInDB = async ({
  full_name,
  email,
  password,
  role,
}: CreateUserParams): Promise<CreateUserResult | undefined> => {
  const query: string = `
        INSERT INTO users
            ('full_name','email','password_hash','role')
        VALUES
            ($1,$2,$3,$4)
        RETURNING
            user_id,
            full_name,
            email,
            role
    `;

  const result = await pool.query<CreateUserResult>(query, [
    full_name,
    email,
    password,
    role,
  ]);

  return result.rows[0];
};
