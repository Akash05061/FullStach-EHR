import express from "express";
import {
  getPatients,
  getPatientById,
  createPatient
} from "../controllers/patientController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPatients);
router.get("/:id", authMiddleware, getPatientById);
router.post("/", authMiddleware, createPatient);

export default router;
