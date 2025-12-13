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
// CREATE PATIENT
// --------------------
const createPatient = (req, res) => {
  try {
    const { name, age, gender, condition, phone, address } = req.body;

    if (!name || !age || !gender || !phone) {
      return res.status(400).json({
        message: 'Required fields: name, age, gender, phone'
      });
    }

    const newPatient = {
      id: nextId.patients++,
      name,
      age,
      gender,
      condition: condition || '',
      phone,
      address: address || '',
      createdAt: new Date().toISOString(),
      createdBy: req.user.id
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
