import axios from 'axios';

/**
 * Single Axios instance for the entire app
 * Token is injected from localStorage
 */
const api = axios.create({
  baseURL: 'http://15.206.73.100:3001/api'
});

// -----------------------------
// Attach JWT automatically
// -----------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ehr_token'); // ✅ FIXED KEY
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------
   PATIENTS API
------------------------- */
export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data)
};

/* -------------------------
   DASHBOARD API
------------------------- */
export const dashboardAPI = {
  overview: async () => {
    const res = await api.get('/patients');
    return {
      totalPatients: res.data.length
    };
  }
};

export default api;
