import mongoose from "mongoose";
const { Schema } = mongoose;

const numberSchema = new Schema(
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

const NumberLink = mongoose.model("NumberLink", numberSchema);

export default NumberLink;
