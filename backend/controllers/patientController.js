// backend/controllers/patientController.js
const { patients, getNextPatientId } = require('../data/db');

// GET all patients
const getAllPatients = (req, res) => {
  res.json(patients);
};

// GET patient by ID
const getPatientById = (req, res) => {
  const id = Number(req.params.id);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  res.json(patient);
};

// CREATE patient
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
    medicalRecords: []   // 🔴 IMPORTANT
  };

  patients.push(patient);
  res.status(201).json(patient);
};

// ADD medical record
const addMedicalRecord = (req, res) => {
  const patientId = Number(req.params.id);
  const { diagnosis, notes, date, doctor } = req.body;

  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  if (!diagnosis || !date) {
    return res.status(400).json({ message: 'Diagnosis and date are required' });
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

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  addMedicalRecord
};
