import LoginPage from "./pages/LoginPage.js";
import Dashboard from "./pages/Dashboard.js";
import PatientSearch from "./pages/PatientSearch.js";
import PatientProfile from "./pages/PatientProfile.js";
import PatientForm from "./pages/PatientForm.js";

import Navbar from "./components/Navbar.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

import { AuthProvider } from "./context/AuthContext.js";

const { Routes, Route, Navigate } = ReactRouterDOM;

export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <PatientSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/new"
          element={
            <ProtectedRoute>
              <PatientForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
