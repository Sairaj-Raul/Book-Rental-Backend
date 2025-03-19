import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const DB_NAME = process.env.DB_NAME;

export const connectDB = async () => {
  try {
    console.log("Mongodb URL", process.env.MONGODB_URI);

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("\n MongoDB Connected: ", connectionInstance.connection.host);
  } catch (error) {
    console.log("MongoDb connection Error: ", error);
    throw new Error(error.message);
  }
};
