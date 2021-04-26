import express from "express";
const router = express.Router();
import Review from "../models/review.model.js";
import asyncHander from "express-async-handler";

router.get(
  "/",
  asyncHander(async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
  })
);

router.get(
  "/:id",
  asyncHander(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404);
      throw new Error("Review not found");
    }
  })
);

export default router;
