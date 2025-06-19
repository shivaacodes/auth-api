import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string() 
    .min(6, { message: "Password must be at least 6 characters" }),
});


export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
