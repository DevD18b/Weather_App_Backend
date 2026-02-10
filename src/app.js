const express = require('express');
const cors = require('cors');

const weatherRoutes = require('./routes/weather.routes');

const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use('/api', weatherRoutes);

/* ---------- HEALTH CHECK (Optional but good) ---------- */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime()
  });
});

/* ---------- GLOBAL ERROR HANDLER ---------- */
/*
  This will catch:
  - validation errors
  - provider errors
  - unexpected crashes
*/
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Internal server error'
    }
  });
});

module.exports = app;
