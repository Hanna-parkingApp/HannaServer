const mongoose = require('mongoose');
const Car = require('./Car');

const userSchema = mongoose.Schema({
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true,
        minLength: 8
    },
    fullName: {
        type: 'string',
        required: true,
    },
    token: {
        type: 'string',
        required: false
    },
    points: {
        type: 'number',
    },
    userType: {
        type: 'string',
        enum: ['admin', 'regular'],
        default: 'regular'
    },
    cars: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Car',
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);