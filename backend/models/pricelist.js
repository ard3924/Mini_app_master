const pool = require('../db');

const getPricelist = async () => {
  const query = 'SELECT * FROM pricelist ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

const updatePricelistItem = async (id, data) => {
  const query = 'UPDATE pricelist SET product_service = $1, in_price = $2, price = $3, quantity = $4, total = $5 WHERE id = $6 RETURNING *';
  const values = [data.product_service, data.in_price, data.price, data.quantity, data.total, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getPricelist, updatePricelistItem };
