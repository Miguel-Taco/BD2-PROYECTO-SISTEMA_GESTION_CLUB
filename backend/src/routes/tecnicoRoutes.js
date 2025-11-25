const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnicoController');

router.get('/', tecnicoController.getAll);
router.get('/:id', tecnicoController.getById);
router.post('/', tecnicoController.create);
router.put('/:id', tecnicoController.update);
router.delete('/:id', tecnicoController.delete);

module.exports = router;
