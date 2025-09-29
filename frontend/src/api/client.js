const API_BASE = import.meta.env.VITE_API_URL || '';

function buildUrl(path) {
  if (API_BASE) return `${API_BASE}${path}`;
  return path; // rely on dev proxy when API_BASE is empty
}

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(buildUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }
  return data;
}

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

export function clearStoredAuth() {
  localStorage.removeItem('auth');
}


