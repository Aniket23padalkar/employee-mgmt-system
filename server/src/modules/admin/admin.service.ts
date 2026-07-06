import type { AllEmployeesData } from "../../types/admin.types.js";
import type { SafeUser } from "../../types/auth.types.js";
import { AppError } from "../../utils/AppError.js";
import { getAllEmployeesFromDB } from "./admin.repository.js";

export const getAllEmployeesService = async (
  user: SafeUser,
): Promise<AllEmployeesData[]> => {
  if (user.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }

  const usersRaw = await getAllEmployeesFromDB();

  const users: AllEmployeesData[] = usersRaw.map((item) => {
    return {
      user_id: Number(item.user_id),
      full_name: item.full_name,
      role: item.role,
      email: item.email,
      must_change_password: item.must_change_password,
      department: item.department,
      designation: item.designation,
      created_at: new Date(item.created_at),
      updated_at: new Date(item.updated_at),
    };
  });

  return users;
};
