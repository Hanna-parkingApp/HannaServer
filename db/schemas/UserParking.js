const mongoose = require('mongoose');

const userParkingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    generalLocation: {
        type: 'string',
        required: true,
    },
    specificLocation: {
        type: 'string',
        required: true,
    },
    // carParked: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Car',
    //     required: true
    // },
    timeStamp: {
        type: 'Date',
        required: true
    }
});

module.exports = mongoose.model('UserParking', userParkingSchema)