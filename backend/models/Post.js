const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: true,
      trim: true,
    },
    postAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    postImage: {
      type: String,
      default: "",
    },
    postCategory: {
      type: String,
      default: "General",
      trim: true,
    },
    postBody: {
      type: String,
      default: "",
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Post", postSchema);
