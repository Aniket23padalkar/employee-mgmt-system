import type { RegisterData } from "../schemas/auth.schemas.js";

export interface User {
  user_id: number;
  full_name: string;
  role: "admin" | "employee";
  email: string;
  password_hash: string;
  must_change_password: boolean;
  department: string;
  designation: string;
  created_at: Date;
  updated_at: Date;
}

export interface SafeUser {
  user_id: number;
  full_name: string;
  role: "admin" | "employee";
  email: string;
  department: string;
  designation: string;
}

export type CleanRegisterData = Omit<RegisterData, "confirm_password">;

export interface CreateUserParams {
  full_name: string;
  password: string;
  email: string;
  role: "admin" | "employee";
}

export interface CreateUserResult {
  user_id: number;
  full_name: string;
  email: string;
  role: "admin" | "employee";
}
