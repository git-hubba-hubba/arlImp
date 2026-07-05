const Event = require("../models/Event");

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
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
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
  updateEvent,
  deleteEvent,
};
