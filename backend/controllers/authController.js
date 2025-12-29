// controllers/authController.js
const jwt = require('jsonwebtoken');
const { users } = require('../data/db');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      error: 'Invalid credentials'
    });
  }

  // 🔐 REAL JWT (IMPORTANT)
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
};

module.exports = { login };
