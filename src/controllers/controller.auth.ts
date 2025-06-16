import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signupSchema, loginSchema } from "../utils/validation";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
  console.log("📥 Signup request received");

  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      console.log("❌ Zod validation failed", result.error.flatten().fieldErrors);
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, password } = result.data;
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Signup successful", user.email);
    res.status(201).json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error("🔥 Signup failed", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("🔐 Login request received");

  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      console.log("❌ Zod validation failed", result.error.flatten().fieldErrors);
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, password } = result.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful", user.email);
    res.status(200).json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error("🔥 Login failed", err);
    res.status(500).json({ error: "Login failed" });
  }
};