import axios from 'axios';

/**
 * Single Axios instance for the entire app
 * JWT token is injected automatically
 */
const api = axios.create({
  baseURL: 'http://3.110.120.237:3001/api' // ✅ SAME IP EVERYWHERE
});

/* -----------------------------
   ATTACH JWT TOKEN
----------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ehr_token');
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
  create: (data) => api.post('/patients', data),

  // 🩺 MEDICAL
  addMedicalRecord: (id, data) =>
    api.post(`/patients/${id}/medical-records`, data),

  // 🧪 LAB
  addLabReport: (id, data) =>
    api.post(`/patients/${id}/lab-reports`, data),

  // 🖼️ SCANS
  addScan: (id, formData) =>
    api.post(`/patients/${id}/scans`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};

/* -------------------------
   DASHBOARD API
------------------------- */
export const dashboardAPI = {
  overview: async () => {
    const res = await api.get('/patients');
    return { totalPatients: res.data.length };
  }
};

export default api;
