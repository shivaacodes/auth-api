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
    failureRedirect: "http://localhost:3000/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

export default router;
