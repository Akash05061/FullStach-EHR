import axios from 'axios';

/**
 * Single Axios instance for the entire app
 * Token is injected from localStorage
 */
const api = axios.create({
  baseURL: 'http://43.205.208.119:3001/api'
});

// -----------------------------
// Attach JWT automatically
// -----------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ehr_token'); // ✅ correct key
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
  // Get all patients
  getAll: () => api.get('/patients'),

  // Get patient by ID
  getById: (id) => api.get(`/patients/${id}`),

  // Create new patient
  create: (data) => api.post('/patients', data),

  // 🩺 ADD MEDICAL RECORD
  addMedicalRecord: (id, data) =>
    api.post(`/patients/${id}/medical-records`, data)
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
