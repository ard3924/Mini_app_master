const express = require('express');
const { getTranslations } = require('../models/translations');

const router = express.Router();

router.get('/:page/:lang', async (req, res) => {
  const { page, lang } = req.params;
  try {
    const translations = await getTranslations(page, lang);
    res.json(translations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
