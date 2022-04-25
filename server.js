const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./connection')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))

app.listen(port, () => console.log(`${port}`))

app.get('/species', (req, res) => {
  let sql = 'SELECT * FROM species'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})
// Show Crocodiles
app.get('/crocodile', (req, res) => {
  let sql = 'SELECT speciesName FROM species WHERE speciesFamilyId = 1'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// Show Alligators
app.get('/alligator', (req, res) => {
  let sql = 'SELECT speciesName FROM species WHERE speciesFamilyId = 2'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// Show Gharials
app.get('/gharial', (req, res) => {
  let sql = 'SELECT speciesName FROM species WHERE speciesFamilyId = 3'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.get('/species/habitat', (req, res) => {
  let sql = `SELECT speciesId,
        speciesName,
        GROUP_CONCAT(h.habitatType)
    FROM species AS s
        INNER JOIN speciesHabitat AS sh
            ON s.speciesId = sh.speciesHabitatSId
        INNER JOIN habitat AS h
            ON sh.speciesHabitatHId = h.habitatId
    GROUP BY speciesId`
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.get('/species/:UUID', (req, res) => {
  let sql = 'SELECT * FROM species WHERE speciesUUID = ?'
  connection.query(sql, [req.params.UUID], function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.post('/species/', (req, res) => {
  let sql = 'CALL newCrocodilia(UUID(), ?, ?, ?, ?, ?)'
  let params = [
    req.body.speciesUUID,
    req.body.speciesName,
    req.body.speciesFood,
    req.body.speciesLength,
    req.body.speciesWeight,
    req.body.speciesFamilyId
  ]
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// const mongo = require("mongodb").MongoClient
// const url = "mongodb://localhost:27017"
// let db

// mongo.connect(
//     url,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     },
//     (err, client) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         db = client.db("nodebooks")
//         books = db.collection("books")
//     }
// )
