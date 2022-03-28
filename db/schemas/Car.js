const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    registrationNumber: {
        type: 'string',
        required: true,
        unique: true
    },
    make: {
        type: 'string',
        required: true,
    },
    model: { 
        type: 'string',
        required: true,
    },
    color: {
        type: 'string',
        required: true,
    }
});

module.exports = mongoose.model('car', carSchema);