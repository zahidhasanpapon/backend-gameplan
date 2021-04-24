const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(helmet());

// Set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => res.send("Building Gameplan API"));

const visitorRoute = require("./routes/visitors");
app.use("/visitors", visitorRoute);

// Database config
const dbUrl = process.env.MONGODB_URI;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

/**
  mongoose.connect(dbUrl, { useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
  console.log("MongoDB database connection established succsessfully");
  });
 */

// Route
