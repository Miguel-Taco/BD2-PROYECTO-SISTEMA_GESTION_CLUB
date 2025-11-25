const catalogoService = require('../services/catalogoService');
const logger = require('../utils/logger');

class CatalogoController {
  async getCatalogos(req, res, next) {
    try {
      const catalogos = await catalogoService.getAllCatalogos();
      res.json(catalogos);
    } catch (error) {
      logger.error('Error obteniendo catálogos:', error);
      next(error);
    }
  }

  async getPaises(req, res, next) {
    try {
      const paises = await catalogoService.getPaises();
      res.json(paises);
    } catch (error) {
      logger.error('Error obteniendo países:', error);
      next(error);
    }
  }

  async getPosiciones(req, res, next) {
    try {
      const posiciones = await catalogoService.getPosiciones();
      res.json(posiciones);
    } catch (error) {
      logger.error('Error obteniendo posiciones:', error);
      next(error);
    }
  }

  async getClubes(req, res, next) {
    try {
      const clubes = await catalogoService.getClubes();
      res.json(clubes);
    } catch (error) {
      logger.error('Error obteniendo clubes:', error);
      next(error);
    }
  }
}

module.exports = new CatalogoController();
