import { formatMonthDayYear } from "../utils/dateFormat";
import { DEFAULT_EVENT_IMAGE, getEventImageSrc } from "../utils/defaultImages";

function getEventMood(eventDate) {
  if (!eventDate) return "open";

  const today = new Date();
  const eventDay = new Date(eventDate);
  const daysUntilEvent = Math.ceil((eventDay - today) / (1000 * 60 * 60 * 24));

  if (daysUntilEvent < 0) return "past";
  if (daysUntilEvent <= 7) return "soon";

  return "upcoming";
}

function getEventMoodLabel(mood) {
  if (mood === "past") return "Recently Passed";
  if (mood === "soon") return "Coming Up Soon";
  if (mood === "upcoming") return "Upcoming";

  return "Open Event";
}

function EventModal({ event, onOpenComments }) {
  const eventImage = getEventImageSrc(event);
  const eventMood = getEventMood(event.eventDate);
  const eventPoints = event.attendancePoints ?? 100;

  return (
    <div className={`eventModalTemplate eventModal-${eventMood}`}>
      <section className="eventModalHero">
        <img
          src={eventImage}
          alt={event.eventName}
          className="eventModalImage"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_EVENT_IMAGE;
          }}
        />
        <div className="eventModalHeroCopy">
          <p className="eventModalEyebrow">{getEventMoodLabel(eventMood)}</p>
          <h2 className="eventModalTitle fontdiner-swanky-regular">{event.eventName}</h2>
          <p>{event.eventLocation || event.eventHost || "Location to be announced"}</p>
        </div>
      </section>

      <section className="eventModalStats">
        <div>
          <span>Date</span>
          <strong>{formatMonthDayYear(event.eventDate)}</strong>
        </div>
        <div>
          <span>Points</span>
          <strong>{eventPoints}</strong>
        </div>
        <div>
          <span>Code</span>
          <strong>{event.attendanceCode ? "Enabled" : "Hidden"}</strong>
        </div>
      </section>

      {event.eventDescription && (
        <section className="eventModalStory">
          <p className="eventModalEyebrow">Event Details</p>
          <p>{event.eventDescription}</p>
        </section>
      )}

      <section className="eventModalActions">
        <button className="signUp profileAction" type="button" onClick={onOpenComments}>
          Comments
        </button>
      </section>
    </div>
  );
}

export default EventModal;
