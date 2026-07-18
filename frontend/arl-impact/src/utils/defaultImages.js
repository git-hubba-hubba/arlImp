export const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80";

export function getEventImageSrc(event) {
  const image = event.eventImage || event.eventImg || DEFAULT_EVENT_IMAGE;

  if (String(image).startsWith("data:")) return image;
  if (!event.eventImage || !event.updatedAt) return image;

  const separator = image.includes("?") ? "&" : "?";
  return `${image}${separator}v=${encodeURIComponent(event.updatedAt)}`;
}
