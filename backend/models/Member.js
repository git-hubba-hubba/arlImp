const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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

memberSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Member", memberSchema);
