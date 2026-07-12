function toRadians(value) {
  return (value * Math.PI) / 180;
}

export function calculateDistanceMiles(start, destination) {
  const earthRadiusMiles = 3958.8;
  const latDifference = toRadians(destination.lat - start.lat);
  const lngDifference = toRadians(destination.lng - start.lng);
  const startLat = toRadians(start.lat);
  const destinationLat = toRadians(destination.lat);

  const haversine =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(startLat) *
      Math.cos(destinationLat) *
      Math.sin(lngDifference / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function formatDistance(distanceMiles) {
  if (distanceMiles < 0.1) return "Less than 0.1 miles";

  return `${distanceMiles.toFixed(1)} miles`;
}
