import LoginPage from "./pages/LoginPage.js";
import Dashboard from "./pages/Dashboard.js";
import PatientSearch from "./pages/PatientSearch.js";
import PatientProfile from "./pages/PatientProfile.js";
import PatientForm from "./pages/PatientForm.js";
import { AuthProvider } from "./context/AuthContext.js";

const { Routes, Route, Navigate } = ReactRouterDOM;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientSearch />} />
        <Route path="/patients/new" element={<PatientForm />} />
        <Route path="/patients/:id" element={<PatientProfile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
