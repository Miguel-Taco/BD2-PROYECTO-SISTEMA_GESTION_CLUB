const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/1/masa-salarial', reportController.getMasaSalarialTotal);
router.get('/2/valor-mercado', reportController.getValorMercadoPlantel);
router.get('/3/roi-fichajes', reportController.getRoiFichajes);
router.get('/4/distribucion-edad', reportController.getDistribucionEdad);
router.get('/5/vencimientos-contrato', reportController.getVencimientosContrato);
router.get('/6/riesgo-fuga', reportController.getRiesgoFuga);
router.get('/7/bajas-disponibilidad', reportController.getBajasDisponibilidad);
router.get('/8/control-extranjeros', reportController.getControlExtranjeros);
router.get('/9/balance-cantera', reportController.getBalanceCantera);
router.get('/10/jugadores-cedidos', reportController.getJugadoresCedidos);

module.exports = router;