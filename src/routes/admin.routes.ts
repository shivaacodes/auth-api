import { Router, Request, Response } from "express";
import { authenticate, authorizeRoles } from "../middleware/auth"

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome, Admin!" });
  }
);

export default router;
