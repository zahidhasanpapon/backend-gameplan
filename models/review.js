const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    team_name: {
      type: String,
      required: true,
    },
    review: {
      type: Sting,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
