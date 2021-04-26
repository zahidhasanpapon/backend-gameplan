import mongoose from "mongoose";
import dotenv from "dotenv";
import admins from "./data/admins.js";
import reviews from "./data/reviews.js";
import Admin from "./models/admin.model.js";
import Review from "./models/review.model.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Review.deleteMany();
    await Admin.deleteMany();

    const createdAdmins = await Admin.insertMany(admins);

    const adminUser = createdAdmins[0]._id;

    const sampleReviews = reviews.map((review) => {
      return { ...review, admin: adminUser };
    });

    await Review.insertMany(sampleReviews);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroytData = async () => {
  try {
    await Review.deleteMany();
    await Admin.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroytData();
} else {
  importData();
}
