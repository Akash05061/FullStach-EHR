// src/pages/PatientList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PatientList = () => {
  const { hasRole } = useAuth();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      const res = await patientsAPI.getAll();
      setPatients(res.data);
      setLoading(false);
    };
    loadPatients();
  }, []);

  // 🔍 SEARCH LOGIC
  const filteredPatients = patients.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.firstName.toLowerCase().includes(term) ||
      p.lastName.toLowerCase().includes(term) ||
      p.phone.includes(term) ||
      (p.email && p.email.toLowerCase().includes(term))
    );
  });

  if (loading) {
    return <div className="center">Loading patients...</div>;
  }

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Patients</h1>
        {hasRole(['admin', 'doctor']) && (
          <Link to="/patients/new" className="btn btn-success">
            Add Patient
          </Link>
        )}
      </div>

      {/* 🔍 SEARCH BOX */}
      <input
        type="text"
        placeholder="Search by name, phone, or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: '1rem 0',
          padding: '0.5rem',
          width: '100%'
        }}
      />

      {/* TABLE */}
      {filteredPatients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.firstName} {p.lastName}</td>
                <td>{p.dateOfBirth}</td>
                <td>{p.phone}</td>
                <td>
                  <Link to={`/patients/${p.id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
