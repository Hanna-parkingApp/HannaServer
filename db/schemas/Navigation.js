const mongoose = require('mongoose');
//const User = require('./User')

const NavigationSchema = mongoose.Schema({
    shareUserId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
   searcherUserId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false
    },
    shareCurLoc: {
        type: 'string',
        required: true
    },
    searcherCurLoc: {
        type: 'string',
        required: false
    },
    parkLoc: {
        type: 'string',
        required: true
    },
    navigationStatus : {
        type: 'string',
        default: 'PENDING',
        required: true,
    },
});

module.exports = mongoose.model('Navigation', NavigationSchema)