const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
// REPORTES JB FC (1, 2, 3)
router.get('/1/masa-salarial', reportController.getMasaSalarialTotal);
router.get('/2/valor-mercado', reportController.getValorMercadoPlantel);
router.get('/3/roi-fichajes', reportController.getRoiFichajes);

// REPORTES (4, 5)
router.get('/4/distribucion-edad', reportController.getDistribucionEdad);
router.get('/5/vencimientos-contrato', reportController.getVencimientosContrato);

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