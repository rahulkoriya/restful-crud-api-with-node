const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)