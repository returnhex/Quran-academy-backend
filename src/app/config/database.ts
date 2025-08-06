import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url as string)
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("Error Connected to DB", error);
  }
}

export {connectDB};