const express = require('express');
const jwt = require('jsonwebtoken');
const { getPricelist, updatePricelistItem } = require('../models/pricelist');
require('dotenv').config();

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const pricelist = await getPricelist();
    res.json(pricelist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedItem = await updatePricelistItem(id, data);
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
