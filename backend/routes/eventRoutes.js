const express = require("express");
const {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/").get(getEvents).post(createEvent);
router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;
