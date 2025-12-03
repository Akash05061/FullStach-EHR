import { patients } from "../data/db.js";

export const getPatients = (req, res) => {
  res.json(patients);
};

export const getPatientById = (req, res) => {
  const patient = patients.find((p) => p.id == req.params.id);

  if (!patient)
    return res.status(404).json({ message: "Patient not found" });

  res.json(patient);
};

export const createPatient = (req, res) => {
  const { name, age, gender, condition, phone, address } = req.body;

  const newPatient = {
    id: patients.length + 1,
    name,
    age,
    gender,
    condition,
    phone,
    address
  };

  patients.push(newPatient);

  res.status(201).json(newPatient);
};
