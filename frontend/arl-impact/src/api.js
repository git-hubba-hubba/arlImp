const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export function getStoredAuth() {
  const rawAuth = localStorage.getItem("arlImpactAuth");
  return rawAuth ? JSON.parse(rawAuth) : null;
}

export function setStoredAuth(auth) {
  localStorage.setItem("arlImpactAuth", JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem("arlImpactAuth");
}

export async function apiRequest(path, options = {}) {
  const auth = getStoredAuth();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}
