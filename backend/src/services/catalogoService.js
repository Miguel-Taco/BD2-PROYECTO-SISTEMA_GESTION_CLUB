const { executeQuery } = require('../config/database');

class CatalogoService {
  async getPaises() {
    const query = `SELECT ID_PAIS, NOMBRE_PAIS FROM PAIS ORDER BY NOMBRE_PAIS`;
    const result = await executeQuery(query);
    return result.rows;
  }

  async getPosiciones() {
    const query = `SELECT ID_POSICION, NOMBRE_POSICION FROM POSICION ORDER BY NOMBRE_POSICION`;
    const result = await executeQuery(query);
    return result.rows;
  }

  async getRoles() {
    const query = `SELECT ID_ROL, NOMBRE_ROL FROM ROL_TECNICO ORDER BY NOMBRE_ROL`;
    const result = await executeQuery(query);
    return result.rows;
  }

  async getAllCatalogos() {
    const [paises, posiciones, roles] = await Promise.all([
      this.getPaises(),
      this.getPosiciones(),
      this.getRoles()
    ]);
    return { paises, posiciones, clubes: [], roles };
  }
}

module.exports = new CatalogoService();
