const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const reportRoutes = require('./routes/reportRoutes');
const futbolistaRoutes = require('./routes/futbolistaRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');

app.use('/api/reportes', reportRoutes);
app.use('/api/futbolistas', futbolistaRoutes);
app.use('/api/tecnicos', tecnicoRoutes);
app.use('/api/catalogos', catalogoRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;