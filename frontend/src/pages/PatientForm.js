// src/pages/PatientForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientsAPI } from '../api/api';

const emptyForm = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'male',
  phone: '',
  email: ''
};

const PatientForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // -------------------------
  // HANDLE CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // -------------------------
  // SUBMIT (CREATE ONLY)
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await patientsAPI.create(formData);
      navigate('/patients');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add New Patient</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="card">
        <h3>Basic Information</h3>

        <div className="form-group">
          <label className="form-label">First Name *</label>
          <input
            className="form-input"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name *</label>
          <input
            className="form-input"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            className="form-input"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Gender *</label>
          <select
            className="form-input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="unknown">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input
            className="form-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Create Patient'}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => navigate('/patients')}
          >
            Cancel
          </button>
        </div>

        <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
          More medical details can be added after database integration.
        </p>
      </form>
    </div>
  );
};

export default PatientForm;
