import express from "express";
const router = express.Router();

import { getFaqs, createFaq } from "../controllers/faqControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getFaqs).post(protect, createFaq);

export default router;
