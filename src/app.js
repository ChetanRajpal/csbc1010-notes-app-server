const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/

const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database:"assignment3"
});

global.db = db;

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/


const sql = "CREATE TABLE IF NOT EXISTS notes (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(10000), dateCreated TIMESTAMP DEFAULT now(), lastModified TIMESTAMP DEFAULT now() ON UPDATE now())";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  
  



app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = db;
