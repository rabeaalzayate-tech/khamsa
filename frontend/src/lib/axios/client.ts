import axios from 'axios';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.khamsaprogramming.com/api/v1'
    : 'http://localhost:5000/api/v1');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables HTTPOnly cookie transmission
});

/**
 * Normalizes IDs across all API responses:
 * Ensures any entity with `id` also has `_id` mirrored, and vice-versa,
 * safeguarding against MongoDB <-> Prisma/MySQL migration discrepancies.
 */
function normalizeDataIds(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;

  if (
    (typeof FormData !== 'undefined' && data instanceof FormData) ||
    (typeof Blob !== 'undefined' && data instanceof Blob) ||
    (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer)
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      normalizeDataIds(data[i]);
    }
    return data;
  }

  const record = data as Record<string, unknown>;

  if (record.id && !record._id) {
    record._id = record.id;
  } else if (record._id && !record.id) {
    record.id = record._id;
  }

  for (const key of Object.keys(record)) {
    const val = record[key];
    if (val && typeof val === 'object') {
      normalizeDataIds(val);
    }
  }

  return data;
}

apiClient.interceptors.response.use(
  response => {
    if (response?.data) {
      normalizeDataIds(response.data);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Automatic token refresh interceptor on 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
