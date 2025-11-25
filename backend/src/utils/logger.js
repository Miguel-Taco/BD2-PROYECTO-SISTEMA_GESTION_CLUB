function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

function error(message, err) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [ERROR] ${message}`, err);
}

module.exports = { 
  log, 
  error,
  info: (msg) => log(msg, 'info'),
  warn: (msg) => log(msg, 'warn')
};