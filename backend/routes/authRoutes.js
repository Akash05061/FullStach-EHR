// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// --------------------
// AUTH ROUTES
// --------------------

// Login only (simple, dummy auth)
router.post('/login', login);

module.exports = router;
