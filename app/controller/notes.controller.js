const Note = require('../model/note.model')

// Create and Save a new Note
exports.create = (req, res) => {

    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            status: 'Fail',
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
        res.send({
            status: 'Success',
            message: 'Note saved successfully.',
            data: [data]
        })
    }).catch(err => {
        res.status(500).send({
            status: 'Fail',
            message: err.message || 'Error occured while creating note.',
            data: []
        })
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(note => {
        if(note == '') {
            res.send({
                status: 'Success',
                message: 'No note found.'
            })
        }
        res.send({
            status: 'Success',
            message: 'Note retrived successfully.',
            data: note,
        })
    }).catch(err => {
        res.status(500).send({
            status: 'Fail',
            message: err.message || 'Some error occured while retriving note.',
            data: []
        })
    })
}

// Find a single note with an id
exports.findOne = (req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(!note) {
            res.status(404).send({
                status: 'Fail',
                message: 'Note not found with id' + req.params.id,
                data: []
            })
        }

        res.send({
            status: 'Success',
            message: 'Note retrived successfully',
            data: [note]
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                status: 'Fail',
                message: 'Note not found with id' + req.params.id,
                data: []
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'error retriving note with id' + req.params.id,
            data: []
        })
    })
}

// Update a note identified by the id in the request
exports.update = (req, res) => {

    // Validate request
    if(!req.body.content) {
        res.status(400).send({
            status: 'Fail',
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
                status: 'Fail',
                message: 'Note not found with id ' + req.params.id,
                data: []
            })
        }
        res.send({
            status: 'Success',
            message: 'Note updated successfully.',
            data: [note]
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                status: 'Fail',
                message: 'Note not found with id ' + req.params.id,
                data: []
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'Error occured while updating note.',
            data: []
        })
    })
}

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(note => {
        if(!note) {
            res.status(404).send({
                status: 'Fail',
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.send({
            status: 'Success',
            message: 'Note deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.status(404).send({
                status: 'Fail',
                message: 'Note not found with id ' + req.params.id
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'Could not delete note.'
        })
    })
}
