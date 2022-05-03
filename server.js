const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./connection')
const port = 3000

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let db

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('tarsk')
    crocs = db.collection('crocs')
  }
)

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
  let sql =
    'SELECT speciesName, speciesImg FROM species WHERE speciesFamilyId = 1'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// Show Alligators
app.get('/alligator', (req, res) => {
  let sql = `SELECT family.familyName, species.speciesName, species.speciesImg
    FROM species
    INNER JOIN family ON species.speciesFamilyId = family.familyId
    WHERE speciesFamilyId = 2`
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})
// test
app.get('/home/:familynames', (req, res) => {
  let sql = `SELECT family.familyName, species.speciesName, species.speciesImg
    FROM species
    INNER JOIN family ON species.speciesFamilyId = family.familyId
    WHERE familyName = ?`
  connection.query(
    sql,
    [req.params.familynames],
    function (error, results, fields) {
      if (error) throw error
      res.json(results)
    }
  )
})

app.get('/count/:familynames', (req, res) => {
  let sql = `SELECT COUNT(speciesId) AS amountOfAllis FROM species
  INNER JOIN family ON species.speciesFamilyId = family.familyId
    WHERE familyName = ?;`
  connection.query(
    sql,
    [req.params.familynames],
    function (error, results, fields) {
      if (error) throw error
      res.json(results)
    }
  )
})

app.get('/alligator-count', (req, res) => {
  let sql = `SELECT COUNT(speciesId) AS amountOfAllis FROM species WHERE speciesFamilyId = 2`
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// Show Gharials
app.get('/gharial', (req, res) => {
  let sql =
    'SELECT speciesName, speciesImg FROM species WHERE speciesFamilyId = 3'
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

app.get('/species/:name', (req, res) => {
  // let sql = "SELECT * FROM species WHERE speciesName = ?";
  let sql = 'CALL showSpecies(?)'
  connection.query(sql, [req.params.name], function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.post('/species/', (req, res) => {
  let sql = 'CALL newCrocodilia2(?, ?, ?, ?, ?, ?, ?)'
  let params = [
    req.body.speciesName,
    req.body.speciesFood,
    req.body.speciesLength,
    req.body.speciesWeight,
    req.body.speciesFamilyId,
    req.body.habitatId,
    req.body.waterId
  ]
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.patch('/species', (req, res) => {
  // let sql ='CALL updateCrocodilia(?,?,?,?,?)'
  let sql = `UPDATE species
  SET speciesName="?", speciesFood="?", speciesLength=?, speciesWeight=?, speciesFamilyId=?
  WHERE speciesId = ?`
  let params = [
    req.body.speciesName,
    req.body.speciesFood,
    req.body.speciesLength,
    req.body.speciesWeight,
    req.body.speciesFamilyId,
    req.body.speciesId
  ]
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

app.delete('/species', (req, res) => {
  console.log(req.body)
  let sqlDeleteHJunction = `DELETE FROM speciesHabitat
  WHERE speciesHabitatSId = ?`
  connection.query(
    sqlDeleteHJunction,
    [req.body.speciesId],
    function (error, results, fields) {
      if (error) throw error
      res.end('Reptile is now deleted')
    }
  )
  let sqlDeleteWJunction = `DELETE FROM speciesWater
  WHERE speciesWaterSId = ?`
  connection.query(
    sqlDeleteWJunction,
    [req.body.speciesId],
    function (error, results, fields) {
      if (error) throw error
      res.end('Reptile is now deleted')
    }
  )
  let sql = `DELETE FROM species
  WHERE speciesId = ?`
  connection.query(
    sql,
    [req.body.speciesId],
    function (error, results, fields) {
      if (error) throw error
      res.end('Reptile is now deleted')
    }
  )
})

app.post('/comments', (req, res) => {
  let time = new Date()
  let timeStamp = time.toLocaleString('sv-SE')
  let comment = req.body.theComment
  let username = req.body.theUsername

  crocs.insertOne(
    {
      thiscomment: comment,

      thisusername: username,

      thisStamp: timeStamp
    },
    (err, result) => {
      if (err) throw err
      console.log(result)
      res.json({ ok: true })
    }
  )
})

// Get-request för kommentarer:
app.get('/comments', (req, res) => {
  crocs.find().toArray((err, items) => {
    if (err) throw err
    res.json({ thiscomment: items })
  })
})

//Delete-request för kommentarer:
app.delete('/comments', (req, res) => {
  let comment = req.body.theComment
  let username = req.body.theUsername

  crocs.deleteOne(
    {
      thiscomment: comment,
      thisusername: username
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})

//Put request för kommentarer:
app.put('/comments', (req, res) => {
  let comment = req.body.theComment
  let username = req.body.theUsername
  crocs.updateOne(
    { thisusername: username },
    {
      $set: {
        thiscomment: comment
      }
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})

app.get('/familyname', (req, res) => {
  let sql = 'SELECT familyName FROM family'
  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})

// Search Crocodilians
app.get('/search/:searchspecies', (req, res) => {
  // let sql = "SELECT * FROM species WHERE speciesName LIKE '%croc%';"
  // SELECT speciesName, speciesImg from species;
  // ^^ gör om till en fråga
  let search = `%${req.params.searchspecies}%`
  let sql = `SELECT speciesName, speciesImg FROM species WHERE speciesName LIKE ?`
  connection.query(sql, [search], function (error, results, fields) {
    if (error) throw error
    res.json(results)
  })
})
