// controllers/authController.js
const { users } = require('../data/db');

const login = (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  // find user
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({
      error: 'Invalid credentials'
    });
  }

  // success
  res.json({
    message: 'Login successful',
    token: 'dummy-token', // temp token
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
};

module.exports = { login };
