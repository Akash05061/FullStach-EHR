// data/db.js

// --------------------
// Users (Dummy Auth)
// --------------------
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password', // ✅ plain text (as required)
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date().toISOString()
  }
];

// --------------------
// Patients (Dummy Data)
// --------------------
const patients = [
  {
    id: 1,
    name: 'John Doe',
    age: 32,
    gender: 'Male',
    condition: 'Diabetes Type 2',
    phone: '9876543210',
    address: 'Bangalore'
  },
  {
    id: 2,
    name: 'Asha Rani',
    age: 27,
    gender: 'Female',
    condition: 'Hypertension',
    phone: '9988776655',
    address: 'Mysore'
  }
];

// --------------------
// Future placeholders
// --------------------
const appointments = [];
const prescriptions = [];
const labResults = [];
const medicalFiles = [];

// --------------------
// ID generator
// --------------------
const nextId = {
  users: users.length + 1,
  patients: patients.length + 1,
  appointments: 1,
  prescriptions: 1,
  labResults: 1,
  medicalFiles: 1
};

module.exports = {
  users,
  patients,
  appointments,
  prescriptions,
  labResults,
  medicalFiles,
  nextId
};
