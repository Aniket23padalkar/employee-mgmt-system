import type { Request, Response } from "express";
import { getAllEmployeesService } from "./admin.service.js";
import type { AllEmployeesData } from "../../types/admin.types.js";

export const getAllEmployees = async (
  req: Request,
  res: Response<{
    success: boolean;
    message: string;
    users: AllEmployeesData[];
  }>,
) => {
  const result = await getAllEmployeesService(req.user);

  return res.status(200).json({
    success: true,
    message: "Fetched all employees successfully",
    users: result,
  });
};
