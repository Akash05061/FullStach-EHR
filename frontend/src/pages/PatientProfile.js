// src/pages/PatientProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patientsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PatientProfile = () => {
  const { id } = useParams();
  const { hasRole } = useAuth();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');

  // -------------------------
  // LOAD PATIENT
  // -------------------------
  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await patientsAPI.getById(id);
        setPatient(res.data);
      } catch (err) {
        console.error(err);
        setError('Patient not found');
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="center">
        <p>Loading patient...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container">
        <div className="card">
          <h2>{error || 'Patient Not Found'}</h2>
          <Link to="/patients" className="btn btn-primary">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------
  // SAFE DATA
  // -------------------------
  const {
    firstName,
    lastName,
    phone,
    email,
    gender,
    dateOfBirth,
    medicalRecords = [],
    labReports = [],
    scans = []
  } = patient;

  return (
    <div className="container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1>
          {firstName} {lastName}
          <small style={{ marginLeft: '1rem', color: '#7f8c8d' }}>
            ID: {patient.id}
          </small>
        </h1>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/patients" className="btn">
            Back
          </Link>
          {hasRole(['admin', 'doctor']) && (
            <button className="btn" disabled title="Edit coming soon">
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['overview', 'medical', 'labs', 'scans'].map(tab => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="card">
          <h3>Basic Information</h3>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email || 'N/A'}</p>
        </div>
      )}

      {/* MEDICAL RECORDS */}
      {activeTab === 'medical' && (
        <div className="card">
          <h3>Medical Records</h3>
          {medicalRecords.length === 0 ? (
            <p>No medical records available.</p>
          ) : (
            medicalRecords.map((m) => (
              <div key={m.id} style={{ marginBottom: '1rem' }}>
                <p><strong>Diagnosis:</strong> {m.diagnosis}</p>
                <p><strong>Doctor:</strong> {m.doctor}</p>
                <p><strong>Date:</strong> {m.date}</p>
                <p>{m.notes}</p>
                <hr />
              </div>
            ))
          )}
        </div>
      )}

      {/* LAB REPORTS */}
      {activeTab === 'labs' && (
        <div className="card">
          <h3>Lab Reports</h3>
          {labReports.length === 0 ? (
            <p>No lab reports found.</p>
          ) : (
            labReports.map((l) => (
              <div key={l.id} style={{ marginBottom: '1rem' }}>
                <p><strong>Test:</strong> {l.testName}</p>
                <p><strong>Result:</strong> {l.result}</p>
                <p><strong>Date:</strong> {l.date}</p>
                {l.reportUrl && (
                  <a href={l.reportUrl} target="_blank" rel="noreferrer">
                    View Report
                  </a>
                )}
                <hr />
              </div>
            ))
          )}
        </div>
      )}

      {/* SCANS */}
      {activeTab === 'scans' && (
        <div className="card">
          <h3>Scans / Imaging</h3>
          {scans.length === 0 ? (
            <p>No scans available.</p>
          ) : (
            scans.map((s) => (
              <div key={s.id} style={{ marginBottom: '1rem' }}>
                <p><strong>Type:</strong> {s.scanType}</p>
                <p><strong>Date:</strong> {s.date}</p>
                {s.imageUrl && (
                  <a href={s.imageUrl} target="_blank" rel="noreferrer">
                    View Scan
                  </a>
                )}
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
