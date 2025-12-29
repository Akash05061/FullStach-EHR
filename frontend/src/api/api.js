import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.206.73.100:3001/api'
});

// ✅ Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------------
   PATIENTS API
------------------------- */
export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data)
};

/* -------------------------
   DASHBOARD API (optional)
------------------------- */
export const dashboardAPI = {
  overview: () => api.get('/patients') // reuse patients for count
};

export default api;
