require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";

connectDB()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`ARL Impact API running at http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
