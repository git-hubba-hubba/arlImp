import React from "react";
import { formatMonthDayYear } from "../../utils/dateFormat";
import { DEFAULT_EVENT_IMAGE, getEventImageSrc } from "../../utils/defaultImages";

function SmallEventShow({
  attendanceCode,
  attendanceStatus,
  eventObj,
  isSubmittingAttendance,
  onAttendanceChange,
  onAttendanceSubmit,
  onOpenModal,
}) {
  const eventImage = getEventImageSrc(eventObj);
  const attendanceKey = eventObj._id || eventObj.eventKey;
  const canSubmitAttendance = Boolean(attendanceKey && onAttendanceSubmit);

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

        {canSubmitAttendance && (
          <form
            className="attendanceForm"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.stopPropagation();
              onAttendanceSubmit(e, eventObj);
            }}
          >
            <input
              className="attendanceInput"
              value={attendanceCode || ""}
              onChange={(e) => onAttendanceChange(attendanceKey, e.target.value)}
              placeholder="AttendanceCode"
            />
            <button
              className="signUp attendanceSubmit"
              type="submit"
              disabled={isSubmittingAttendance}
            >
              {isSubmittingAttendance ? "Adding..." : "Submit"}
            </button>
            {attendanceStatus && (
              <p className="attendanceStatus">{attendanceStatus}</p>
            )}
          </form>
        )}
      </div>
    </>
  );
}

export default SmallEventShow;
