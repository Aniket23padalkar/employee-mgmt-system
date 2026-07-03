export interface SafeUser {
  user_id: number;
  full_name: string;
  role: "admin" | "employee";
  email: string;
  department: string;
  designation: string;
}
