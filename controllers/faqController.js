import Faq from "../models/faq.model.js";
import asyncHandler from "express-async-handler";

const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find();
  res.json(faqs);
});

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const faq = await Faq.create({
    admin: req.admin._id,
    question,
    answer,
  });
  if (faq) {
    res.status(201).json({
      question: faq.question,
      answer: faq.answer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Question Data");
  }
});

export { getFaqs, createFaq };
