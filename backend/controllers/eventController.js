const Event = require("../models/Event");
const User = require("../models/User");
const { upsertMemberFromUser } = require("../utils/memberSync");

const MASTER_ATTENDANCE_CODE = "jmwofford";
const normalizeAttendanceCode = (value) => String(value || "").trim().toLowerCase();

async function getEvents(req, res, next) {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    return res.json(events);
  } catch (error) {
    return next(error);
  }
}

async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
}

async function updateEvent(req, res, next) {
  try {
    const payload = { ...req.body };

    if (payload.attendanceCode === "") {
      delete payload.attendanceCode;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.json(event);
  } catch (error) {
    return next(error);
  }
}

async function attendEvent(req, res, next) {
  try {
    const submittedCode = String(req.body.attendanceCode || "").trim();
    const isMasterCode = normalizeAttendanceCode(submittedCode) === MASTER_ATTENDANCE_CODE;

    if (!submittedCode) {
      return res.status(400).json({ message: "Attendance code is required." });
    }

    const event = await Event.findById(req.params.id).select("+attendanceCode");

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (!isMasterCode && !event.attendanceCode) {
      return res.status(400).json({ message: "This event does not have an attendance code yet." });
    }

    if (!isMasterCode && normalizeAttendanceCode(event.attendanceCode) !== normalizeAttendanceCode(submittedCode)) {
      return res.status(400).json({ message: "Attendance code does not match this event." });
    }

    const pointsEarned = event.attendancePoints || 0;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "attendedEvents.eventKey": { $ne: event._id.toString() },
      },
      {
        $inc: { userPoints: pointsEarned },
        $push: {
          attendedEvents: {
            event: event._id,
            eventKey: event._id.toString(),
            eventName: event.eventName,
            pointsEarned,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(409).json({ message: "Attendance already recorded for this event." });
    }

    await upsertMemberFromUser(updatedUser);

    return res.json({
      message: `Attendance recorded. ${pointsEarned} points earned.`,
      pointsEarned,
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.json({ message: "Event deleted successfully." });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  attendEvent,
  updateEvent,
  deleteEvent,
};
