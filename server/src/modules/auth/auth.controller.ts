import type { NextFunction, Request, Response } from "express";
import type { RegisterData } from "../../schemas/auth.schemas.js";
import { registerUserService } from "./auth.service.js";

export const registerUser = async (
  req: Request<{}, {}, RegisterData>,
  res: Response,
  next: NextFunction,
) => {
  const result = await registerUserService(req.body);
};
