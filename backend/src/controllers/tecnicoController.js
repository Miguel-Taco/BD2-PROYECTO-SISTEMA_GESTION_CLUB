const tecnicoService = require('../services/tecnicoService');
const logger = require('../utils/logger');

class TecnicoController {
  async getAll(req, res, next) {
    try {
      const tecnicos = await tecnicoService.getAllTecnicos();
      res.json(tecnicos);
    } catch (error) {
      logger.error('Error obteniendo técnicos:', error);
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const tecnico = await tecnicoService.getTecnicoById(id);
      if (!tecnico) {
        return res.status(404).json({ message: 'Técnico no encontrado' });
      }
      res.json(tecnico);
    } catch (error) {
      logger.error('Error obteniendo técnico:', error);
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await tecnicoService.createTecnico(req.body);
      res.status(201).json(result);
    } catch (error) {
      logger.error('Error creando técnico:', error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await tecnicoService.updateTecnico(id, req.body);
      res.json(result);
    } catch (error) {
      logger.error('Error actualizando técnico:', error);
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await tecnicoService.deleteTecnico(id);
      res.json(result);
    } catch (error) {
      logger.error('Error eliminando técnico:', error);
      next(error);
    }
  }
}

module.exports = new TecnicoController();
