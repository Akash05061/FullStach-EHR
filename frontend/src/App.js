// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';
import PatientProfile from './pages/PatientProfile';

import './index.css';

/**
 * Wrapper to access auth state inside Router
 */
const AppRoutes = () => {
  const { user, loading } = useAuth();

  // 🔄 Wait until auth state is restored
  if (loading) {
    return <div className="center">Loading...</div>;
  }

  return (
    <>
      {/* Show Navbar only when logged in */}
      {user && <Navbar />}

      <div className="container">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Default */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />

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
                <PatientList />
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
