const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// REPORTES TACO (9 y 10)
router.get('/9/balance-cantera', reportController.getBalanceCantera);
router.get('/10/jugadores-cedidos', reportController.getJugadoresCedidos);

// Aquí tus compañeros agregarán sus reportes (1-8)
// router.get('/1/masa-salarial', reportController.getMasaSalarial);
// router.get('/2/valor-mercado', reportController.getValorMercado);
// etc...

module.exports = router;