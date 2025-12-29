const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {
  getAllPatients,
  getPatientById,
  createPatient
} = require('../controllers/patientController');

router.get('/', auth, getAllPatients);
router.get('/:id', auth, getPatientById);
router.post('/', auth, createPatient);

module.exports = router;
