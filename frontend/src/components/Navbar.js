// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          EHR System
        </Link>
      </div>

      {user ? (
        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>

          <Link to="/patients" className="nav-link">
            Patients
          </Link>

          <Link to="/patients/new" className="nav-link">
            Add Patient
          </Link>

          <div className="nav-user">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
