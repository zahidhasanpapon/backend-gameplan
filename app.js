const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

// Test
const reviews = require("./data/reviews");

const app = express();

app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => res.send("Building Gameplan API"));

const visitorRoute = require("./routes/visitors");
app.use("/visitors", visitorRoute);

const sendLinkRoute = require("./routes/numberLink");
app.use("/link", sendLinkRoute);

// Test
app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.get("/api/reviews/:id", (req, res) => {
  const review = reviews.find((p) => p._id === req.params.id);
  res.json(review);
});

const dbUrl = process.env.MONGODB_URI;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
