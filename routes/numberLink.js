import express from "express";
const router = express.Router();
import NumberLink from "../models/number.model.js";
import Vonage from "@vonage/server-sdk";
import dotenv from "dotenv";
dotenv.config();

// Initializing the vonage library
// const vonage = new Vonage({
//   apiKey: process.env.API_KEY,
//   apiSecret: process.env.API_SECRET,
// });

router.route("/").get((req, res) => {
  NumberLink.find()
    .then((numbers) => res.json(numbers))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/sendlink").post((req, res) => {
  // Database
  const phone = Number(req.body.phone);

  console.log(req.body.phone);

  const newNumber = new NumberLink({
    phone,
  });

  newNumber
    .save()
    .then(() => res.json("Enquiry added!"))
    .catch((err) => res.status(400).josn("Error: " + err));

  // SMS API
  // const from = "Gameplan";
  // const text = "Enjoy Gameplan";
  // vonage.message.sendSms(from, phone, text, (err, responseData) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (responseData.messages[0]["status"] === "0") {
  //       console.log("Message sent successfully.");
  //     } else {
  //       console.log(
  //         `Message failed with error: ${responseData.messages[0]["error-text"]}`
  //       );
  //     }
  //   }
  // });
});

export default router;
