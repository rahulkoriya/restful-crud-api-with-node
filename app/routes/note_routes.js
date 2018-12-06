var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const notes = require('../controller/notes.controller')

    // Create a new note
    app.post('/notes/create', notes.create)

    // Retrive all notes
    app.get('/notes', notes.findAll)

    // Retrive note with id
    app.get('/notes/:id', notes.findOne)

    // Update note with id
    app.put('/notes/:id', notes.update)

    // Delete note with id
    app.delete('/notes/:id', notes.delete)

}