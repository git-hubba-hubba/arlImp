import { useState } from "react";
import CalendarDayModal from "./CalendarDayModal";
import Modal from "./Modal";

const calendarStorageKey = (userId) => `arlImpactCalendarEvents:${userId}`;

const formatCalendarDateKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const getStoredCalendarEvents = (userId) => {
  if (!userId) return {};

  try {
    const rawEvents = localStorage.getItem(calendarStorageKey(userId));
    return rawEvents ? JSON.parse(rawEvents) : {};
  } catch {
    return {};
  }
};

const setStoredCalendarEvents = (userId, events) => {
  if (!userId) return;
  localStorage.setItem(calendarStorageKey(userId), JSON.stringify(events));
};

const Calendar = ({ currentUser }) => {
  const today = new Date();
  const currentUserId = currentUser?._id || currentUser?.id;

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [savedEvents, setSavedEvents] = useState(() =>
    getStoredCalendarEvents(currentUserId)
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sn", "M", "T", "W", "Th", "F", "S"];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();

  const calendarDays = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const openModal = (day) => {
    if (!day) return;
    setSelectedDay(day);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  const selectedDate =
    selectedDay !== null
      ? `${months[selectedMonth]} ${selectedDay}, ${selectedYear}`
      : "";
  const selectedDateKey =
    selectedDay !== null
      ? formatCalendarDateKey(selectedYear, selectedMonth, selectedDay)
      : "";

  const handleSaveEvent = (dateKey, eventText) => {
    if (!currentUserId) return;

    setSavedEvents((currentEvents) => {
      const nextEvents = {
        ...currentEvents,
        [dateKey]: eventText,
      };

      if (!eventText.trim()) {
        delete nextEvents[dateKey];
      }

      setStoredCalendarEvents(currentUserId, nextEvents);
      return nextEvents;
    });
    closeModal();
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <p className="fontdiner-swanky-regular">Calendar</p>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="month-dropdown fontdiner-swanky-regular"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="weekday-row">
        {weekDays.map((day) => (
          <div key={day} className="weekday fontdiner-swanky-regular">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => (
          (() => {
            const dateKey = day
              ? formatCalendarDateKey(selectedYear, selectedMonth, day)
              : "";
            const hasSavedEvent = Boolean(savedEvents[dateKey]?.trim());

            return (
              <button
                key={index}
                className={`calendar-day ${!day ? "empty-day" : ""} ${hasSavedEvent ? "has-calendar-event" : ""}`}
                onClick={() => openModal(day)}
                disabled={!day}
              >
                <span>{day}</span>
                {hasSavedEvent && (
                  <span aria-label="Saved calendar event" className="calendar-event-icon">
                    •
                  </span>
                )}
              </button>
            );
          })()
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedDay)}
        onClose={closeModal}
        title={selectedDate}
        component={CalendarDayModal}
        componentProps={{
          currentUser,
          eventText: savedEvents[selectedDateKey] || "",
          onSaveEvent: handleSaveEvent,
          selectedDate,
          selectedDateKey,
        }}
      />
    </div>
  );
};

export default Calendar;
