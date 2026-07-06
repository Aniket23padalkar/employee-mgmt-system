import type { User } from "./auth.types.js";

export type AllEmployeesData = Omit<User, "password_hash">;
