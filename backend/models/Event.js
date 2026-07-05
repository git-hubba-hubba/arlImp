const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventLocation: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventImage: {
      type: String,
      default: "",
      trim: true,
    },
    eventDescription: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

eventSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Event", eventSchema);
