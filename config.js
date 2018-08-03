const path = require('path')

module.exports = {
  SERVICE_DIR: path.resolve(__dirname, 'services'),
  server: {
    HOST: '0.0.0.0',
    PORT: 3000
  }
}
