import passport from "passport";
import express from "express"
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: string;
      email: string;
    }
    interface Request {
      user?: User;
    }
  }
}

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token, user: { email: user.email, role: user.role } });
  }
);
