// controllers/patientController.js

const { patients, nextId } = require('../data/db');

// --------------------
// GET ALL PATIENTS
// --------------------
const getAllPatients = (req, res) => {
  try {
    res.json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
};

// --------------------
// GET PATIENT BY ID
// --------------------
const getPatientById = (req, res) => {
  try {
    const patientId = parseInt(req.params.id);
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ message: 'Failed to fetch patient' });
  }
};

// --------------------
// CREATE PATIENT  ✅ FIXED
// --------------------
const createPatient = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email
    } = req.body;

    // ✅ Match frontend validation
    if (!firstName || !lastName || !dateOfBirth || !gender || !phone) {
      return res.status(400).json({
        message: 'Required fields are missing'
      });
    }

    const newPatient = {
      id: nextId.patients++,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      email: email || '',
      createdAt: new Date().toISOString()
    };

    patients.push(newPatient);

    res.status(201).json({
      message: 'Patient created successfully',
      patient: newPatient
    });
  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({ message: 'Failed to create patient' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient
};
