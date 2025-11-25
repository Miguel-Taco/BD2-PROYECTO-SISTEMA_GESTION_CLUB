const futbolistaService = require('../services/futbolistaService');
const logger = require('../utils/logger');

class FutbolistaController {
  async getAll(req, res, next) {
    try {
      const futbolistas = await futbolistaService.getAllFutbolistas();
      res.json(futbolistas);
    } catch (error) {
      logger.error('Error obteniendo futbolistas:', error);
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const futbolista = await futbolistaService.getFutbolistaById(id);
      if (!futbolista) {
        return res.status(404).json({ message: 'Futbolista no encontrado' });
      }
      res.json(futbolista);
    } catch (error) {
      logger.error('Error obteniendo futbolista:', error);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await futbolistaService.createFutbolista(req.body);
      res.status(201).json(result);
    } catch (error) {
      logger.error('Error creando futbolista:', error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await futbolistaService.updateFutbolista(id, req.body);
      res.json(result);
    } catch (error) {
      logger.error('Error actualizando futbolista:', error);
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await futbolistaService.deleteFutbolista(id);
      res.json(result);
    } catch (error) {
      logger.error('Error eliminando futbolista:', error);
      next(error);
    }
  }
}

module.exports = new FutbolistaController();