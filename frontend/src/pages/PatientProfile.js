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
     FORM STATES
  -------------------- */
  const [medicalForm, setMedicalForm] = useState({
    diagnosis: '',
    date: '',
    notes: ''
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

  const [scanFile, setScanFile] = useState(null);

  /* --------------------
     LOAD PATIENT
  -------------------- */
  const loadPatient = async () => {
    setLoading(true);
    const res = await patientsAPI.getById(id);

    setPatient({
      ...res.data,
      medicalRecords: res.data.medicalRecords || [],
      labReports: res.data.labReports || [],
      scans: res.data.scans || []
    });

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

    setMedicalForm({ diagnosis: '', date: '', notes: '' });
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
     SCAN UPLOAD
  -------------------- */
  const submitScan = async (e) => {
    e.preventDefault();

    if (!scanFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', scanForm.name);
    formData.append('scanType', scanForm.scanType);
    formData.append('date', scanForm.date);
    formData.append('notes', scanForm.notes);
    formData.append('scan', scanFile);

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
          <p><b>Gender:</b> {patient.gender}</p>
          <p><b>DOB:</b> {patient.dateOfBirth}</p>
          <p><b>Phone:</b> {patient.phone}</p>
        </div>
      )}

      {/* MEDICAL */}
      {tab === 'medical' && (
        <div className="card">
          <h3>Add Medical Record</h3>

          <form onSubmit={submitMedicalRecord} style={{ display: 'grid', gap: '0.5rem' }}>
            <input
              placeholder="Diagnosis"
              value={medicalForm.diagnosis}
              onChange={e => setMedicalForm({ ...medicalForm, diagnosis: e.target.value })}
              required
            />

            {/* ✅ FIXED DATE INPUT */}
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

          {patient.medicalRecords.map(r => (
            <div key={r.id}>
              <p><b>{r.diagnosis}</b> ({r.date})</p>
              <p>{r.notes}</p>
              <p>Doctor: {r.doctor}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* LAB REPORTS */}
      {tab === 'labs' && (
        <div className="card">
          <h3>Add Lab Report</h3>

          <form onSubmit={submitLabReport} style={{ display: 'grid', gap: '0.5rem' }}>
            <input placeholder="Test Name" value={labForm.name}
              onChange={e => setLabForm({ ...labForm, name: e.target.value })} required />

            <input placeholder="Result" value={labForm.result}
              onChange={e => setLabForm({ ...labForm, result: e.target.value })} required />

            <input type="date" value={labForm.date}
              onChange={e => setLabForm({ ...labForm, date: e.target.value })} required />

            <textarea placeholder="Remarks" value={labForm.remarks}
              onChange={e => setLabForm({ ...labForm, remarks: e.target.value })} />

            <button className="btn btn-primary">Add Lab Report</button>
          </form>

          <hr />

          {patient.labReports.map(r => (
            <div key={r.id}>
              <p><b>{r.name}</b> ({r.date})</p>
              <p>Result: {r.result}</p>
              <p>{r.remarks}</p>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* SCANS */}
      {tab === 'scans' && (
        <div className="card">
          <h3>Add Scan</h3>

          <form onSubmit={submitScan} style={{ display: 'grid', gap: '0.5rem' }}>
            <input placeholder="Scan Name" value={scanForm.name}
              onChange={e => setScanForm({ ...scanForm, name: e.target.value })} required />

            <input placeholder="Scan Type" value={scanForm.scanType}
              onChange={e => setScanForm({ ...scanForm, scanType: e.target.value })} required />

            <input type="date" value={scanForm.date}
              onChange={e => setScanForm({ ...scanForm, date: e.target.value })} required />

            <input type="file" accept="image/*"
              onChange={e => setScanFile(e.target.files[0])} required />

            <textarea placeholder="Notes" value={scanForm.notes}
              onChange={e => setScanForm({ ...scanForm, notes: e.target.value })} />

            <button className="btn btn-primary">Add Scan</button>
          </form>

          <hr />

          {patient.scans.map(s => (
            <div key={s.id}>
              <p><b>{s.name}</b> ({s.date})</p>
              <p>Type: {s.scanType}</p>
              {s.imageUrl && (
                <img
                  src={`http://3.110.120.237:3001${s.imageUrl}`}
                  alt={s.name}
                  style={{ maxWidth: '300px' }}
                />
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
