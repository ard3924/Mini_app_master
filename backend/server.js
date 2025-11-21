const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const translationRoutes = require('./routes/translations');
const pricelistRoutes = require('./routes/pricelist');
const pool = require('./db');
require('dotenv').config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/translations', translationRoutes);
app.use('/api/pricelist', pricelistRoutes);

// for deployment
app.use(express.static(path.join(__dirname, 'build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const checkDbConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

(async () => {
  await checkDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
