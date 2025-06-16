import { Router } from "express";
import { authenticate, authorizeRoles } from "../middleware/auth";

const router = Router();

router.get("/dashboard", authenticate, authorizeRoles("ADMIN"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

export default router;

