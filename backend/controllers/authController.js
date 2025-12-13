// controllers/authController.js

const jwt = require('jsonwebtoken');
const { users } = require('../data/db');

// --------------------
// LOGIN (ONLY – simple, stable)
// --------------------
const login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user (plain-text check)
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT (include role for middleware)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'ehr-system-secret-key',
      { expiresIn: '1d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { login };
