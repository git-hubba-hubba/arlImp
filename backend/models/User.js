const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userPassword: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirmation: {
      type: String,
      required: true,
      select: false,
    },
    userImage: {
      type: String,
      default: "",
    },
    userPoints: {
      type: Number,
      default: 0,
    },
    userOccupation: {
      type: String,
      default: "",
      trim: true,
    },
    userBadgeTier: {
      type: String,
      default: "Bronze",
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("validate", function validatePasswordConfirmation(next) {
  if (this.isModified("userPassword") && this.userPassword !== this.passwordConfirmation) {
    return next(new Error("Password confirmation must match password."));
  }

  return next();
});

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("userPassword")) return next();

  const saltRounds = 10;
  this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
  this.passwordConfirmation = await bcrypt.hash(this.passwordConfirmation, saltRounds);

  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.userPassword);
};

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.userPassword;
    delete ret.passwordConfirmation;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
