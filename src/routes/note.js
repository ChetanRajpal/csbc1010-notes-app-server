const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)

  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */


// My code 

const newText = req.body.text
  db.query("INSERT INTO notes (text) VALUES (?)", [newText], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      db.query("SELECT dateCreated, lastModified FROM notes WHERE id = ? ", result.insertId, function(err, resultdate){
        if(err){
          throw err;
        }
        else {
          const newNote = { id: result.insertId, text: newText, dateCreated: resultdate[0].dateCreated, lastModified: resultdate[0].lastModified }
          if (!validateNote(newNote)) {
          res.status(500).send('Invalid data type')
          }
          res.status(201).send({ newNote })
        }
      })
      
    }
  })

})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/
	const noteId = req.body.id
	const newText = req.body.text
  db.query("UPDATE notes SET text = ? WHERE id = ?", [newText, noteId], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      db.query("SELECT dateCreated, lastModified FROM notes WHERE id = ? ", noteId, function(err, resultdate){
          if(err) {
            throw err;
          }
          else {
            const updatedNote = { id: noteId, text: newText, dateCreated: resultdate[0].dateCreated, lastModified: resultdate[0].lastModified}
            if (!validateNote(updatedNote)) {
              res.status(500).send('Invalid data type')
            }
            console.log(updatedNote)
            res.send({ updatedNote })
          }
      })
      
    }
  })


	
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id
  
  db.query("DELETE FROM notes WHERE id =?", noteId, function(err, result){
    if(err) {
      throw err;
    } else {
      res.status(500).send('Fail to delete')
    }
    res.send()
  })

})
/* -------------------------------------------------------------------------- */

module.exports = router
