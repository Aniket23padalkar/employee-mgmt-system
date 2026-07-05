import bcrypt from "bcryptjs";
import type {
  CleanRegisterData,
  CreateUserResult,
  LoginUserResponse,
  TokenParams,
} from "../../types/auth.types.js";
import { AppError } from "../../utils/AppError.js";
import { createUserInDB, getUserFromDB } from "./auth.repository.js";
import type { LoginData } from "../../schemas/auth.schemas.js";
import jwt from "jsonwebtoken";
import { config } from "../../db/env.js";
import { number } from "zod";

const generateToken = ({ user_id, expiresIn, secretToken }: TokenParams) => {
  return jwt.sign({ user_id }, secretToken, {
    expiresIn: expiresIn ? expiresIn : "30d",
    issuer: config.issuer,
  });
};

export const registerUserService = async (
  registerData: CleanRegisterData,
): Promise<CreateUserResult> => {
  const full_name = registerData.full_name.toLowerCase().trim();
  const email = registerData.email.toLowerCase().trim();
  const password = registerData.password;
  const role = registerData.role;

  const user = await getUserFromDB({ email: email });

  if (user) {
    throw new AppError("User already exists, Please register", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await createUserInDB({
    full_name,
    email,
    password: hashedPassword,
    role,
  });

  if (!result || result === undefined) {
    throw new AppError("Error while registering", 500);
  }

  return result;
};

export const loginUserService = async (
  body: LoginData,
): Promise<LoginUserResponse> => {
  const { email, password } = body;

  const user = await getUserFromDB({ email: email });

  if (!user || user === undefined) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = generateToken({
    user_id: user.user_id,
    expiresIn: "15m",
    secretToken: config.access_token_secret,
  });

  const refreshToken = generateToken({
    user_id: user.user_id,
    expiresIn: "7d",
    secretToken: config.refresh_token_secret,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      designation: user.designation,
      department: user.department,
    },
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError("Refresh token missing", 401);
  }

  let payload: { user_id: number };

  try {
    payload = jwt.verify(refreshToken, config.refresh_token_secret) as {
      user_id: number;
    };
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await getUserFromDB({ user_id: payload.user_id });

  if (!user || user === undefined) {
    throw new AppError("User not found", 401);
  }

  const accessToken = generateToken({
    user_id: user.user_id,
    expiresIn: "15m",
    secretToken: config.access_token_secret,
  });

  return { accessToken };
};
