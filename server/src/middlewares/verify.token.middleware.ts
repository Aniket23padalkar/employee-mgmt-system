import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../db/env.js";
import pool from "../db/db.js";
import type { SafeUser } from "../types/auth.types.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

interface MyJwtPayload extends JwtPayload {
  user_id: number;
}

export const verifyToken = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    if (token === undefined) {
      throw new AppError("No token provided", 401);
    }

    let decoded: MyJwtPayload;

    try {
      const verified = jwt.verify(token, config.access_token_secret);

      if (typeof verified !== "object" || !("user_id" in verified)) {
        throw new AppError("Invalid token payload", 401);
      }

      decoded = verified as MyJwtPayload;
    } catch (err) {
      throw new AppError("Invalid token", 401);
    }

    const result = await pool.query<SafeUser>(
      `
      SELECT
        user_id,
        full_name,
        email,
        role,
        department,
        designation
      FROM users
      WHERE user_id = $1
    `,
      [decoded.user_id],
    );

    const userData = result.rows[0];

    if (!userData) {
      throw new AppError("User not found", 404);
    }

    req.user = userData;
    return next();
  },
);
