const API_BASE_URL = import.meta.env.PUBLIC_API_URL;

const apiRequest = async <T>(endpoint: string, method = 'GET', body?: unknown): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || data?.detail || `Erro ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
};

const api = {
  get: <T>(endpoint: string, _requireAuth = false) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown, _requireAuth = false) =>
    apiRequest<T>(endpoint, 'POST', data),
};

export default api;
