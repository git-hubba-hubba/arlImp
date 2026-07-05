const jwt = require("jsonwebtoken");

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required.");
  }

  return jwt.sign(
    {
      userId: user._id,
      userEmail: user.userEmail,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

module.exports = createToken;
