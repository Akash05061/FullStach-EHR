// src/pages/PatientList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patientsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PAGE_SIZE = 10;

const PatientList = () => {
  const { hasRole } = useAuth();

  const [allPatients, setAllPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // -------------------------
  // FETCH PATIENTS
  // -------------------------
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await patientsAPI.getAll();
        setAllPatients(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // -------------------------
  // SEARCH + PAGINATION
  // -------------------------
  useEffect(() => {
    let filtered = allPatients;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = allPatients.filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(term) ||
        p.phone?.includes(term) ||
        p.email?.toLowerCase().includes(term)
      );
    }

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    setPatients(filtered.slice(start, end));
  }, [allPatients, searchTerm, page]);

  const totalPages = Math.ceil(
    (searchTerm
      ? allPatients.filter(p =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        ).length
      : allPatients.length) / PAGE_SIZE
  );

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading) {
    return (
      <div className="center">
        <p>Loading patients...</p>
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
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="form-input"
        />
        {searchTerm && (
          <button className="btn" onClick={clearSearch} style={{ marginTop: '0.5rem' }}>
            Clear
          </button>
        )}
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
                    <Link to={`/patients/${patient.id}`} className="btn btn-primary">
                      View
                    </Link>
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
