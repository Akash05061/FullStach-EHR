import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { patientsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PatientProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  /* --------------------
     FORMS STATE
  -------------------- */
  const [medicalForm, setMedicalForm] = useState({
    diagnosis: '',
    notes: '',
    date: ''
  });

  const [labForm, setLabForm] = useState({
    name: '',
    result: '',
    date: '',
    remarks: ''
  });

  const [scanForm, setScanForm] = useState({
    name: '',
    scanType: '',
    date: '',
    notes: ''
  });

  const [scanFile, setScanFile] = useState(null); // 🔥 REQUIRED

  /* --------------------
     LOAD PATIENT
  -------------------- */
  const loadPatient = async () => {
    const res = await patientsAPI.getById(id);
    setPatient(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPatient();
  }, [id]);

  /* --------------------
     MEDICAL RECORD
  -------------------- */
  const submitMedicalRecord = async (e) => {
    e.preventDefault();

    await patientsAPI.addMedicalRecord(id, {
      ...medicalForm,
      doctor: user?.name
    });

    setMedicalForm({ diagnosis: '', notes: '', date: '' });
    loadPatient();
  };

  /* --------------------
     LAB REPORT
  -------------------- */
  const submitLabReport = async (e) => {
    e.preventDefault();

    await patientsAPI.addLabReport(id, labForm);

    setLabForm({ name: '', result: '', date: '', remarks: '' });
    loadPatient();
  };

  /* --------------------
     SCAN UPLOAD (FILE)
  -------------------- */
  const submitScan = async (e) => {
    e.preventDefault();

    if (!scanFile) {
      alert('Please select a scan image');
      return;
    }

    const formData = new FormData();
    formData.append('name', scanForm.name);
    formData.append('scanType', scanForm.scanType);
    formData.append('date', scanForm.date);
    formData.append('notes', scanForm.notes);
    formData.append('scan', scanFile); // 🔥 MUST MATCH multer

    await patientsAPI.addScan(id, formData);

    setScanForm({ name: '', scanType: '', date: '', notes: '' });
    setScanFile(null);
    loadPatient();
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="container">
      <h1>{patient.firstName} {patient.lastName}</h1>

      {/* TABS */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setTab('overview')}>Overview</button>
        <button onClick={() => setTab('medical')}>Medical</button>
        <button onClick={() => setTab('labs')}>Lab Reports</button>
        <button onClick={() => setTab('scans')}>Scans</button>
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div className="card">
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>DOB:</strong> {patient.dateOfBirth}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
        </div>
      )}

      {/* MEDICAL */}
      {tab === 'medical' && (
        <div className="card">
          <h3>Add Medical Record</h3>

          <form onSubmit={submitMedicalRecord}>
            <input
              placeholder="Diagnosis"
              value={medicalForm.diagnosis}
              onChange={e => setMedicalForm({ ...medicalForm, diagnosis: e.target.value })}
              required
            />
            <input
              type="date"
              value={medicalForm.date}
              onChange={e => setMedicalForm({ ...medicalForm, date: e.target.value })}
              required
            />
            <textarea
              placeholder="Notes"
              value={medicalForm.notes}
              onChange={e => setMedicalForm({ ...medicalForm, notes: e.target.value })}
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

      {/* LAB REPORTS */}
      {tab === 'labs' && (
        <div className="card">
          <h3>Add Lab Report</h3>

          <form onSubmit={submitLabReport}>
            <input
              placeholder="Test Name"
              value={labForm.name}
              onChange={e => setLabForm({ ...labForm, name: e.target.value })}
              required
            />
            <input
              placeholder="Result"
              value={labForm.result}
              onChange={e => setLabForm({ ...labForm, result: e.target.value })}
              required
            />
            <input
              type="date"
              value={labForm.date}
              onChange={e => setLabForm({ ...labForm, date: e.target.value })}
              required
            />
            <textarea
              placeholder="Remarks"
              value={labForm.remarks}
              onChange={e => setLabForm({ ...labForm, remarks: e.target.value })}
            />
            <button className="btn btn-primary">Add Lab Report</button>
          </form>

          <hr />

          <h3>Lab Reports</h3>
          {patient.labReports.length === 0 ? (
            <p>No lab reports yet</p>
          ) : (
            patient.labReports.map(r => (
              <div key={r.id}>
                <p><strong>{r.name}</strong> ({r.date})</p>
                <p>Result: {r.result}</p>
                <p>{r.remarks}</p>
                <hr />
              </div>
            ))
          )}
        </div>
      )}

      {/* SCANS */}
      {tab === 'scans' && (
        <div className="card">
          <h3>Add Scan</h3>

          <form onSubmit={submitScan} encType="multipart/form-data">
            <input
              placeholder="Scan Name (e.g., Chest X-Ray)"
              value={scanForm.name}
              onChange={e => setScanForm({ ...scanForm, name: e.target.value })}
              required
            />
            <input
              placeholder="Scan Type (X-Ray / MRI / CT)"
              value={scanForm.scanType}
              onChange={e => setScanForm({ ...scanForm, scanType: e.target.value })}
              required
            />
            <input
              type="date"
              value={scanForm.date}
              onChange={e => setScanForm({ ...scanForm, date: e.target.value })}
              required
            />

            {/* 🔥 FILE PICKER */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScanFile(e.target.files[0])}
              required
            />

            <textarea
              placeholder="Notes"
              value={scanForm.notes}
              onChange={e => setScanForm({ ...scanForm, notes: e.target.value })}
            />

            <button className="btn btn-primary">Add Scan</button>
          </form>

          <hr />

          <h3>Scans</h3>
          {patient.scans.length === 0 ? (
            <p>No scans yet</p>
          ) : (
            patient.scans.map(s => (
              <div key={s.id}>
                <p><strong>{s.name}</strong> ({s.date})</p>
                <p>Type: {s.scanType}</p>
                <p>{s.notes}</p>

                {/* 🔥 SHOW IMAGE */}
                {s.imageUrl && (
                  <img
                    src={`http://13.127.142.221:3001${s.imageUrl}`}
                    alt={s.name}
                    style={{ maxWidth: '300px', marginTop: '0.5rem' }}
                  />
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
