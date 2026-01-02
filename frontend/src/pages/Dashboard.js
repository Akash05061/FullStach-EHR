// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res = await patientsAPI.getAll();
        setPatients(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="center">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.name}</strong> 👋</p>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Stats */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2>{patients.length}</h2>
        <p>Total Patients</p>
      </div>

      {/* Recent Patients */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>Recent Patients</h3>

        {patients.length === 0 ? (
          <p>
            No patients found.{' '}
            <Link to="/patients/new">Add your first patient</Link>
          </p>
        ) : (
          <>
            <ul>
              {patients.slice(-5).reverse().map((p) => (
                <li key={p.id}>
                  {p.firstName} {p.lastName}
                </li>
              ))}
            </ul>

            <Link to="/patients" className="btn btn-primary">
              View All Patients
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
