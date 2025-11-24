const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// REPORTES LEONSILLO (6, 7, 8)
router.get('/6/riesgo-fuga', reportController.getRiesgoFuga);
router.get('/7/proyeccion-planilla', reportController.getProyeccionPlanilla);
router.get('/8/control-extranjeros', reportController.getControlExtranjeros);

// REPORTES TACO (9 y 10)
router.get('/9/balance-cantera', reportController.getBalanceCantera);
router.get('/10/jugadores-cedidos', reportController.getJugadoresCedidos);

// Aquí tus compañeros agregarán sus reportes (1-8)
// router.get('/1/masa-salarial', reportController.getMasaSalarial);
// router.get('/2/valor-mercado', reportController.getValorMercado);
// etc...

module.exports = router;