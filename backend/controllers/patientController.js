const { patients, getNextPatientId } = require('../data/db');

// --------------------
// GET ALL PATIENTS
// --------------------
const getAllPatients = (req, res) => {
  res.json(patients);
};

// --------------------
// GET PATIENT BY ID
// --------------------
const getPatientById = (req, res) => {
  const id = Number(req.params.id);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  res.json(patient);
};

// --------------------
// CREATE PATIENT
// --------------------
const createPatient = (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, phone, email } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !gender || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const patient = {
    id: getNextPatientId(),
    firstName,
    lastName,
    dateOfBirth,
    gender,
    phone,
    email: email || '',
    medicalRecords: [],
    labReports: [],
    scans: []
  };

  patients.push(patient);
  res.status(201).json(patient);
};

// --------------------
// ADD MEDICAL RECORD
// --------------------
const addMedicalRecord = (req, res) => {
  const patient = patients.find(p => p.id === Number(req.params.id));

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  const { diagnosis, notes, date, doctor } = req.body;

  if (!diagnosis || !date) {
    return res.status(400).json({ message: 'Diagnosis and date required' });
  }

  const record = {
    id: patient.medicalRecords.length + 1,
    diagnosis,
    notes: notes || '',
    date,
    doctor: doctor || 'Unknown'
  };

  patient.medicalRecords.push(record);
  res.status(201).json(record);
};

// --------------------
// ADD LAB REPORT
// --------------------
const addLabReport = (req, res) => {
  const patient = patients.find(p => p.id === Number(req.params.id));

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  const { name, result, date, remarks } = req.body;

  const report = {
    id: patient.labReports.length + 1,
    name,
    result,
    date,
    remarks: remarks || ''
  };

  patient.labReports.push(report);
  res.status(201).json(report);
};

// --------------------
// ADD SCAN (FILE UPLOAD)
// --------------------
const addScan = (req, res) => {
  const patient = patients.find(p => p.id === Number(req.params.id));

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Scan image required' });
  }

  const { name, scanType, date, notes } = req.body;

  const scan = {
    id: patient.scans.length + 1,
    name,
    scanType,
    date,
    notes: notes || '',
    imageUrl: `/scans/${req.file.filename}`
  };

  patient.scans.push(scan);
  res.status(201).json(scan);
};

// --------------------
// EXPORTS
// --------------------
module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  addMedicalRecord,
  addLabReport,
  addScan
};
