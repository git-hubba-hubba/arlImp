const User = require("../models/User");
const Member = require("../models/Member");
const { upsertMemberFromUser } = require("../utils/memberSync");

async function getUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    const member = await upsertMemberFromUser(user);

    return res.status(201).json({ user, member });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A user with that email already exists." });
    }

    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select("+userPassword +passwordConfirmation");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    Object.assign(user, req.body);
    await user.save();

    const syncedUser = await User.findById(user._id);
    const member = await upsertMemberFromUser(syncedUser);

    return res.json({ user: syncedUser, member });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A user with that email already exists." });
    }

    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await Member.findOneAndDelete({ user: user._id });

    return res.json({ message: "User deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
