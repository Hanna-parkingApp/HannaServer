const mongoose = require('mongoose');
//const User = require('./User');
const Car = require('./Car');

const parkingTransactionSchema = mongoose.Schema({
    timeStamp: {
        type: 'Date',
        required: true
    },
    location: {
        type: 'String',
        required: true
    },
    sharingUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    parkingUser: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    carParked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    }
});

module.exports = mongoose.model('parkingTransaction', parkingTransactionSchema);