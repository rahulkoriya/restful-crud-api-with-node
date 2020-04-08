const User = require('../model/user.model')

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    console.log(req.body);
    if(!req.body.name) {
        return res.status(422).send({
            status: 'Fail',
            message: 'User name can not be empty.'
        })
    }

    // Create a user
    const user = new User({
        name: req.body.name || 'unknown user',
        email: req.body.email,
        phone: req.body.phone,
        topic: req.body.topic,
        timePreference: req.body.timePreference,
        subscribe: req.body.subscribe,
    })

    // Save user in database
    user.save()
    .then(data => {
        res.send({
            status: 'Success',
            message: 'User saved successfully.',
            data: [data]
        })
    }).catch(err => {
        res.status(500).send({
            status: 'Fail',
            message: err.message || 'Error occured while creating user.',
            data: []
        })
    })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        if(user == '') {
            res.send({
                status: 'Success',
                message: 'No user found.'
            })
        }
        res.send({
            status: 'Success',
            message: 'User retrived successfully.',
            data: user,
        })
    }).catch(err => {
        res.status(500).send({
            status: 'Fail',
            message: err.message || 'Some error occured while retriving user.',
            data: []
        })
    })
}

// Find a single user with an id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id' + req.params.id,
                data: []
            })
        }

        res.send({
            status: 'Success',
            message: 'User retrived successfully',
            data: [user]
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id' + req.params.id,
                data: []
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'error retriving user with id' + req.params.id,
            data: []
        })
    })
}

// Update a user identified by the id in the request
exports.update = (req, res) => {

    // Validate request
    if(!req.body.name) {
        res.status(422).send({
            status: 'Fail',
            message: 'User name can not be empty.'
        })
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name || 'unknown user',
        email: req.body.email,
        phone: req.body.phone,
        topic: req.body.topic,
        timePreference: req.body.timePreference,
        subscribe: req.body.subscribe,
    }, {new: true})
    .then(user => {
        if(!user) {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id ' + req.params.id,
                data: []
            })
        }
        res.send({
            status: 'Success',
            message: 'User updated successfully.',
            data: [user]
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id ' + req.params.id,
                data: []
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'Error occured while updating user.',
            data: []
        })
    })
}

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id ' + req.params.id
            })
        }
        res.send({
            status: 'Success',
            message: 'User deleted successfully.'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.status(404).send({
                status: 'Fail',
                message: 'User not found with id ' + req.params.id
            })
        }
        res.status(500).send({
            status: 'Fail',
            message: 'Could not delete user.'
        })
    })
}
