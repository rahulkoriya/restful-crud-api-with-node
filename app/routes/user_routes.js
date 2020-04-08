var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const users = require('../controller/users.controller')

    // Create a new note
    app.post('/users/create', users.create)

    // Retrive all users
    app.get('/users', users.findAll)

    // Retrive note with id
    app.get('/users/:id', users.findOne)

    // Update note with id
    app.put('/users/:id', users.update)

    // Delete note with id
    app.delete('/users/:id', users.delete)

}