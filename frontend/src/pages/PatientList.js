// src/pages/PatientList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PatientList = () => {
  const { hasRole } = useAuth();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await patientsAPI.getAll({
        page,
        limit: 10,
        search: searchTerm
      });

      setPatients(response.data?.patients ?? []);
      setTotalPages(response.data?.totalPages ?? 1);
    } catch (err) {
      console.error('Fetch patients error:', err);
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  if (loading && patients.length === 0) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Patients</h1>
        {hasRole(['admin', 'doctor', 'receptionist']) && (
          <Link to="/patients/new" className="btn btn-success">
            Add New Patient
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="card" style={{ margin: '1rem 0' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
          <button type="button" className="btn" onClick={clearSearch}>
            Clear
          </button>
        </form>
      </div>

      {/* Error */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Table */}
      {patients.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email || 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/patients/${patient.id}`} className="btn btn-primary">
                        View
                      </Link>
                      {hasRole(['admin', 'doctor']) && (
                        <Link to={`/patients/${patient.id}/edit`} className="btn">
                          Edit
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button
                className="btn"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                className="btn"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="card">
          <p>No patients found.</p>
          {hasRole(['admin', 'doctor', 'receptionist']) && (
            <Link to="/patients/new" className="btn btn-success">
              Add Your First Patient
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientList;
