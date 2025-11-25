const reportService = require('../services/reportService');

// Controlador para el Reporte 6
const getRiesgoFuga = async (req, res, next) => {
    try {
        const data = await reportService.getRiesgoFuga();
        res.status(200).json(data);
    } catch (error) {
        next(error); // Pasa el error al middleware errorHandler
    }
};

// Controlador para el Reporte 7
const getBajasDisponibilidad = async (req, res, next) => {
    try {
        // Llama a la nueva función del servicio
        const data = await reportService.getBajasDisponibilidad(); 
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
// Controlador para el Reporte 8
const getControlExtranjeros = async (req, res, next) => {
    try {
        const data = await reportService.getControlExtranjeros();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

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
  getRiesgoFuga,
  getBajasDisponibilidad,
  getControlExtranjeros,
  getBalanceCantera,
  getJugadoresCedidos
};