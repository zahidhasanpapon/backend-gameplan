import express from "express";
const router = express.Router();
import { getReviews, getReviewById } from "../controllers/review.controller.js";

router.route("/").get(getReviews);

router.route("/:id").get(getReviewById);

export default router;
