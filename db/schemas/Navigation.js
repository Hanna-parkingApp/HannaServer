const mongoose = require('mongoose');
//const User = require('./User')

const NavigationSchema = mongoose.Schema({
    estimatedArrivalTime : {
        type: 'string',
        required: true
    },
    totalTime: {
        type: 'string',
        required: true
    },
    carLocation: {
        type: 'string',
        required: true
    },
    distanceFromCar : {
        type: 'number',
        min: 0,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Navigation', NavigationSchema)