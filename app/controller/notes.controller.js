const Note = require('../model/note.model')

// Create and Save a new Note
exports.create = (req, res) => {

    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty.'
        })
    }

    // Create a note
    const note = new Note({
        title: req.body.title || 'Untitled note',
        content: req.body.content
    })

    // Save note in database
    note.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error occured while creating note.'
        })
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(note => {
        if(note == '') {
            res.send({
                message: 'No note found.'
            })
        }
        res.send(note)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while retriving note.'
        })
    })
}

// Find a single note with an id
exports.findOne = (req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(!note) {
            res.status(404).send({
                message: 'Note not found with id' + req.params.id
            })
        }

        res.send(note)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                message: 'Note (objectId) not found with id' + req.params.id
            })
        }
        res.status(500).send({
            message: 'error retriving note with id' + req.params.id
        })
    })
}

// Update a note identified by the id in the request
exports.update = (req, res) => {

    // Validate request
    if(!req.body.content) {
        res.status(400).send({
            message: 'Note content can not be empty.'
        })
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title || 'Untitled note',
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            res.status(404).send({
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.send(note)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.status(500).send({
            message: 'Error occured while updating note.'
        })
    })
}

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(note => {
        if(!note) {
            res.status(404).send({
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.send({
            message: 'Note deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.status(404).send({
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.status(500).send({
            message: 'Could not delete note.'
        })
    })
}