import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // options for older Mongoose versions; safe to include
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.error("DB connection error:", err.message || err);
    process.exit(1);
  }
};

export default connectDB;