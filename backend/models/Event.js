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
    attendanceCode: {
      type: String,
      default: "",
      trim: true,
      select: false,
    },
    attendancePoints: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  { timestamps: true }
);

eventSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.attendanceCode;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Event", eventSchema);
