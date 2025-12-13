// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------
app.use(cors({
  origin: '*',               // frontend will be served by nginx
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger (debug)
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// --------------------
// Routes
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'EHR Backend running',
    time: new Date().toISOString()
  });
});

// --------------------
// 404 handler
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
