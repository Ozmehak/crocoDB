const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootuser',
  password: 'sitar123',
  database: 'tarsk'
})

module.exports = connection
