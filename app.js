import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(helmet());
app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => res.send("Building Gameplan API"));

import visitorRoute from "./routes/visitors.js";
app.use("/visitors", visitorRoute);

import sendLinkRoute from "./routes/numberLink.js";
app.use("/link", sendLinkRoute);

import reviewsRoute from "./routes/reviews.route.js";
app.use("/reviews", reviewsRoute);

import adminRoute from "./routes/admin.route.js";
app.use("/admin", adminRoute);

app.use(notFound);
app.use(errorHandler);
