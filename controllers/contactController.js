import Contact from "../models/contactModel.js";
import asyncHandler from "express-async-handler";

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

const createContacts = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;
  /**
   * need to solve the phone number issue
   */
  // const bdCode = 880;
  // const bdPhone = `${bdCode}${phone}`;
  // console.log(bdPhone);
  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });
  if (contact) {
    res.status(201).json({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Contact Form");
  }
});

export { getContacts, createContacts };
