import React from "react";
import { formatMonthDayYear } from "../../utils/dateFormat";
import { DEFAULT_EVENT_IMAGE, getEventImageSrc } from "../../utils/defaultImages";

function SmallEventShow({ eventObj, onOpenModal }) {
  const eventImage = getEventImageSrc(eventObj);

  return (
    <>
      <div className="smEventShowContainer" onClick={onOpenModal}>
        <img
          src={eventImage}
          alt={eventObj.eventName}
          className="smShowImg"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_EVENT_IMAGE;
          }}
        />

        <p className="smTopicSay">{eventObj.eventName}</p>

        <p className="smDateSay">{formatMonthDayYear(eventObj.eventDate)}</p>

      </div>
    </>
  );
}

export default SmallEventShow;
