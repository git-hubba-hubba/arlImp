import { useState } from "react";
import CalendarDayModal from "./CalendarDayModal";
import Modal from "./Modal";

const Calendar = () => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

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
          <button
            key={index}
            className={`calendar-day ${!day ? "empty-day" : ""}`}
            onClick={() => openModal(day)}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedDay)}
        onClose={closeModal}
        title={selectedDate}
        component={CalendarDayModal}
        componentProps={{ selectedDate }}
      />
    </div>
  );
};

export default Calendar;
