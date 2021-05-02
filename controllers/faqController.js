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

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (faq) {
    await faq.remove();
    res.json({ message: "Faq Removed" });
  } else {
    res.status(404);
    throw new Error("Faq not found");
  }
});

const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (faq) {
    res.json(faq);
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
});

export { getFaqs, createFaq, deleteFaq, getFaqById };
