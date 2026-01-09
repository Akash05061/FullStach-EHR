const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const {
  getAllPatients,
  getPatientById,
  createPatient,
  addMedicalRecord,
  addLabReport,
  addScan
} = require('../controllers/patientController');

// --------------------
// PATIENT ROUTES
// --------------------
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

// --------------------
// MEDICAL RECORDS
// --------------------
router.post('/:id/medical-records', addMedicalRecord);

// --------------------
// LAB REPORTS
// --------------------
router.post('/:id/lab-reports', addLabReport);

// --------------------
// SCANS (FILE UPLOAD)
// --------------------
router.post('/:id/scans', upload.single('file'), addScan);

module.exports = router;
