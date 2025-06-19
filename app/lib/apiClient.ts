import axios from 'axios';

// Use NEXT_PUBLIC_API_BASE_URL for API calls typically under /api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api'; // Fallback for local dev also points to /api

const apiClient = axios.create({
  baseURL: API_BASE_URL, // This will be https://api.mcp4.ai/api in production
});

// Optional: Add an interceptor to include the auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    // Ensure headers object exists
    config.headers = config.headers || {};
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 