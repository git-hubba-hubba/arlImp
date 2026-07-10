import React from "react";
import SmallEventShow from "./SmallEventShow";

function EventCategoryHold({
  attendanceCodes,
  attendanceStatuses,
  contentType,
  arrObjs,
  onAttendanceChange,
  onAttendanceSubmit,
  onOpenModal,
  submittingAttendanceId,
}) {
  return (
    <div
      style={
        {
          // border: " .5px solid black",
          // margin: ".2em",
          // backgroundColor: "lightblue",
        }
      }
    >
      <div className="eventNavSm">
        <h3 className="topicEvt fontdiner-swanky-regular">{contentType}</h3>
      </div>
      <div className="specificEvent">
        {arrObjs.map((tinyEv, index) => {
          const attendanceKey = tinyEv._id || tinyEv.eventKey;

          return (
            <div
              key={attendanceKey || `${contentType}-${tinyEv.eventName}-${index}`}
            >
              <SmallEventShow
                attendanceCode={attendanceCodes?.[attendanceKey]}
                attendanceStatus={attendanceStatuses?.[attendanceKey]}
                topic={contentType}
                eventObj={tinyEv}
                isSubmittingAttendance={submittingAttendanceId === attendanceKey}
                onAttendanceChange={onAttendanceChange}
                onAttendanceSubmit={onAttendanceSubmit}
                onOpenModal={() => onOpenModal(tinyEv)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventCategoryHold;
