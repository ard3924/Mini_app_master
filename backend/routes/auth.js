const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername } = require('../models/users');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
