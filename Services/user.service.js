const mongoose = require('mongoose');
const User = require('../db/schemas/User');

async function createUser(details) {
    try{
        return await User.create(details)
    }
    catch(err) {
        console.error(err);
    }

    return false;
}

async function getUser(filter = {}) {
    try {
        const user = await User.find(filter).exec();
        return user;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function updateUser(filter, newDetails) {
    try {
        const updatedUser = await User.findOneAndUpdate(filter, newDetails, {new: true}).exec();
        return updatedUser;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function deleteUser(filter) {
    try {
        const deletedUser = await User.findOneAndDelete(filter).exec();
        if (!deletedUser) {
            return false;
        }
        return true;
    }
    catch(err) {
        console.error(err);
    }
    return false;
}

module.exports = { 
    createUser,
    getUser,
    updateUser,
    deleteUser
}