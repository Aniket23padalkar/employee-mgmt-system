import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be atleast 8 characters")
  .max(64, "Password must be under 64 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .refine((val) => !/\s/.test(val), "Password must not contain spaces");

export const registerSchema = z
  .object({
    full_name: z.string().trim().toLowerCase().min(3, "First name is required"),
    email: z.email().toLowerCase().trim(),
    password: passwordSchema,
    confirm_password: z.string(),
    role: z.enum(["admin", "employee"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password do not match",
    path: ["confirm_password"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
