// --------------------
// USERS (FOR LOGIN)
// --------------------
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password', // plain text (OK for demo)
    role: 'admin',
    name: 'Admin User'
  }
];

// --------------------
// PATIENTS (IN-MEMORY)
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
    ],

    labReports: [
      {
        id: 1,
        testName: 'Blood Sugar (Fasting)',
        result: '98 mg/dL',
        date: '2026-01-05',
        remarks: 'Normal range'
      },
      {
        id: 2,
        testName: 'Complete Blood Count',
        result: 'All values normal',
        date: '2026-01-06',
        remarks: 'No infection detected'
      }
    ],

    scans: [
      {
        id: 1,
        name: 'Chest X-Ray',
        type: 'X-Ray',
        date: '2026-01-06',
        notes: 'Mild lung infection',
        imageUrl: '/scans/chest-xray.png'
      },
      {
        id: 2,
        name: 'Brain MRI',
        type: 'MRI',
        date: '2026-01-04',
        notes: 'No abnormalities found',
        imageUrl: '/scans/brain-mri.png'
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
    medicalRecords: [],
    labReports: [],
    scans: []
  },

  {
    id: 3,
    firstName: 'Sita',
    lastName: 'Sharma',
    dateOfBirth: '1992-09-08',
    gender: 'Female',
    phone: '9988776655',
    email: 'sita.sharma@gmail.com',
    medicalRecords: [],
    labReports: [],
    scans: []
  },

  {
    id: 4,
    firstName: 'Rahul',
    lastName: 'Verma',
    dateOfBirth: '1990-11-12',
    gender: 'Male',
    phone: '9123456780',
    email: 'rahul.verma@gmail.com',
    medicalRecords: [],
    labReports: [],
    scans: []
  },

  {
    id: 5,
    firstName: 'Ananya',
    lastName: 'Iyer',
    dateOfBirth: '1995-04-19',
    gender: 'Female',
    phone: '9090909090',
    email: 'ananya.iyer@gmail.com',
    medicalRecords: [],
    labReports: [],
    scans: []
  }
];

// --------------------
// ID GENERATORS
// --------------------
let patientIdCounter = patients.length + 1;
const getNextPatientId = () => patientIdCounter++;

const getNextMedicalId = () => Date.now();
const getNextLabId = () => Date.now();
const getNextScanId = () => Date.now();

// --------------------
// EXPORTS
// --------------------
module.exports = {
  users,
  patients,
  getNextPatientId,
  getNextMedicalId,
  getNextLabId,
  getNextScanId
};
