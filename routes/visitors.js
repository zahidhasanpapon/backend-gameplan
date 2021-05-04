import express from "express";
const router = express.Router();
import Visitor from "../models/visitor.model.js";
import asyncHander from "express-async-handler";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// constant for oAuth2 tokens
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const CLIENT_ID = process.env.CLIENT_ID;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// oAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Refresh token
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.route("/").get((req, res) => {
  Visitor.find()
    .then((visitors) => res.json(visitors))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete(
  asyncHander(async (req, res) => {
    const visitor = await Visitor.findById(req.params.id);
    if (visitor) {
      await visitor.remove();
      res.json({ message: "Visitor removed" });
    } else {
      res.status(404);
      throw new Error("Visitor not found");
    }
  })
);

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  const newVisitor = new Visitor({
    name,
    email,
    phone,
    message,
  });

  await newVisitor
    .save()
    .then(() => res.json("Query added!"))
    .catch((err) => res.status(400).josn("Error: " + err));

  // Message content
  const output = `
    <p>A New Contact Request</P>
    <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Message: ${message}</li>
      </ul>
  `;

  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: "1631146@iub.edu.bd",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "GAMEPLAN 📧 <1631146@iub.edu.bd>",
      to: "zahidhasanpapon@gmail.com",
      subject: "Gameplan Contact Request",
      text: `${message}`,
      html: `${output}`,
    };

    const result = await transporter
      .sendMail(mailOptions)
      .then((result) => console.log("Email Sent...", result))
      .catch((error) => console.log(error.message));
  } catch (error) {
    return error;
  }
});

// module.exports = router;
export default router;
