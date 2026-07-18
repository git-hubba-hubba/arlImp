export function isVideoMedia(src = "") {
  return String(src).startsWith("data:video/");
}

export function getMediaLabel(value) {
  if (!value) return "No file selected";
  if (String(value).startsWith("data:")) return "Device file selected";

  return "Existing media attached";
}
