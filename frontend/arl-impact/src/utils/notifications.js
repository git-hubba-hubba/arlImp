const STORAGE_KEY = "arlImpactNotifications";

export function getStoredNotifications() {
  const rawNotifications = localStorage.getItem(STORAGE_KEY);
  return rawNotifications ? JSON.parse(rawNotifications) : [];
}

export function setStoredNotifications(notifications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function createNotification(type, message) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    message,
    createdAt: new Date().toISOString(),
  };
}
