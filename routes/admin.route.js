import express from "express";
const router = express.Router();
import {
  authAdmin,
  deleteAdmin,
  getAdminById,
  getAdminProfile,
  getAdmins,
  registerAdmin,
  updateAdmin,
  updateAdminProfile,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/authMiddleware.js";

// for checking admin
// router.route("/").post(registerAdmin).get(protect, admin, getAdmins);

router
  .route("/profile")
  .get(protect, getAdminProfile)
  .put(protect, updateAdminProfile);
router.post("/login", authAdmin);
router
  .route("/:id")
  .delete(protect, deleteAdmin)
  .get(protect, getAdminById)
  .put(protect, updateAdmin);
router.route("/").post(registerAdmin).get(protect, getAdmins);

export default router;
