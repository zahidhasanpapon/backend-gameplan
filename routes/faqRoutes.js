import express from "express";
const router = express.Router();

import { getFaqs, createFaq, deleteFaq } from "../controllers/faqController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getFaqs).post(protect, createFaq);

router.route("/:id").delete(protect, deleteFaq);

export default router;
