import mongoose from "mongoose";
import colors from 'colors';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "ecommerce",
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB Connected".bgMagenta.white);
  } catch (error) {
    console.log("MongoDB connection error:", error.message.bgRed.white);
    throw error;
  }
};

export default connectDB;
