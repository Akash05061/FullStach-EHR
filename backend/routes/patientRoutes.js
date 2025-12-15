const express = require('express');
const router = express.Router();
const { patients, getNextPatientId } = require('../data/db');

// GET all patients
router.get('/', (req, res) => {
  res.json({
    patients,
    total: patients.length
  });
});

// CREATE patient
router.post('/', (req, res) => {
  const patient = {
    id: getNextPatientId(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  patients.push(patient);

  res.status(201).json({
    message: 'Patient created successfully',
    patient
  });
});

module.exports = router;
