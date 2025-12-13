// src/pages/PatientForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientsAPI } from '../api/api';

const emptyForm = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'male',
  phone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: ''
  },
  bloodType: '',
  insuranceInfo: {
    provider: '',
    policyNumber: '',
    groupNumber: ''
  },
  medicalHistory: []
};

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadPatient();
    }
  }, [isEditMode, id]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const res = await patientsAPI.getById(id);

      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        address = {},
        emergencyContact = {},
        bloodType = '',
        insuranceInfo = {},
        medicalHistory = []
      } = res.data;

      setFormData({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        phone,
        email,
        address: { ...emptyForm.address, ...address },
        emergencyContact: { ...emptyForm.emergencyContact, ...emergencyContact },
        bloodType,
        insuranceInfo: { ...emptyForm.insuranceInfo, ...insuranceInfo },
        medicalHistory
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load patient data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await patientsAPI.update(id, formData);
      } else {
        await patientsAPI.create(formData);
      }
      navigate('/patients');
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="card">
        <h3>Basic Information</h3>

        <div className="form-group">
          <label className="form-label">First Name *</label>
          <input className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name *</label>
          <input className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input type="date" className="form-input" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Gender *</label>
          <select className="form-input" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="unknown">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <h3>Address</h3>

        <input className="form-input" placeholder="Street" name="address.street" value={formData.address.street} onChange={handleChange} />
        <input className="form-input" placeholder="City" name="address.city" value={formData.address.city} onChange={handleChange} />
        <input className="form-input" placeholder="State" name="address.state" value={formData.address.state} onChange={handleChange} />

        <h3>Emergency Contact</h3>

        <input className="form-input" placeholder="Name" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} />
        <input className="form-input" placeholder="Relationship" name="emergencyContact.relationship" value={formData.emergencyContact.relationship} onChange={handleChange} />
        <input className="form-input" placeholder="Phone" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange} />

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Patient' : 'Create Patient'}
          </button>
          <button type="button" className="btn" onClick={() => navigate('/patients')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
