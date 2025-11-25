const reportService = require('../services/reportService');

const getMasaSalarialTotal = async (req, res, next) => {
    try {
        const data = await reportService.getMasaSalarialTotal();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getValorMercadoPlantel = async (req, res, next) => {
    try {
        const data = await reportService.getValorMercadoPlantel();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getRoiFichajes = async (req, res, next) => {
  try {
    const data = await reportService.getRoiFichajes();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getDistribucionEdad = async (req, res, next) => {
    try {
        const data = await reportService.getDistribucionEdad();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getVencimientosContrato = async (req, res, next) => {
    try {
        const data = await reportService.getVencimientosContrato();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getRiesgoFuga = async (req, res, next) => {
    try {
        const data = await reportService.getRiesgoFuga();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getBajasDisponibilidad = async (req, res, next) => {
    try {
        const data = await reportService.getBajasDisponibilidad(); 
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const getControlExtranjeros = async (req, res, next) => {
    try {
        const data = await reportService.getControlExtranjeros();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

async function getBalanceCantera(req, res, next) {
  try {
    const resultado = await reportService.getBalanceCantera();
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

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
  getBajasDisponibilidad,
  getControlExtranjeros,
  getBalanceCantera,
  getJugadoresCedidos
};