import z from "zod";

export const getAllEmployeesQuery = z.object({
  limit: z
    .string()
    .transform(Number)
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100",
    })
    .optional()
    .default(1),
  page: z
    .string()
    .transform(Number)
    .refine((val) => val > 0, { message: "Page must be >=1" })
    .optional()
    .default(10),
  search: z.string().trim().max(100, "Search term too long").optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type GetAllEmployeesQueryData = z.infer<typeof getAllEmployeesQuery>;
