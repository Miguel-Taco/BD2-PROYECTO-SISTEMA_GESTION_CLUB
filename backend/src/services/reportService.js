const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

// ===================================================================
// REPORTE 9: BALANCE CANTERA VS. FICHAJES (TACO)
// ===================================================================

async function getBalanceCantera() {
  let connection;
  try {
    connection = await getConnection();
    console.log(' [REPORTE 9] Conexión exitosa');

    const result = await connection.execute(
      `BEGIN
        SP_REPORTE_BALANCE_CANTERA(:cursor);
      END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );
    
    console.log(' [REPORTE 9] Procedimiento ejecutado');
    const cursor = result.outBinds.cursor;
    const rows = await cursor.getRows(100);
    await cursor.close();

    const data = rows.map(row => ({
      origen_jugador: row[0],
      cantidad_jugadores: row[1],
      porcentaje_plantilla: parseFloat(row[2]),
      valor_mercado_promedio: parseFloat(row[3]),
      valor_mercado_total: parseFloat(row[4])
    }));

    return {
      success: true,
      reporte: 'Balance Cantera vs. Fichajes',
      cantidad_registros: data.length,
      data: data
    };

  } catch (error) {
    console.error(' [REPORTE 9] Error:', error.message);
    throw {
      status: 500,
      message: 'Error al ejecutar reporte Balance Cantera',
      details: error.message
    };
  } finally {
    if (connection) await connection.close();
  }
}

// ===================================================================
// REPORTE 10: JUGADORES CEDIDOS - PRÉSTAMOS A DEVOLVER (TACO)
// ===================================================================

async function getJugadoresCedidos() {
  let connection;
  try {
    connection = await getConnection();
    console.log(' [REPORTE 10] Conexión exitosa');

    const result = await connection.execute(
      `BEGIN
        SP_REPORTE_JUGADORES_CEDIDOS(:cursor);
      END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    console.log(' [REPORTE 10] Procedimiento ejecutado');
    const cursor = result.outBinds.cursor;
    const rows = await cursor.getRows(100);
    await cursor.close();

    const data = rows.map(row => ({
      id_futbolista: row[0],
      nombres: row[1],
      apellidos: row[2],
      pais: row[3],
      posicion: row[4],
      club_propietario: row[5],
      fecha_inicio_prestamo: row[6] ? row[6].toISOString().split('T')[0] : null,
      fecha_fin_prestamo: row[7] ? row[7].toISOString().split('T')[0] : null,
      dias_restantes_prestamo: row[8],
      estado_prestamo: row[9],
      valor_mercado: parseFloat(row[10]),
      nombre_completo: row[11]
    }));

    return {
      success: true,
      reporte: 'Jugadores Cedidos - Préstamos a Devolver',
      cantidad_registros: data.length,
      data: data
    };

  } catch (error) {
    console.error(' [REPORTE 10] Error:', error.message);
    throw {
      status: 500,
      message: 'Error al ejecutar reporte Jugadores Cedidos',
      details: error.message
    };
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  getBalanceCantera,
  getJugadoresCedidos
};