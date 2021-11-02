const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */


  const display = "SELECT * FROM notes";
  db.query(display, function (err, result) {
    if (err) {
        throw err; }
    else {
    const notes = result;
  if (!validateNoteArray(notes)) {
    res.status(500).send('Invalid data type')
  }
  res.send({ notes })
}
  });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
        const searchKey = `%${req.params.searchKey}%`;

        db.query(
          "SELECT * FROM notes WHERE text LIKE ? ",
          [searchKey],
          function (err, resultsearch) {
            if (err) {res.status(500).send("Fail to query")}
            else {if (!validateNoteArray(resultsearch)) {
              res.status(500).send("Invalid data type")
            }
            res.send({notes: resultsearch});
            }
          });
 
})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */
   db.query("DELETE FROM notes", function(err, resultdelete){
     if (err) {
       throw err;
       res.status(500).send('Fail to delete')
     } else {
      res.send()
     }
   })

})
/* -------------------------------------------------------------------------- */

module.exports = router