const pool = require('../db');

const getPricelist = async () => {
  const query = 'SELECT * FROM pricelist ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

const updatePricelistItem = async (id, data) => {
  if (!data) {
    throw new Error('No data provided for update');
  }
  // Fetch current item
  const getQuery = 'SELECT * FROM pricelist WHERE id = $1';
  const getResult = await pool.query(getQuery, [id]);
  if (getResult.rows.length === 0) {
    throw new Error('Item not found');
  }
  const current = getResult.rows[0];
  // Merge data
  const updated = { ...current, ...data };
  // Validate and parse
  const price = parseFloat(updated.price);
  const quantity = parseInt(updated.quantity);
  const inPrice = updated.in_price !== undefined ? parseFloat(updated.in_price) : null;
  if (isNaN(price) || isNaN(quantity)) {
    throw new Error('Price and quantity must be valid numbers');
  }
  const total = price * quantity;
  const query = 'UPDATE pricelist SET product_service = $1, in_price = $2, price = $3, quantity = $4, total = $5 WHERE id = $6 RETURNING *';
  const values = [updated.product_service, inPrice, price, quantity, total, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getPricelist, updatePricelistItem };
