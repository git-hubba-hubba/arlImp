import { useMemo, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { calculateDistanceMiles, formatDistance } from "../utils/locationDistance";

const ARLINGTON_CENTER = [32.705, -97.1228];
const ARLINGTON_RADIUS_METERS = 10000;
const arlingtonCenterLocation = {
  lat: ARLINGTON_CENTER[0],
  lng: ARLINGTON_CENTER[1],
};

const userLocationIcon = L.divIcon({
  className: "locationLeafUserMarker",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const defaultBusinessIcon = L.divIcon({
  className: "locationLeafBusinessMarker",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function getBusinessIcon(business) {
  if (!business.iconUrl) return defaultBusinessIcon;

  return L.icon({
    iconUrl: business.iconUrl,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

function LocationLeaf({ businesses = [], onUserLocationChange }) {
  const [locationError, setLocationError] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const arlingtonDistanceMiles = useMemo(() => {
    if (!userLocation) return null;

    return calculateDistanceMiles(userLocation, arlingtonCenterLocation);
  }, [userLocation]);

  const businessesWithDistance = useMemo(() => {
    if (!userLocation) return businesses;

    return businesses
      .map((business) => ({
        ...business,
        distanceMiles: calculateDistanceMiles(userLocation, business),
      }))
      .sort((leftBusiness, rightBusiness) => leftBusiness.distanceMiles - rightBusiness.distanceMiles);
  }, [businesses, userLocation]);

  const selectedBusinessWithDistance = useMemo(() => {
    if (!selectedBusiness || !userLocation) return selectedBusiness;

    return {
      ...selectedBusiness,
      distanceMiles: calculateDistanceMiles(userLocation, selectedBusiness),
    };
  }, [selectedBusiness, userLocation]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location is not available in this browser.");
      return;
    }

    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextUserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserLocation(nextUserLocation);
        onUserLocationChange?.(nextUserLocation);
      },
      () => {
        setLocationError("Location permission was denied or unavailable.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleMarkerClick = (business) => {
    setSelectedBusiness(business);

    if (!userLocation) {
      setLocationError("Use My Location first to calculate distance to this business.");
      return;
    }

    setLocationError("");
  };

  return (
    <section className="locationLeaf">
      <div className="locationLeafHeader">
        <div>
          <p className="modalEyebrow">Arlington, Texas</p>
          <h2 className="locationLeafTitle fontdiner-swanky-regular">Location Leaf</h2>
        </div>
        <button className="signUp locationLeafButton" type="button" onClick={handleUseCurrentLocation}>
          Use My Location
        </button>
      </div>

      {locationError && <p className="formStatus">{locationError}</p>}
      {typeof arlingtonDistanceMiles === "number" && (
        <div className="locationLeafDistancePanel">
          <p className="modalEyebrow">Estimated Distance</p>
          {/* <p>
            You are about {formatDistance(arlingtonDistanceMiles)} from the center of Arlington, Texas.
          </p> */}
          {selectedBusinessWithDistance && (
            <p>
              {typeof selectedBusinessWithDistance.distanceMiles === "number"
                ? `${selectedBusinessWithDistance.name} is ${formatDistance(selectedBusinessWithDistance.distanceMiles)} from you.`
                : `Select Use My Location to estimate distance to ${selectedBusinessWithDistance.name}.`}
            </p>
          )}
        </div>
      )}
      {!arlingtonDistanceMiles && selectedBusinessWithDistance && (
        <div className="locationLeafDistancePanel">
          <p className="modalEyebrow">Selected Business</p>
          <p>Select Use My Location to estimate distance to {selectedBusinessWithDistance.name}.</p>
        </div>
      )}

      <div className="locationLeafMapShell">
        <MapContainer
          center={ARLINGTON_CENTER}
          className="locationLeafMap"
          scrollWheelZoom
          zoom={12}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle
            center={ARLINGTON_CENTER}
            pathOptions={{ color: "#0b5bd3", fillColor: "#9bd1ff", fillOpacity: 0.15 }}
            radius={ARLINGTON_RADIUS_METERS}
          />
          {userLocation && (
            <Marker icon={userLocationIcon} position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <strong>Your current location</strong>
                {typeof arlingtonDistanceMiles === "number" && (
                  <p>{formatDistance(arlingtonDistanceMiles)} from Arlington center</p>
                )}
              </Popup>
            </Marker>
          )}
          {businessesWithDistance.map((business) => (
            <Marker
              eventHandlers={{
                click: () => handleMarkerClick(business),
              }}
              icon={getBusinessIcon(business)}
              key={business.id || business.name}
              position={[business.lat, business.lng]}
            >
              <Popup>
                <strong>{business.name}</strong>
                {business.category && <p>{business.category}</p>}
                {business.address && <p>{business.address}</p>}
                {typeof business.distanceMiles === "number" && (
                  <p>{formatDistance(business.distanceMiles)} from you</p>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
{/* 
      <div className="locationLeafBusinessList">
        {businessesWithDistance.length > 0 ? (
          businessesWithDistance.map((business) => (
            <article className="locationLeafBusiness" key={business.id || business.name}>
              {business.iconUrl && <img src={business.iconUrl} alt="" className="locationLeafBusinessIcon" />}
              <div>
                <h3>{business.name}</h3>
                {business.category && <p>{business.category}</p>}
                {typeof business.distanceMiles === "number" && (
                  <p>{formatDistance(business.distanceMiles)} from you</p>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="locationLeafEmpty">
            Add business objects with name, lat, lng, and optional iconUrl fields to show local businesses.
          </p>
        )}
      </div> */}
    </section>
  );
}

export default LocationLeaf;
