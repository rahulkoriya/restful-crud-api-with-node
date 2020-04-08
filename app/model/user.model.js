const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: String,
    phone: Number,
    topic: String,
    timePreference: String,
    subscribe: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)