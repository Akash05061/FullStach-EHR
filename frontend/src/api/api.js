import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://13.201.62.170:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// -------- AUTH ----------
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

// -------- PATIENTS ----------
export const patientsAPI = {
  getAll: () => api.get('/patients'),
};

export default api;
