import { z } from "zod";

// signup validation
export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), //abc@gmail.com format
  password: z
    .string() 
    .min(6, { message: "Password must be at least 6 characters" }),// it should be a string with min 6 chrs
});


//login validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
