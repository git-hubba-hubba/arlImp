const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const memberRoutes = require("./routes/memberRoutes");
const eventRoutes = require("./routes/eventRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowLanOrigins = process.env.ALLOW_LAN_ORIGINS !== "false";
const localNetworkOriginPattern =
  /^https?:\/\/(localhost|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(:\d+)?$/;

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        configuredOrigins.length === 0 ||
        configuredOrigins.includes(origin) ||
        (allowLanOrigins && localNetworkOriginPattern.test(origin))
      ) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS."));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server error.",
  });
});

module.exports = app;
