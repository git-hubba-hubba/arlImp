const express = require("express");
const {
  attendEvent,
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} = require("../controllers/eventController");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getEvents).post(requireAuth, createEvent);
router.post("/:id/attendance", requireAuth, attendEvent);
router.route("/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;
