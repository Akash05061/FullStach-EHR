// src/api/api.js

import axios from 'axios';

// Backend is accessed via Nginx (/api)
// EC2 IP or domain should be set at build time using .env
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// --------------------
// Request Interceptor
// --------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --------------------
// Auth API
// --------------------
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials)
};

// --------------------
// Patients API
// --------------------
export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patientData) => api.post('/patients', patientData)
};

export default api;
