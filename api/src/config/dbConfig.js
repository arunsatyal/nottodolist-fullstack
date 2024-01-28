import mongoose from "mongoose";

const mongo_db_url =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/ntdl-db";

export const connectMongo = () => {
  try {
    const connect = mongoose.connect(mongo_db_url);
    if (connect) {
      console.log("Database conected at" + mongo_db_url);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
