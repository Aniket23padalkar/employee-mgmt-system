import type { CookieOptions, Request, Response } from "express";
import type { LoginData, RegisterData } from "../../schemas/auth.schemas.js";
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from "./auth.service.js";
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

export const refreshAccessToken = async (
  req: Request,
  res: Response<{ success: boolean; message: string; accessToken: string }>,
) => {
  const refreshToken = req.cookies.refreshToken;
  const { accessToken } = await refreshTokenService(refreshToken);

  return res.status(200).json({
    success: true,
    message: "Refreshed access token",
    accessToken: accessToken,
  });
};
