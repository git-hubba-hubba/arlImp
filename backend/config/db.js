const mongoose = require("mongoose");

async function connectDB(uri = process.env.MONGO_URI) {
  if (!uri) {
    throw new Error("MONGO_URI is required to connect to MongoDB.");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  return mongoose.connection;
}

module.exports = connectDB;
