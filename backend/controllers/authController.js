const User = require("../models/User");
const createToken = require("../utils/token");
const { upsertMemberFromUser } = require("../utils/memberSync");

async function register(req, res, next) {
  try {
    const user = await User.create(req.body);
    const member = await upsertMemberFromUser(user);
    const token = createToken(user);

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user,
      member,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A user with that email already exists." });
    }

    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ userEmail }).select("+userPassword");

    if (!user || !(await user.comparePassword(userPassword))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createToken(user);
    user.userPassword = undefined;

    return res.json({
      message: "Login successful.",
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};
