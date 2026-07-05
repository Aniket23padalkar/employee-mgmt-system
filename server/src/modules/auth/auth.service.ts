import bcrypt from "bcryptjs";
import type {
  CleanRegisterData,
  CreateUserResult,
} from "../../types/auth.types.js";
import { AppError } from "../../utils/AppError.js";
import { createUserInDB, getUserFromDB } from "./auth.repository.js";

export const registerUserService = async (
  registerData: CleanRegisterData,
): Promise<CreateUserResult> => {
  const full_name = registerData.full_name.toLowerCase().trim();
  const email = registerData.email.toLowerCase().trim();
  const password = registerData.password;
  const role = registerData.role;

  const user = await getUserFromDB(email);

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
