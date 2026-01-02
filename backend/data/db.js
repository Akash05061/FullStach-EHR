// backend/data/db.js

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
    medicalRecords: [
      {
        id: 1,
        diagnosis: 'Type 2 Diabetes',
        notes: 'Under control with medication',
        date: '2025-12-10',
        doctor: 'Dr. Sharma'
      }
    ]
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
  },
  {
    id: 6,
    firstName: 'Vikas',
    lastName: 'Patil',
    dateOfBirth: '1988-02-14',
    gender: 'Male',
    phone: '9012345678',
    email: 'vikas.patil@gmail.com',
    medicalRecords: []
  },
  {
    id: 7,
    firstName: 'Neha',
    lastName: 'Singh',
    dateOfBirth: '1996-07-30',
    gender: 'Female',
    phone: '9876501234',
    email: 'neha.singh@gmail.com',
    medicalRecords: []
  },
  {
    id: 8,
    firstName: 'Arjun',
    lastName: 'Mehta',
    dateOfBirth: '1982-01-25',
    gender: 'Male',
    phone: '9765432109',
    email: 'arjun.mehta@gmail.com',
    medicalRecords: []
  },
  {
    id: 9,
    firstName: 'Pooja',
    lastName: 'Nair',
    dateOfBirth: '1993-10-05',
    gender: 'Female',
    phone: '9654321876',
    email: 'pooja.nair@gmail.com',
    medicalRecords: []
  },
  {
    id: 10,
    firstName: 'Kiran',
    lastName: 'Rao',
    dateOfBirth: '1979-06-18',
    gender: 'Male',
    phone: '9345678123',
    email: 'kiran.rao@gmail.com',
    medicalRecords: []
  },
  {
    id: 11,
    firstName: 'Meena',
    lastName: 'Joshi',
    dateOfBirth: '1987-08-09',
    gender: 'Female',
    phone: '9887766554',
    email: 'meena.joshi@gmail.com',
    medicalRecords: []
  },
  {
    id: 12,
    firstName: 'Suresh',
    lastName: 'Naik',
    dateOfBirth: '1975-12-01',
    gender: 'Male',
    phone: '9123987654',
    email: 'suresh.naik@gmail.com',
    medicalRecords: []
  }
];

let patientIdCounter = patients.length + 1;

const getNextPatientId = () => patientIdCounter++;

module.exports = {
  patients,
  getNextPatientId
};
