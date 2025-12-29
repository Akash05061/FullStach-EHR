const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/authMiddleware');

const {
  getAllPatients,
  getPatientById,
  createPatient
} = require('../controllers/patientController');

// Protected routes
router.get('/', authenticateToken, getAllPatients);
router.get('/:id', authenticateToken, getPatientById);
router.post('/', authenticateToken, createPatient);

module.exports = router;
