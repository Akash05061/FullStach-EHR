const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'EHR Backend running',
    time: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
