import type { CookieOptions, NextFunction, Request, Response } from "express";
import type { LoginData, RegisterData } from "../../schemas/auth.schemas.js";
import { loginUserService, registerUserService } from "./auth.service.js";
import type { CreateUserResult, SafeUser } from "../../types/auth.types.js";
import { config } from "../../db/env.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

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

export const loginUser = async (
  req: Request<{}, {}, LoginData>,
  res: Response<{
    success: boolean;
    message: string;
    user: SafeUser;
    accessToken: string;
  }>,
  next: NextFunction,
) => {
  const { accessToken, refreshToken, user } = await loginUserService(req.body);

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: user,
    accessToken: accessToken,
  });
};
