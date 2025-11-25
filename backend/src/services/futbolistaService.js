const { executeQuery } = require('../config/database');

class FutbolistaService {
  async getAllFutbolistas() {
    const query = `
      SELECT 
        f.ID_FUTBOLISTA,
        f.NOMBRES,
        f.APELLIDOS,
        f.FECHA_NACIMIENTO,
        f.VALOR_MERCADO,
        f.ID_PAIS,
        f.ID_POSICION,
        p.NOMBRE_PAIS,
        pos.NOMBRE_POSICION
      FROM FUTBOLISTA f
      LEFT JOIN PAIS p ON f.ID_PAIS = p.ID_PAIS
      LEFT JOIN POSICION pos ON f.ID_POSICION = pos.ID_POSICION
      ORDER BY f.ID_FUTBOLISTA
    `;
    const result = await executeQuery(query);
    return result.rows;
  }

  async getFutbolistaById(id) {
    const query = `
      SELECT 
        f.ID_FUTBOLISTA,
        f.NOMBRES,
        f.APELLIDOS,
        f.FECHA_NACIMIENTO,
        f.VALOR_MERCADO,
        f.ID_PAIS,
        f.ID_POSICION,
        p.NOMBRE_PAIS,
        pos.NOMBRE_POSICION
      FROM FUTBOLISTA f
      LEFT JOIN PAIS p ON f.ID_PAIS = p.ID_PAIS
      LEFT JOIN POSICION pos ON f.ID_POSICION = pos.ID_POSICION
      WHERE f.ID_FUTBOLISTA = :id
    `;
    const result = await executeQuery(query, [id]);
    return result.rows[0];
  }

  async createFutbolista(data) {
    console.log('[CREATE FUTBOLISTA] Datos recibidos:', data);
    console.log('[CREATE FUTBOLISTA] ES_CANTERANO:', data.es_canterano);
    
    const query = `
      INSERT INTO FUTBOLISTA 
        (NOMBRES, APELLIDOS, FECHA_NACIMIENTO, ID_PAIS, ID_POSICION, ES_EXTRANJERO, ES_CANTERANO, 
         CLUB_FORMACION, SITUACION_ACTUAL, DETALLE_BAJA, FECHA_RETORNO_ESTIMADA, 
         VALOR_MERCADO, COSTO_FICHAJE, ESTADO_MEDICO)
      VALUES 
        (:nombres, :apellidos, TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'), :id_pais, :id_posicion,
         :es_extranjero, :es_canterano, :club_formacion, :situacion_actual, :detalle_baja,
         TO_DATE(:fecha_retorno_estimada, 'YYYY-MM-DD'), :valor_mercado, :costo_fichaje, 
         :estado_medico)
    `;
    const params = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: data.fecha_nacimiento,
      id_pais: data.id_pais,
      id_posicion: data.id_posicion,
      es_extranjero: data.es_extranjero,
      es_canterano: data.es_canterano,
      club_formacion: data.club_formacion,
      situacion_actual: data.situacion_actual,
      detalle_baja: data.detalle_baja,
      fecha_retorno_estimada: data.fecha_retorno_estimada,
      valor_mercado: data.valor_mercado,
      costo_fichaje: data.costo_fichaje,
      estado_medico: data.estado_medico
    };
    
    console.log('[CREATE FUTBOLISTA] Parámetros a insertar:', params);
    await executeQuery(query, params);
    console.log('[CREATE FUTBOLISTA] Inserción completada exitosamente');
    
    return { message: 'Futbolista creado exitosamente' };
  }

  async updateFutbolista(id, data) {
    const query = `
      UPDATE FUTBOLISTA 
      SET 
        NOMBRES = :nombres,
        APELLIDOS = :apellidos,
        FECHA_NACIMIENTO = TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'),
        ID_PAIS = :id_pais,
        ID_POSICION = :id_posicion,
        ES_EXTRANJERO = :es_extranjero,
        ES_CANTERANO = :es_canterano,
        CLUB_FORMACION = :club_formacion,
        SITUACION_ACTUAL = :situacion_actual,
        DETALLE_BAJA = :detalle_baja,
        FECHA_RETORNO_ESTIMADA = TO_DATE(:fecha_retorno_estimada, 'YYYY-MM-DD'),
        VALOR_MERCADO = :valor_mercado,
        COSTO_FICHAJE = :costo_fichaje,
        ESTADO_MEDICO = :estado_medico
      WHERE ID_FUTBOLISTA = :id
    `;
    const params = {
      id: id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      fecha_nacimiento: data.fecha_nacimiento,
      id_pais: data.id_pais,
      id_posicion: data.id_posicion,
      es_extranjero: data.es_extranjero,
      es_canterano: data.es_canterano,
      club_formacion: data.club_formacion,
      situacion_actual: data.situacion_actual,
      detalle_baja: data.detalle_baja,
      fecha_retorno_estimada: data.fecha_retorno_estimada,
      valor_mercado: data.valor_mercado,
      costo_fichaje: data.costo_fichaje,
      estado_medico: data.estado_medico
    };
    await executeQuery(query, params);
    return { message: 'Futbolista actualizado exitosamente' };
  }

  async deleteFutbolista(id) {
    const query = `DELETE FROM FUTBOLISTA WHERE ID_FUTBOLISTA = :id`;
    await executeQuery(query, [id]);
    return { message: 'Futbolista eliminado exitosamente' };
  }
}

module.exports = new FutbolistaService();