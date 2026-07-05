import React from "react";
import { formatMonthDayYear } from "../utils/dateFormat";
import { DEFAULT_EVENT_IMAGE, getEventImageSrc } from "../utils/defaultImages";

function EventModal({ event }) {
  const eventImage = getEventImageSrc(event);

  return (
    <div className="modalDetail">
      <img
        src={eventImage}
        alt={event.eventName}
        className="modalEventImg"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_EVENT_IMAGE;
        }}
      />
      <p className="modalEyebrow">{event.eventLocation || event.eventHost}</p>
      <p>{formatMonthDayYear(event.eventDate)}</p>
      {event.eventDescription && <p>{event.eventDescription}</p>}
    </div>
  );
}

export default EventModal;
