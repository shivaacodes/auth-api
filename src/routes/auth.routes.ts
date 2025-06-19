import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { signup, login } from "../controllers/controller.auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://auth-api-seven-brown.vercel.app/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    
    const redirectUrl = user.role === 'ADMIN' 
      ? `https://auth-api-seven-brown.vercel.app/admin?token=${token}`
      : `https://auth-api-seven-brown.vercel.app/dashboard?token=${token}`;
    
    res.redirect(redirectUrl);
  }
);

export default router;
