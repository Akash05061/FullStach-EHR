// backend/data/db.js

// --------------------
// USERS (FOR LOGIN)
// --------------------
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password', // plain text for now (OK for demo)
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
    firstName: 'Akash',
    lastName: 'Doe',
    dateOfBirth: '1998-06-15',
    gender: 'Male',
    phone: '85645155',
    email: 'akash.doe@gmail.com',
    medicalRecords: [
      {
        id: 1,
        diagnosis: 'Viral Fever',
        notes: 'Prescribed paracetamol and rest',
        date: '2026-01-01',
        doctor: 'Dr. Admin'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Ramesh',
    lastName: 'Kumar',
    dateOfBirth: '1985-03-22',
    gender: 'Male',
    phone: '9876543210',
    email: 'ramesh.kumar@gmail.com',
    medicalRecords: []
  },
  {
    id: 3,
    firstName: 'Sita',
    lastName: 'Sharma',
    dateOfBirth: '1992-09-08',
    gender: 'Female',
    phone: '9988776655',
    email: 'sita.sharma@gmail.com',
    medicalRecords: []
  },
  {
    id: 4,
    firstName: 'Rahul',
    lastName: 'Verma',
    dateOfBirth: '1990-11-12',
    gender: 'Male',
    phone: '9123456780',
    email: 'rahul.verma@gmail.com',
    medicalRecords: []
  },
  {
    id: 5,
    firstName: 'Ananya',
    lastName: 'Iyer',
    dateOfBirth: '1995-04-19',
    gender: 'Female',
    phone: '9090909090',
    email: 'ananya.iyer@gmail.com',
    medicalRecords: []
  }
];

// --------------------
// ID GENERATOR
// --------------------
let patientIdCounter = patients.length + 1;
const getNextPatientId = () => patientIdCounter++;

// --------------------
// EXPORT EVERYTHING
// --------------------
module.exports = {
  users,            // ✅ REQUIRED FOR LOGIN
  patients,
  getNextPatientId
};
