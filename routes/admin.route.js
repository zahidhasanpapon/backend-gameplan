import express from "express";
const router = express.Router();
import {
  authAdmin,
  getAdminProfile,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerAdmin);
router.post("/login", authAdmin);
router.route("/profile").get(protect, getAdminProfile);

export default router;
