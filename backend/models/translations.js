const pool = require('../db');

const getTranslations = async (page, lang) => {
  const query = 'SELECT key, value FROM translations WHERE page = $1 AND lang = $2';
  const values = [page, lang];
  const result = await pool.query(query, values);
  const translations = {};
  result.rows.forEach(row => {
    translations[row.key] = row.value;
  });
  return translations;
};

module.exports = { getTranslations };
