const express = require('express');
const router = express.Router();

const {
  getAllPatients,
  getPatientById,
  createPatient
} = require('../controllers/patientController');

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

module.exports = router;
