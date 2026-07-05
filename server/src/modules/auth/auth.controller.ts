import type { NextFunction, Request, Response } from "express";
import type { RegisterData } from "../../schemas/auth.schemas.js";
import { registerUserService } from "./auth.service.js";
import type { CreateUserResult } from "../../types/auth.types.js";

export const registerUser = async (
  req: Request<{}, {}, RegisterData>,
  res: Response<{ success: boolean; message: string; user: CreateUserResult }>,
  next: NextFunction,
) => {
  const { confirm_password, ...registerData } = req.body;

  const result = await registerUserService(registerData);

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: result,
  });
};
