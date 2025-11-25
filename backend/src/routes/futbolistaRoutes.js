const express = require('express');
const router = express.Router();
const futbolistaController = require('../controllers/futbolistaController');

router.get('/', futbolistaController.getAll);
router.get('/:id', futbolistaController.getById);
router.post('/', futbolistaController.create);
router.put('/:id', futbolistaController.update);
router.delete('/:id', futbolistaController.delete);

module.exports = router;