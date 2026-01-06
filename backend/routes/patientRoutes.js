const express = require('express');
const router = express.Router();

const {
  getAllPatients,
  getPatientById,
  createPatient,
  addLabReport,
  addScan
} = require('../controllers/patientController');

// Patients
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

// Lab Reports & Scans
router.post('/:id/lab-reports', addLabReport);
router.post('/:id/scans', addScan);

module.exports = router;
