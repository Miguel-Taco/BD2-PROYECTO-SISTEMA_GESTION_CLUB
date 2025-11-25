const reportService = require('../services/reportService');

// Controlador para el Reporte 1 (Masa Salarial Total)
const getMasaSalarialTotal = async (req, res, next) => {
    try {
        const data = await reportService.getMasaSalarialTotal();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// Controlador para el Reporte 2 (Valor de Mercado del Plantel)
const getValorMercadoPlantel = async (req, res, next) => {
    try {
        const data = await reportService.getValorMercadoPlantel();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// Controlador para el Reporte 3 (ROI de Fichajes)
const getRoiFichajes = async (req, res, next) => {
  try {
    const data = await reportService.getRoiFichajes();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Controlador para el Reporte 4 (Distribución de Edad)
const getDistribucionEdad = async (req, res, next) => {
    try {
        const data = await reportService.getDistribucionEdad();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

// Controlador para el Reporte 5 (Vencimientos de Contrato)
const getVencimientosContrato = async (req, res, next) => {
    try {
        const data = await reportService.getVencimientosContrato();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

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
const getProyeccionPlanilla = async (req, res, next) => {
    try {
        const data = await reportService.getProyeccionPlanilla();
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
  getMasaSalarialTotal,
  getValorMercadoPlantel,
  getRoiFichajes,
  getDistribucionEdad,
  getVencimientosContrato,
  getRiesgoFuga,
  getProyeccionPlanilla,
  getControlExtranjeros,
  getBalanceCantera,
  getJugadoresCedidos
};