const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NumberSchema = new Schema(
  {
    phone_number: {
      type: Number,
      required: true,
      min: 11,
      max: 11,
    },
  },
  {
    timestamps: true,
  }
);

const Number = mongoose.model("Number", NumberSchema);

module.exports = Number;
