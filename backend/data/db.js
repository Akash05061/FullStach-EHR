// backend/data/db.js

// --------------------
// USERS
// --------------------
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    name: 'Admin User'
  }
];

// --------------------
// PATIENTS
// --------------------
const patients = [
  {
    id: 1,
    firstName: 'Ramesh',
    lastName: 'Kumar',
    dateOfBirth: '1990-05-12',
    gender: 'Male',
    phone: '9876543210',
    email: 'ramesh@gmail.com'
  },
  {
    id: 2,
    firstName: 'Sita',
    lastName: 'Sharma',
    dateOfBirth: '1988-09-22',
    gender: 'Female',
    phone: '9988776655',
    email: 'sita@gmail.com'
  }
];

let patientIdCounter = patients.length + 1;

const getNextPatientId = () => patientIdCounter++;

module.exports = {
  users,
  patients,
  getNextPatientId
};
