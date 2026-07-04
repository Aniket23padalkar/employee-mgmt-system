import type { RegisterData } from "../../schemas/auth.schemas.js";

export const registerUserService = async (body: RegisterData) => {
  const full_name = body.full_name.toLowerCase().trim();
  const email = body.email.toLowerCase().trim();
  const password = body.password;
};
