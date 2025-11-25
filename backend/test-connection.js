// Script de prueba para verificar la conexión a Oracle
require('dotenv').config();
const { getConnection } = require('./src/config/database');

async function testConnection() {
  console.log('Probando conexión a Oracle...');
  console.log('Configuración:');
  console.log(`  Usuario: ${process.env.DB_USER}`);
  console.log(`  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`  Service: ${process.env.DB_SERVICE}`);
  console.log('');

  try {
    const connection = await getConnection();
    console.log('Conexión exitosa a Oracle!');
    
    // Probar una consulta simple
    const result = await connection.execute('SELECT SYSDATE FROM DUAL');
    console.log('Fecha del servidor Oracle:', result.rows[0][0]);
    
    await connection.close();
    console.log('Prueba completada exitosamente');
  } catch (error) {
    console.error('Error en la conexión:', error.message);
    process.exit(1);
  }
}

testConnection();
