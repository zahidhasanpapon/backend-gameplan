import express from "express";
const router = express.Router();

import {
  getFaqs,
  createFaq,
  deleteFaq,
  getFaqById,
} from "../controllers/faqController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getFaqs).post(protect, createFaq);

router.route("/:id").delete(protect, deleteFaq).get(protect, getFaqById);

export default router;
