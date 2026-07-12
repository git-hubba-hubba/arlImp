import { useState } from "react";

function CalendarDayModal({
  currentUser,
  eventText = "",
  onSaveEvent,
  selectedDate,
  selectedDateKey,
}) {
  const [calendarEventText, setCalendarEventText] = useState(eventText);
  const isLoggedIn = Boolean(currentUser?._id || currentUser?.id);

  const handleSave = () => {
    if (!isLoggedIn) return;
    onSaveEvent?.(selectedDateKey, calendarEventText);
  };

  return (
    <div className="modalDetail">
      <p>You clicked {selectedDate} on the calendar.</p>
      {!isLoggedIn && (
        <p className="formStatus">Log in before saving calendar events.</p>
      )}

      <textarea
        placeholder="Add notes or event details..."
        className="event-textarea"
        value={calendarEventText}
        onChange={(e) => setCalendarEventText(e.target.value)}
      />

      <button className="save-btn" disabled={!isLoggedIn} onClick={handleSave} type="button">
        Save Event
      </button>
    </div>
  );
}

export default CalendarDayModal;
