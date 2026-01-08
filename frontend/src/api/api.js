import axios from 'axios';

/**
 * Single Axios instance for the entire app
 * JWT token is injected automatically
 */
const api = axios.create({
  baseURL: 'http://13.127.142.221:3001/api'
});

/* -----------------------------
   ATTACH JWT TOKEN
----------------------------- */
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

  // 🩺 Add medical record
  addMedicalRecord: (id, data) =>
    api.post(`/patients/${id}/medical-records`, data),

  // 🧪 Add lab report (dummy / JSON)
  addLabReport: (id, data) =>
    api.post(`/patients/${id}/lab-reports`, data),

  // 🖼️ Upload scan image (multipart)
  addScan: (id, formData) =>
    api.post(`/patients/${id}/scans`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
