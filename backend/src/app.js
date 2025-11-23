const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reportes', reportRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;