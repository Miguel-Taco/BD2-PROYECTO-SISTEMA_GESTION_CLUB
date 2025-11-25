const oracledb = require('oracledb');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`
};

async function getConnection() {
  try {
    return await oracledb.getConnection(dbConfig);
  } catch (error) {
    console.error('Error conectando a BD:', error);
    throw error;
  }
}

async function executeQuery(query, params = [], options = {}) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(query, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
      ...options
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { getConnection, executeQuery };