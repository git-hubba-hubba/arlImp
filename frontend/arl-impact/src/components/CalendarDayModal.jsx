import React from "react";

function CalendarDayModal({ selectedDate }) {
  return (
    <div className="modalDetail">
      <p>You clicked this day on the calendar.</p>

      <textarea
        placeholder="Add notes or event details..."
        className="event-textarea"
      />

      <button className="save-btn">Save Event</button>
    </div>
  );
}

export default CalendarDayModal;
