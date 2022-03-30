const mongoose = require('mongoose');

const locationValueSchema = mongoose.Schema({
    city: {
        type: 'string',
        required: true
    },
    value: {
        type: 'number',
        required: true,
        min: 1,
        default: 1
    }
});

module.exports = mongoose.model('LocationValue', locationValueSchema);