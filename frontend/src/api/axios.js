// Axios instance configured for backend API
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach Authorization header automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
