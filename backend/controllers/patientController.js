const { patients, getNextPatientId } = require('../data/db');

const getAllPatients = (req, res) => {
  res.json(patients);
};

const getPatientById = (req, res) => {
  const id = Number(req.params.id);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  res.json(patient);
};

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
      createdAt: new Date().toISOString()
    };

    patients.push(patient);

    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create patient' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient
};
