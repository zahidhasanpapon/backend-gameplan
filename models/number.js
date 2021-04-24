const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NumberSchema = new Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NumberLink = mongoose.model("NumberLink", NumberSchema);

module.exports = NumberLink;
