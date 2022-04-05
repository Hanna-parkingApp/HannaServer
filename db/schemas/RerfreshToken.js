const mongoose = require('mongoose');

const refreshToken = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    revoked: Date,
    replacedByToken: String
});

refreshToken.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

refreshToken.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

refreshToken.set('toJSON', {
    virtuals: true,
})