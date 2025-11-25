const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogoController');

router.get('/', catalogoController.getCatalogos);
router.get('/paises', catalogoController.getPaises);
router.get('/posiciones', catalogoController.getPosiciones);
router.get('/clubes', catalogoController.getClubes);

module.exports = router;
