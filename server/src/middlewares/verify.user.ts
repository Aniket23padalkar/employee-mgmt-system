import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }

  next();
};
