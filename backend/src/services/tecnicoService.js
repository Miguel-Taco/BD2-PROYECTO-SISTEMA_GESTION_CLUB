const { executeQuery } = require('../config/database');

class TecnicoService {
  async getAllTecnicos() {
    const query = `
      SELECT 
        t.ID_TECNICO,
        t.NOMBRES,
        t.APELLIDOS,
        t.FECHA_NACIMIENTO,
        t.ID_PAIS,
        t.ID_ROL,
        t.SALARIO_MENSUAL,
        t.FECHA_VENCIMIENTO_CONTRATO,
        p.NOMBRE_PAIS,
        r.NOMBRE_ROL as ROL
      FROM EQUIPO_TECNICO t
      LEFT JOIN PAIS p ON t.ID_PAIS = p.ID_PAIS
      LEFT JOIN ROL_TECNICO r ON t.ID_ROL = r.ID_ROL
      ORDER BY t.ID_TECNICO
    `;
    const result = await executeQuery(query);
    return result.rows;
  }

  async getTecnicoById(id) {
    const query = `
      SELECT 
        t.ID_TECNICO,
        t.NOMBRES,
        t.APELLIDOS,
        t.FECHA_NACIMIENTO,
        t.ID_PAIS,
        t.ID_ROL,
        t.SALARIO_MENSUAL,
        t.FECHA_VENCIMIENTO_CONTRATO,
        p.NOMBRE_PAIS,
        r.NOMBRE_ROL as ROL
      FROM EQUIPO_TECNICO t
      LEFT JOIN PAIS p ON t.ID_PAIS = p.ID_PAIS
      LEFT JOIN ROL_TECNICO r ON t.ID_ROL = r.ID_ROL
      WHERE t.ID_TECNICO = :id
    `;
    const result = await executeQuery(query, [id]);
    return result.rows[0];
  }

  async createTecnico(data) {
    const query = `
      INSERT INTO EQUIPO_TECNICO 
        (NOMBRES, APELLIDOS, FECHA_NACIMIENTO, ID_PAIS, ID_ROL, SALARIO_MENSUAL, FECHA_VENCIMIENTO_CONTRATO)
      VALUES 
        (:nombres, :apellidos, TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'), :id_pais, :id_rol, :salario_mensual, 
         TO_DATE(:fecha_vencimiento_contrato, 'YYYY-MM-DD'))
    `;
    const params = {
      nombres: data.nombre,
      apellidos: data.apellido,
      fecha_nacimiento: data.fecha_nacimiento,
      id_pais: data.id_pais,
      id_rol: data.id_rol || data.rol,
      salario_mensual: data.salario_mensual,
      fecha_vencimiento_contrato: data.fecha_vencimiento_contrato
    };
    await executeQuery(query, params);
    return { message: 'Técnico creado exitosamente' };
  }

  async updateTecnico(id, data) {
    const query = `
      UPDATE EQUIPO_TECNICO 
      SET 
        NOMBRES = :nombres,
        APELLIDOS = :apellidos,
        FECHA_NACIMIENTO = TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'),
        ID_PAIS = :id_pais,
        ID_ROL = :id_rol,
        SALARIO_MENSUAL = :salario_mensual,
        FECHA_VENCIMIENTO_CONTRATO = TO_DATE(:fecha_vencimiento_contrato, 'YYYY-MM-DD')
      WHERE ID_TECNICO = :id
    `;
    const params = {
      id: id,
      nombres: data.nombre,
      apellidos: data.apellido,
      fecha_nacimiento: data.fecha_nacimiento,
      id_pais: data.id_pais,
      id_rol: data.id_rol || data.rol,
      salario_mensual: data.salario_mensual,
      fecha_vencimiento_contrato: data.fecha_vencimiento_contrato
    };
    await executeQuery(query, params);
    return { message: 'Técnico actualizado exitosamente' };
  }

  async deleteTecnico(id) {
    const query = `DELETE FROM EQUIPO_TECNICO WHERE ID_TECNICO = :id`;
    await executeQuery(query, [id]);
    return { message: 'Técnico eliminado exitosamente' };
  }
}

module.exports = new TecnicoService();
