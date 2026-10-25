const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (isLocalHost
    ? 'http://127.0.0.1:8000'
    : 'https://car-inventory-67hk.onrender.com');

function getToken() {
  return localStorage.getItem('access_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorDetail = 'An unexpected error occurred.';
    try {
      const errData = await res.json();
      errorDetail = errData.detail || errorDetail;
    } catch {
      // ignore parse errors
    }
    const err = new Error(errorDetail);
    err.status = res.status;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

// Auth
export const authAPI = {
  register: (email, password) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// Vehicles
export const vehicleAPI = {
  list: () => request('/api/vehicles'),

  search: (params) => {
    const query = new URLSearchParams();
    if (params.make) query.set('make', params.make);
    if (params.model) query.set('model', params.model);
    if (params.category) query.set('category', params.category);
    if (params.min_price !== '' && params.min_price != null)
      query.set('min_price', params.min_price);
    if (params.max_price !== '' && params.max_price != null)
      query.set('max_price', params.max_price);
    return request(`/api/vehicles/search?${query.toString()}`);
  },

  create: (data) =>
    request('/api/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/api/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/api/vehicles/${id}`, { method: 'DELETE' }),

  purchase: (id, quantity) =>
    request(`/api/vehicles/${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    }),

  restock: (id, quantity) =>
    request(`/api/vehicles/${id}/restock`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    }),
};

export const healthAPI = {
  check: () => request('/api/health'),
};
