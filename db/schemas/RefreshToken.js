const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    revoked: Date,
    replacedByToken: String
});

refreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

refreshTokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

refreshTokenSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);