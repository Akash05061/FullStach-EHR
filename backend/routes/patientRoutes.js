const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const {
  getAllPatients,
  getPatientById,
  createPatient,
  addLabReport,
  addScan
} = require('../controllers/patientController');

/* --------------------
   PATIENT ROUTES
-------------------- */
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

/* --------------------
   LAB REPORT
-------------------- */
router.post('/:id/lab-reports', addLabReport);

/* --------------------
   SCANS (WITH FILE UPLOAD)
-------------------- */
router.post(
  '/:id/scans',
  upload.single('file'), // 🔥 THIS IS THE KEY LINE
  addScan
);

module.exports = router;
