const reportService = require('../services/reportService');

// Reporte 9: Balance Cantera vs. Fichajes
async function getBalanceCantera(req, res, next) {
  try {
    const resultado = await reportService.getBalanceCantera();
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

// Reporte 10: Jugadores Cedidos
async function getJugadoresCedidos(req, res, next) {
  try {
    const resultado = await reportService.getJugadoresCedidos();
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBalanceCantera,
  getJugadoresCedidos
};