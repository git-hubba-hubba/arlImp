import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../api";
import { calculateDistanceMiles, formatDistance } from "../../utils/locationDistance";

function getCreatedById(event) {
  if (!event.createdBy) return "";
  if (typeof event.createdBy === "string") return event.createdBy;

  return event.createdBy._id || event.createdBy.id || "";
}

function hasCoordinates(location) {
  return typeof location.lat === "number" && typeof location.lng === "number";
}

function HomeWidget({ businesses = [], currentUser, userLocation }) {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("");
  const currentUserId = currentUser?._id || currentUser?.id;
  const attendedEvents = currentUser?.attendedEvents || [];

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsFromApi = await apiRequest("/events");
        setEvents(eventsFromApi);
        setStatus("");
      } catch {
        setStatus("Events unavailable.");
      }
    };

    loadEvents();
  }, []);

  const createdEvents = useMemo(() => {
    if (!currentUserId) return [];

    return events.filter((event) => getCreatedById(event) === currentUserId);
  }, [currentUserId, events]);

  const nearbyBusinesses = useMemo(() => {
    if (!userLocation) return [];

    return businesses
      .filter((business) => hasCoordinates(business))
      .map((business) => ({
        ...business,
        distanceMiles: calculateDistanceMiles(userLocation, business),
      }))
      .sort((leftBusiness, rightBusiness) => leftBusiness.distanceMiles - rightBusiness.distanceMiles)
      .slice(0, 5);
  }, [businesses, userLocation]);

  return (
    <aside className="homeWidgetPanel">
      <section className="homeWidgetSection">
        <h3 className="fontdiner-swanky-regular">My Created Events</h3>
        {!currentUserId && <p className="homeWidgetEmpty">Log in to see your created events.</p>}
        {currentUserId && createdEvents.length === 0 && (
          <p className="homeWidgetEmpty">No created events found.</p>
        )}
        {createdEvents.map((event) => (
          <article className="homeWidgetItem" key={event._id}>
            <p>{event.eventName}</p>
            <span>{event.eventLocation}</span>
          </article>
        ))}
      </section>

      <section className="homeWidgetSection">
        <h3 className="fontdiner-swanky-regular">My Attended Events</h3>
        {!currentUserId && <p className="homeWidgetEmpty">Log in to see attended events.</p>}
        {currentUserId && attendedEvents.length === 0 && (
          <p className="homeWidgetEmpty">No attended events yet.</p>
        )}
        {attendedEvents.map((attendance, index) => (
          <article
            className="homeWidgetItem"
            key={attendance._id || attendance.eventKey || `${attendance.eventName}-${index}`}
          >
            <p>{attendance.eventName || "Attended event"}</p>
            {typeof attendance.pointsEarned === "number" && (
              <span>{attendance.pointsEarned} points earned</span>
            )}
          </article>
        ))}
      </section>

      <section className="homeWidgetSection">
        <h3 className="fontdiner-swanky-regular">Businesses Near Me</h3>
        {!userLocation && (
          <p className="homeWidgetEmpty">Use Location Leaf to activate location.</p>
        )}
        {userLocation && businesses.filter((business) => hasCoordinates(business)).length === 0 && (
          <p className="homeWidgetEmpty">Add coordinates to show nearby locations.</p>
        )}
        {nearbyBusinesses.map((business) => (
          <article className="homeWidgetItem" key={business.id || business.name}>
            <p>{business.name}</p>
            <span>{formatDistance(business.distanceMiles)} away</span>
          </article>
        ))}
      </section>

      {status && <p className="formStatus">{status}</p>}
    </aside>
  );
}

export default HomeWidget;
