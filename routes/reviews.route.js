import express from "express";
const router = express.Router();
import {
  getReviews,
  getReviewById,
  deleteReview,
  updateReview,
  createReview,
} from "../controllers/review.controller.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getReviews).post(protect, createReview);

router
  .route("/:id")
  .get(getReviewById)
  .delete(protect, deleteReview)
  .put(protect, updateReview);

export default router;
