import express from "express";
const router = express.Router();

import {
  getFaqs,
  createFaq,
  deleteFaq,
  getFaqById,
  updateFaq,
} from "../controllers/faqController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getFaqs).post(protect, createFaq);

router
  .route("/:id")
  .delete(protect, deleteFaq)
  .get(protect, getFaqById)
  .put(protect, updateFaq);

export default router;
