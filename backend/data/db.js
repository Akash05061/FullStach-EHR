// data/db.js

const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password', // plain text (temporary)
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date().toISOString()
  }
];

const patients = [];

const appointments = [];
const prescriptions = [];
const labResults = [];
const medicalFiles = [];

const nextId = {
  users: users.length + 1,
  patients: 1,
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
