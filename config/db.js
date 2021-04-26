import mongoose from "mongoose";

const connectDB = async () => {
  const dbUrl = process.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
