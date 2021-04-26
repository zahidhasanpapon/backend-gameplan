import mongoose from "mongoose";
const { Schema } = mongoose;

const faqSchema = new Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
