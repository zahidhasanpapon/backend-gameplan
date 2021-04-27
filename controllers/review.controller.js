import Review from "../models/review.model.js";
import asyncHander from "express-async-handler";

const getReviews = asyncHander(async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

const getReviewById = asyncHander(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    res.json(review);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

export { getReviews, getReviewById };
