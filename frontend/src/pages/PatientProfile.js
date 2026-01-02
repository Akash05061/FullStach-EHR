// src/pages/PatientProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PatientProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  const [form, setForm] = useState({
    diagnosis: '',
    notes: '',
    date: ''
  });

  const loadPatient = async () => {
    const res = await patientsAPI.getById(id);
    setPatient(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPatient();
  }, [id]);

  const submitMedicalRecord = async (e) => {
    e.preventDefault();

    await patientsAPI.addMedicalRecord(id, {
      ...form,
      doctor: user?.name
    });

    setForm({ diagnosis: '', notes: '', date: '' });
    loadPatient();
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="container">
      <h1>{patient.firstName} {patient.lastName}</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTab('overview')}>Overview</button>
        <button onClick={() => setTab('medical')}>Medical</button>
      </div>

      {tab === 'overview' && (
        <div className="card">
          <p>Gender: {patient.gender}</p>
          <p>DOB: {patient.dateOfBirth}</p>
          <p>Phone: {patient.phone}</p>
        </div>
      )}

      {tab === 'medical' && (
        <div className="card">
          <h3>Add Medical Record</h3>

          <form onSubmit={submitMedicalRecord}>
            <input
              placeholder="Diagnosis"
              value={form.diagnosis}
              onChange={e => setForm({ ...form, diagnosis: e.target.value })}
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
            <button className="btn btn-primary">Add Record</button>
          </form>

          <hr />

          <h3>Medical History</h3>
          {patient.medicalRecords.length === 0 ? (
            <p>No records yet</p>
          ) : (
            patient.medicalRecords.map(r => (
              <div key={r.id}>
                <p><strong>{r.diagnosis}</strong> ({r.date})</p>
                <p>{r.notes}</p>
                <p>Doctor: {r.doctor}</p>
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
