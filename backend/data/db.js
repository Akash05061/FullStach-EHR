const patients = [
  {
    id: 1,
    firstName: 'Ramesh',
    lastName: 'Kumar',
    dateOfBirth: '1990-05-12',
    gender: 'Male',
    phone: '9876543210',
    email: 'ramesh@gmail.com',

    medicalRecords: [
      {
        id: 1,
        diagnosis: 'Diabetes',
        notes: 'Under control',
        doctor: 'Dr. Sharma',
        date: '2024-12-01'
      }
    ],

    labReports: [
      {
        id: 1,
        testName: 'Blood Sugar',
        result: '140 mg/dL',
        date: '2024-12-02',
        reportUrl: '/dummy/labs/blood-sugar.pdf'
      }
    ],

    scans: [
      {
        id: 1,
        scanType: 'Chest X-Ray',
        date: '2024-12-05',
        imageUrl: '/dummy/scans/chest-xray.jpg'
      }
    ]
  }
];
