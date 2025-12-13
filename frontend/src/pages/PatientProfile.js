// src/pages/PatientProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PatientProfile = () => {
  const { id } = useParams();
  const { hasRole } = useAuth();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const res = await patientsAPI.getById(id);
      setPatient(res.data);
    } catch (err) {
      console.error('Failed to load patient:', err);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container">
        <div className="card">
          <h2>Patient Not Found</h2>
          <Link to="/patients" className="btn btn-primary">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    gender,
    dateOfBirth,
    address = {},
    emergencyContact = {},
    bloodType,
    appointments = [],
    prescriptions = [],
    labResults = [],
    files = []
  } = patient;

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>
          {firstName} {lastName}
          <small style={{ marginLeft: '1rem', color: '#7f8c8d' }}>ID: {patient.id}</small>
        </h1>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/patients" className="btn">
            Back
          </Link>
          {hasRole(['admin', 'doctor']) && (
            <Link to={`/patients/${id}/edit`} className="btn btn-primary">
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['overview', 'appointments', 'prescriptions', 'labs'].map(tab => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="card">
          <h3>Basic Information</h3>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email || 'N/A'}</p>

          <h3 style={{ marginTop: '1rem' }}>Address</h3>
          <p>
            {address.street || ''} {address.city || ''} {address.state || ''}
          </p>

          <h3 style={{ marginTop: '1rem' }}>Emergency Contact</h3>
          <p><strong>Name:</strong> {emergencyContact.name || 'N/A'}</p>
          <p><strong>Relationship:</strong> {emergencyContact.relationship || 'N/A'}</p>
          <p><strong>Phone:</strong> {emergencyContact.phone || 'N/A'}</p>

          <h3 style={{ marginTop: '1rem' }}>Medical</h3>
          <p><strong>Blood Type:</strong> {bloodType || 'N/A'}</p>
        </div>
      )}

      {/* Appointments */}
      {activeTab === 'appointments' && (
        <div className="card">
          <h3>Appointments</h3>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((a, i) => (
              <p key={i}>{a.date} – {a.reason}</p>
            ))
          )}
        </div>
      )}

      {/* Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="card">
          <h3>Prescriptions</h3>
          {prescriptions.length === 0 ? (
            <p>No prescriptions found.</p>
          ) : (
            prescriptions.map((p, i) => (
              <p key={i}>{p.medication} – {p.dosage}</p>
            ))
          )}
        </div>
      )}

      {/* Lab Results */}
      {activeTab === 'labs' && (
        <div className="card">
          <h3>Lab Results</h3>
          {labResults.length === 0 ? (
            <p>No lab results found.</p>
          ) : (
            labResults.map((l, i) => (
              <p key={i}>{l.testName} – {l.result}</p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
