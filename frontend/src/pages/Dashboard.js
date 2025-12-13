// src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalPatients: 0,
    recentPatients: []
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await patientsAPI.getAll({ page: 1, limit: 5 });

      setStats({
        totalPatients: response.data?.total ?? 0,
        recentPatients: response.data?.patients ?? []
      });
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.firstName}</strong> 👋</p>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalPatients}</div>
          <div className="stat-label">Total Patients</div>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="card">
        <h2>Recent Patients</h2>

        {stats.recentPatients.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email || 'N/A'}</td>
                  <td>
                    <Link
                      to={`/patients/${patient.id}`}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            No patients found.{' '}
            <Link to="/patients/new">Add your first patient</Link>
          </p>
        )}

        <div style={{ marginTop: '1rem' }}>
          <Link to="/patients" className="btn btn-primary">
            View All Patients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
