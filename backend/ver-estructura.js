require('dotenv').config();
const { getConnection } = require('./src/config/database');

async function verEstructura() {
  console.log('Estructura de las tablas:\n');

  try {
    const connection = await getConnection();
    
    const tablas = ['FUTBOLISTA', 'EQUIPO_TECNICO', 'PAIS', 'POSICION', 'CONTRATO', 'ROL_TECNICO'];
    
    for (const tabla of tablas) {
      console.log(`\nTabla: ${tabla}`);
      const cols = await connection.execute(
        `SELECT column_name, data_type, data_length, nullable 
         FROM user_tab_columns 
         WHERE table_name = :tabla 
         ORDER BY column_id`,
        [tabla]
      );
      
      if (cols.rows.length > 0) {
        cols.rows.forEach(col => {
          const nullable = col.NULLABLE === 'Y' ? 'NULL' : 'NOT NULL';
          console.log(`  - ${col.COLUMN_NAME.padEnd(25)} ${col.DATA_TYPE.padEnd(15)} ${nullable}`);
        });
        
        // Mostrar algunos datos de ejemplo
        const sample = await connection.execute(
          `SELECT * FROM ${tabla} WHERE ROWNUM <= 3`
        );
        if (sample.rows.length > 0) {
          console.log(`  Ejemplos (${sample.rows.length} filas):`);
          sample.rows.forEach((row, i) => {
            console.log(`    ${i + 1}.`, JSON.stringify(row));
          });
        };
      } else {
        console.log(`  Tabla no encontrada`);
      }
    }
    
    await connection.close();
    console.log('\nConsulta completada');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

verEstructura();
