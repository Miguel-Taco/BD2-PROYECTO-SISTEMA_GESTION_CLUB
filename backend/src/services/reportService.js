const oracledb = require('oracledb');
const { getConnection } = require('../config/database');

// ===================================================================
// REPORTE 1: MASA SALARIAL TOTAL
// ===================================================================

async function getMasaSalarialTotal() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 1] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_MASA_SALARIAL(:jugadores_cursor, :tecnicos_cursor, :total_salarios);
            END;`,
            {
                jugadores_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                tecnicos_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                total_salarios: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            }
        );
        
        console.log(' [REPORTE 1] Procedimiento ejecutado');
        
        const jugCursor = result.outBinds.jugadores_cursor;
        const jugRows = await jugCursor.getRows(100);
        await jugCursor.close();

        const detalleJugadores = jugRows.map(row => ({
            nombre_completo: row[0],
            salario_original: parseFloat(row[1]),
            moneda_original: row[2],
            salario_en_soles: parseFloat(row[3])
        }));

        const tecCursor = result.outBinds.tecnicos_cursor;
        const tecRows = await tecCursor.getRows(100);
        await tecCursor.close();

        const detalleTecnicos = tecRows.map(row => ({
            nombre_completo: row[0],
            salario_original: parseFloat(row[1]),
            moneda_original: row[2],
            salario_en_soles: parseFloat(row[3])
        }));

        return {
            success: true,
            reporte: 'Masa Salarial Total',
            gran_total_soles: parseFloat(result.outBinds.total_salarios),
            detalle: {
                jugadores: detalleJugadores,
                tecnicos: detalleTecnicos,
                sub_total_jugadores: detalleJugadores.reduce((acc, curr) => acc + curr.salario_en_soles, 0),
                sub_total_tecnicos: detalleTecnicos.reduce((acc, curr) => acc + curr.salario_en_soles, 0),
            }
        };

    } catch (error) {
        console.error(' [REPORTE 1] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Masa Salarial Total',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 2: VALOR DE MERCADO DEL PLANTEL
// ===================================================================

async function getValorMercadoPlantel() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 2] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_VALOR_MERCADO(:total_mercado, :cursor);
            END;`,
            {
                total_mercado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );
        
        console.log(' [REPORTE 2] Procedimiento ejecutado');
        
        const cursor = result.outBinds.cursor;
        const rows = await cursor.getRows(100);
        await cursor.close();

        const data = rows.map(row => ({
            nombre_completo: row[0],
            posicion: row[1],
            pais_origen: row[2],
            valor_mercado: parseFloat(row[3])
        }));

        return {
            success: true,
            reporte: 'Valor de Mercado del Plantel',
            gran_total_usd: parseFloat(result.outBinds.total_mercado),
            cantidad_registros: data.length,
            data: data
        };

    } catch (error) {
        console.error(' [REPORTE 2] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Valor de Mercado del Plantel',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 3: ROI DE FICHAJES
// ===================================================================

async function getRoiFichajes() {
  let connection;
  try {
    connection = await getConnection();
    console.log(' [REPORTE 3] Conexión exitosa');

    const result = await connection.execute(
      `BEGIN
        SP_REPORTE_ROI_FICHAJES(:cursor);
      END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    console.log(' [REPORTE 3] Procedimiento ejecutado');
    const cursor = result.outBinds.cursor;
    const rows = await cursor.getRows(100);
    await cursor.close();

    const data = rows.map(row => ({
      nombre_completo: row[0],
      valor_actual_usd: parseFloat(row[1]),
      costo_inversion_usd: parseFloat(row[2]),
      porcentaje_roi: parseFloat(row[3]),
      estado_inversion: row[4]
    }));

    return {
      success: true,
      reporte: 'ROI de Fichajes',
      cantidad_registros: data.length,
      data: data
    };

  } catch (error) {
    console.error(' [REPORTE 3] Error:', error.message);
    throw {
      status: 500,
      message: 'Error al ejecutar reporte ROI de Fichajes',
      details: error.message
    };
  } finally {
    if (connection) await connection.close();
  }
}

// ===================================================================
// REPORTE 4: DISTRIBUCIÓN DE EDAD
// ===================================================================

async function getDistribucionEdad() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 4] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_DISTRIBUCION_EDAD(:cursor);
            END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        console.log(' [REPORTE 4] Procedimiento ejecutado');
        
        const cursor = result.outBinds.cursor;
        const rows = await cursor.getRows(100);
        await cursor.close();

        const data = rows.map(row => ({
            rango_edad: row[0],
            cantidad_jugadores: row[1],
            edad_promedio: parseFloat(row[2]),
            porcentaje_plantilla: parseFloat(row[3]),
            valor_mercado_promedio: parseFloat(row[4])
        }));
        
        return {
            success: true,
            reporte: 'Distribución de Edad',
            total_jugadores: data.reduce((acc, curr) => acc + curr.cantidad_jugadores, 0),
            data: data
        };

    } catch (error) {
        console.error(' [REPORTE 4] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Distribución de Edad',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 5: PRÓXIMOS VENCIMIENTOS DE CONTRATO
// ===================================================================

async function getVencimientosContrato() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 5] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_VENCIMIENTOS_CONTRATO(:cursor);
            END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        console.log(' [REPORTE 5] Procedimiento ejecutado');
        
        const cursor = result.outBinds.cursor;
        const rows = await cursor.getRows(100);
        await cursor.close();

        const data = rows.map(row => ({
            id_futbolista: row[0],
            nombre_completo: row[1],
            posicion: row[2],
            pais: row[3],
            fecha_inicio_contrato: row[4] ? row[4].toISOString().split('T')[0] : null,
            fecha_fin_contrato: row[5] ? row[5].toISOString().split('T')[0] : null,
            dias_restantes: row[6],
            estado_contrato: row[7],
            salario_mensual: parseFloat(row[8]),
            moneda: row[9],
            valor_mercado: parseFloat(row[10]),
            tipo_contrato: row[11]
        }));
        
        return {
            success: true,
            reporte: 'Próximos Vencimientos de Contrato',
            cantidad_contratos: data.length,
            data: data
        };

    } catch (error) {
        console.error(' [REPORTE 5] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Vencimientos de Contrato',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 6: RIESGO DE FUGA (CURSOR)
// ===================================================================

async function getRiesgoFuga() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 6] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_RIESGO_FUGA(:cursor);
            END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // Captura el detalle de riesgo
            }
        );

        console.log(' [REPORTE 6] Procedimiento ejecutado');
        
        const cursor = result.outBinds.cursor;
        const rows = await cursor.getRows(100);
        await cursor.close();

        // Mapeamos las 6 columnas de salida
        const data = rows.map(row => ({
            nombre_completo: row[0],
            valor_mercado: parseFloat(row[1]),
            clausula_original: parseFloat(row[2]),
            moneda_original: row[3],
            clausula_en_usd: parseFloat(row[4]),
            estado_de_riesgo: row[5] // Aquí viene el mensaje de semáforo
        }));
        
        return {
            success: true,
            reporte: 'Riesgo de Fuga Patrimonial',
            cantidad_analizada: data.length,
            data: data
        };

    } catch (error) {
        console.error(' [REPORTE 6] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Riesgo de Fuga',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 7: PROYECCIÓN PLANILLA (3 Parámetros de Salida)
// ===================================================================

async function getProyeccionPlanilla() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 7] Conexión exitosa');

        const result = await connection.execute(
            `BEGIN
              SP_REPORTE_PROYECCION_PLANILLA(:jugadores_cursor, :tecnicos_cursor, :total);
            END;`,
            {
                jugadores_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                tecnicos_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
                total: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } // Captura el gran total
            }
        );

        console.log(' [REPORTE 7] Procedimiento ejecutado');
        
        // 1. Procesar Detalle Jugadores
        const jugCursor = result.outBinds.jugadores_cursor;
        const jugRows = await jugCursor.getRows(100);
        await jugCursor.close();

        const detalleJugadores = jugRows.map(row => ({
            nombre_completo: row[0],
            salario_original: parseFloat(row[1]),
            moneda_original: row[2],
            salario_en_soles: parseFloat(row[3])
        }));

        // 2. Procesar Detalle Técnicos
        const tecCursor = result.outBinds.tecnicos_cursor;
        const tecRows = await tecCursor.getRows(100);
        await tecCursor.close();

        const detalleTecnicos = tecRows.map(row => ({
            nombre_completo: row[0],
            salario_original: parseFloat(row[1]),
            moneda_original: row[2],
            salario_en_soles: parseFloat(row[3])
        }));
        
        // 3. Devolver los resultados estructurados
        return {
            success: true,
            reporte: 'Proyección de Planilla',
            gran_total_soles: parseFloat(result.outBinds.total), // El total final
            detalle: {
                jugadores: detalleJugadores,
                tecnicos: detalleTecnicos,
                sub_total_jugadores: detalleJugadores.reduce((acc, curr) => acc + curr.salario_en_soles, 0),
                sub_total_tecnicos: detalleTecnicos.reduce((acc, curr) => acc + curr.salario_en_soles, 0),
            }
        };

    } catch (error) {
        console.error(' [REPORTE 7] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Proyección Planilla',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

// ===================================================================
// REPORTE 8: CONTROL DE EXTRANJEROS (CURSOR)
// ===================================================================

async function getControlExtranjeros() {
    let connection;
    try {
        connection = await getConnection();
        console.log(' [REPORTE 8] Conexión exitosa');

        const result = await connection.execute(
            // Llamamos al procedimiento con los dos parámetros de salida
            `BEGIN
              SP_REPORTE_CONTROL_EXTRANJEROS(:estado, :cursor);
            END;`,
            {
                estado: { type: oracledb.STRING, dir: oracledb.BIND_OUT }, // Captura el mensaje del semáforo
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // Captura el detalle de jugadores
            }
        );

        console.log(' [REPORTE 8] Procedimiento ejecutado');
        
        // 1. Obtener la data del cursor
        const cursor = result.outBinds.cursor;
        const rows = await cursor.getRows(100);
        await cursor.close();

        // 2. Procesar los resultados (mapeo para el frontend)
        const data = rows.map(row => ({
            nombre_completo: row[0],
            posicion: row[1],
            fecha_vencimiento_contrato: row[2] ? row[2].toISOString().split('T')[0] : null,
            situacion_actual: row[3],
            pais_origen: row[4]
        }));
        
        // 3. Devolver los dos resultados clave
        return {
            success: true,
            reporte: 'Control de Extranjeros',
            estado_semaforo: result.outBinds.estado, // El resultado del semáforo
            cantidad_extranjeros: data.length,
            data: data
        };

    } catch (error) {
        console.error(' [REPORTE 8] Error:', error.message);
        throw {
            status: 500,
            message: 'Error al ejecutar reporte Control de Extranjeros',
            details: error.message
        };
    } finally {
        if (connection) await connection.close();
    }
}

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