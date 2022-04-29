const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootuser',
  password: 'SiTar123!!',
  database: 'tarsk'
})

module.exports = connection
