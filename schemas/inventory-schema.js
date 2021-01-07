const mongoose = require('mongoose')

const userInvenSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    invenPoke: {
        type: Array,
        default: {}
    },

    numRolls: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('user-inventory', userInvenSchema)