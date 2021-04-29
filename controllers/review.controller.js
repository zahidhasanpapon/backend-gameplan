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

const deleteReview = asyncHander(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    await review.remove();
    res.json({ message: "Review removed" });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

const createReview = asyncHander(async (req, res) => {
  const review = new Review({
    admin: req.admin._id,
    name: "Sample Name",
    image: "/images/sample.jpg",
    team: "Sample Team Name",
    quote: "Sample Review",
    rating: 0,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

const updateReview = asyncHander(async (req, res) => {
  const { name, image, team, quote, rating } = req.body;

  const review = await Review.findById(req.params.id);

  if (review) {
    review.name = name;
    review.image = image;
    review.team = team;
    review.quote = quote;
    review.rating = rating;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

export { getReviews, getReviewById, deleteReview, createReview, updateReview };
