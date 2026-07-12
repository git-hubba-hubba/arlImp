import { useEffect, useState } from 'react'
import { apiRequest } from '../../api'
import EventFormModal from '../../components/EventFormModal'
import LocationLeaf from '../../components/LocationLeaf'
import Modal from '../../components/Modal'
import { toDateInputValue } from '../../utils/dateFormat'
import EventCategoryHold from './EventCategoryHold'

const MASTER_ATTENDANCE_CODE = "jmwofford";
const normalizeCode = (value) => String(value || "").trim().toLowerCase();
const isMasterAttendanceCode = (value) => normalizeCode(value) === MASTER_ATTENDANCE_CODE;
const sampleEventKey = (contentType, eventName, index) =>
  `${contentType}-${eventName}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const sampleAttendanceCode = (contentType, index) =>
  `ARL-${contentType.replace(/\s+/g, "").toUpperCase()}-${index + 1}`;

const featuredBusinesses = [
  // {
  //   id: "business-1",
  //   name: "Business Name",
  //   lat: 32.705,
  //   lng: -97.1228,
  //   iconUrl: "/icons/business.png",
  //   category: "Category",
  //   address: "Optional address",
  // },
];

function EventDash({ currentUser, onOpenModal, onNotify, onUserUpdate }) {
  const [dbEvents, setDbEvents] = useState([]);
  const [eventForm, setEventForm] = useState({
    eventName: "",
    eventLocation: "",
    eventDate: "",
    eventImage: "",
    eventDescription: "",
    attendanceCode: "",
    attendancePoints: 100,
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [attendanceCodes, setAttendanceCodes] = useState({});
  const [attendanceStatuses, setAttendanceStatuses] = useState({});
  const [submittingAttendanceId, setSubmittingAttendanceId] = useState(null);

  const loadEvents = async () => {
    try {
      const eventsFromApi = await apiRequest("/events");
      setDbEvents(eventsFromApi);
    } catch {
      setStatus("Backend events unavailable; showing sample events.");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEventChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetEventForm = () => {
    setEventForm({
      eventName: "",
      eventLocation: "",
      eventDate: "",
      eventImage: "",
      eventDescription: "",
      attendanceCode: "",
      attendancePoints: 100,
    });
    setEditingEventId(null);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const trimmedImage = eventForm.eventImage.trim();
    const payload = {
      ...eventForm,
      eventImage: trimmedImage,
      attendancePoints: Number(eventForm.attendancePoints) || 0,
    };

    try {
      let savedEvent;

      if (editingEventId) {
        savedEvent = await apiRequest(`/events/${editingEventId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setDbEvents((currentEvents) =>
          currentEvents.map((event) =>
            event._id === editingEventId ? savedEvent : event
          )
        );
      } else {
        savedEvent = await apiRequest("/events", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setDbEvents((currentEvents) => [savedEvent, ...currentEvents]);
      }

      setStatus(editingEventId ? "Event updated." : "Event created.");
      onNotify?.(
        "event",
        editingEventId
          ? `${savedEvent.eventName} was edited.`
          : `${savedEvent.eventName} was created.`
      );
      resetEventForm();
      setIsEventModalOpen(false);
      loadEvents();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event._id);
    setEventForm({
      eventName: event.eventName || "",
      eventLocation: event.eventLocation || "",
      eventDate: toDateInputValue(event.eventDate),
      eventImage: event.eventImage || event.eventImg || "",
      eventDescription: event.eventDescription || "",
      attendanceCode: "",
      attendancePoints: event.attendancePoints ?? 100,
    });
    setIsEventModalOpen(true);
  };

  const handleAttendanceChange = (eventId, value) => {
    setAttendanceCodes((currentCodes) => ({
      ...currentCodes,
      [eventId]: value,
    }));
  };

  const handleAttendanceSubmit = async (e, event) => {
    e.preventDefault();
    const attendanceKey = event._id || event.eventKey;

    if (!currentUser?._id) {
      setAttendanceStatuses((currentStatuses) => ({
        ...currentStatuses,
        [attendanceKey]: "Sign in before adding attendance.",
      }));
      return;
    }

    const attendanceCode = attendanceCodes[attendanceKey]?.trim();

    if (!attendanceCode) {
      setAttendanceStatuses((currentStatuses) => ({
        ...currentStatuses,
        [attendanceKey]: "Enter this event's AttendanceCode.",
      }));
      return;
    }

    setSubmittingAttendanceId(attendanceKey);
    setAttendanceStatuses((currentStatuses) => ({
      ...currentStatuses,
      [attendanceKey]: "",
    }));

    try {
      let message;
      let updatedUser;

      if (event._id) {
        const result = await apiRequest(`/events/${event._id}/attendance`, {
          method: "POST",
          body: JSON.stringify({ attendanceCode }),
        });

        message = result.message;
        updatedUser = result.user;
      } else {
        const alreadyAttended = (currentUser.attendedEvents || []).some(
          (attendance) => attendance.eventKey === event.eventKey
        );

        if (alreadyAttended) {
          throw new Error("Attendance already recorded for this event.");
        }

        if (
          !isMasterAttendanceCode(attendanceCode) &&
          normalizeCode(event.attendanceCode) !== normalizeCode(attendanceCode)
        ) {
          throw new Error("Attendance code does not match this event.");
        }

        const pointsEarned = event.attendancePoints || 100;
        const nextUser = {
          ...currentUser,
          userPoints: (Number(currentUser.userPoints) || 0) + pointsEarned,
          attendedEvents: [
            ...(currentUser.attendedEvents || []),
            {
              eventKey: event.eventKey,
              eventName: event.eventName,
              pointsEarned,
              attendedAt: new Date().toISOString(),
            },
          ],
        };

        const result = await apiRequest(`/users/${currentUser._id}`, {
          method: "PUT",
          body: JSON.stringify(nextUser),
        });

        message = `Attendance recorded. ${pointsEarned} points earned.`;
        updatedUser = result.user;
      }

      onUserUpdate?.(updatedUser);
      onNotify?.("event", message);
      setAttendanceCodes((currentCodes) => ({
        ...currentCodes,
        [attendanceKey]: "",
      }));
      setAttendanceStatuses((currentStatuses) => ({
        ...currentStatuses,
        [attendanceKey]: message,
      }));
    } catch (error) {
      setAttendanceStatuses((currentStatuses) => ({
        ...currentStatuses,
        [attendanceKey]: error.message,
      }));
    } finally {
      setSubmittingAttendanceId(null);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await apiRequest(`/events/${eventId}`, { method: "DELETE" });
      await loadEvents();
      setStatus("Event deleted.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const events = [
    [{
      eventName: "Future Innovators Summit",
      eventDate: "July 18, 2026",
      eventHost: "Visionary Collective",
      eventLocation: "Atlanta, GA",
      eventImg:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    },
    {
      eventName: "Community Leadership Conference",
      eventDate: "August 2, 2026",
      eventHost: "Unity Network",
      eventLocation: "Dallas, TX",
      eventImg:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
    {
      eventName: "Black Tech Expo",
      eventDate: "August 14, 2026",
      eventHost: "Innovate Together",
      eventLocation: "Houston, TX",
      eventImg:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
      eventName: "Entrepreneur Growth Workshop",
      eventDate: "September 5, 2026",
      eventHost: "Next Level Ventures",
      eventLocation: "Charlotte, NC",
      eventImg:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    }]
    ,
    [{
      eventName: "Black Tech Expo",
      eventDate: "August 14, 2026",
      eventHost: "Innovate Together",
      eventLocation: "Houston, TX",
      eventImg:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },{
      eventName: "Youth Empowerment Forum",
        eventDate: "September 19, 2026",
        eventHost: "Tomorrow's Leaders",
        eventLocation: "Chicago, IL",
        eventImg:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
      },
      {
        eventName: "Creative Minds Meetup",
        eventDate: "October 3, 2026",
        eventHost: "Open Canvas",
        eventLocation: "Los Angeles, CA",
        eventImg:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      },
      {
        eventName: "Digital Skills Bootcamp",
        eventDate: "October 24, 2026",
        eventHost: "Code Forward",
        eventLocation: "Seattle, WA",
        eventImg:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      }],
    [{
      eventName: "Black Tech Expo",
      eventDate: "August 14, 2026",
      eventHost: "Innovate Together",
      eventLocation: "Houston, TX",
      eventImg:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },{
      eventName: "Financial Freedom Seminar",
      eventDate: "November 7, 2026",
      eventHost: "Prosperity First",
      eventLocation: "Miami, FL",
      eventImg:
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&q=80",
    },
    {
      eventName: "Culture & Heritage Festival",
      eventDate: "November 21, 2026",
      eventHost: "Heritage Alliance",
      eventLocation: "New Orleans, LA",
      eventImg:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    },
    {
      eventName: "Startup Networking Night",
      eventDate: "December 12, 2026",
      eventHost: "Founders Circle",
      eventLocation: "Austin, TX",
      eventImg:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    }],
    [{
      eventName: "Black Tech Expo",
      eventDate: "August 14, 2026",
      eventHost: "Innovate Together",
      eventLocation: "Houston, TX",
      eventImg:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },{
      eventName: "Black Tech Expo",
      eventDate: "August 14, 2026",
      eventHost: "Innovate Together",
      eventLocation: "Houston, TX",
      eventImg:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },{
      eventName: "Women in Leadership Forum",
      eventDate: "January 16, 2027",
      eventHost: "Elevate Together",
      eventLocation: "Washington, DC",
      eventImg:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=800&q=80",
    },
    {
      eventName: "Annual Innovation Awards",
      eventDate: "February 20, 2027",
      eventHost: "Innovation Society",
      eventLocation: "San Francisco, CA",
      eventImg:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    }]
  ];
  const eventSections = [
    { contentType: "For You", arrObjs: events[0] },
    { contentType: "Trending", arrObjs: events[1] },
    { contentType: "Today", arrObjs: events[2] },
    { contentType: "Free Events", arrObjs: events[3] },
  ].map((section) => ({
    ...section,
    arrObjs: section.arrObjs.map((event, index) => ({
      ...event,
      eventKey: sampleEventKey(section.contentType, event.eventName, index),
      attendanceCode: sampleAttendanceCode(section.contentType, index),
      attendancePoints: event.attendancePoints || 100,
    })),
  }));

  return (
    <div>
      <img src="https://reformjudaism.org/sites/default/files/2021-01/camp-quiz-animation.gif" alt="" className="eventSplashImg" />
      <h1 className="evntSplashName fontdiner-swanky-regular"> Community & Local Events</h1>
      <LocationLeaf businesses={featuredBusinesses} />
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          resetEventForm();
        }}
        title={editingEventId ? "Edit Event" : "Create Event"}
        component={EventFormModal}
        componentProps={{
          editingEventId,
          eventForm,
          onCancel: () => {
            setIsEventModalOpen(false);
            resetEventForm();
          },
          onChange: handleEventChange,
          onSubmit: handleEventSubmit,
          status,
        }}
      />
      <div className="crudPanel">
        <button
          className="signUp formSubmit"
          type="button"
          onClick={() => {
            resetEventForm();
            setStatus("");
            setIsEventModalOpen(true);
          }}
        >
          Create Event
        </button>
        {status && !isEventModalOpen && <p className="formStatus">{status}</p>}
      </div>
      {dbEvents.length > 0 && (
        <>
          <EventCategoryHold
            attendanceCodes={attendanceCodes}
            attendanceStatuses={attendanceStatuses}
            contentType={"Database Events"}
            arrObjs={dbEvents}
            onAttendanceChange={handleAttendanceChange}
            onAttendanceSubmit={handleAttendanceSubmit}
            onOpenModal={onOpenModal}
            submittingAttendanceId={submittingAttendanceId}
          />
          <div className="crudList">
            {dbEvents.map((event) => (
              <div className="crudListItem" key={event._id}>
                <span>{event.eventName}</span>
                <button className="signUp profileAction" type="button" onClick={() => handleEditEvent(event)}>Edit</button>
                <button className="signUp profileAction" type="button" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
      {eventSections.map((section) => (
        <EventCategoryHold
          attendanceCodes={attendanceCodes}
          attendanceStatuses={attendanceStatuses}
          key={section.contentType}
          contentType={section.contentType}
          arrObjs={section.arrObjs}
          onAttendanceChange={handleAttendanceChange}
          onAttendanceSubmit={handleAttendanceSubmit}
          onOpenModal={onOpenModal}
          submittingAttendanceId={submittingAttendanceId}
        />
      ))}

    </div>
  )
}

export default EventDash
