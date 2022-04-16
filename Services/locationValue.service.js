const LocationValue = require('../db/schemas/LocationValue');

async function createLocationValue(details) {
    try{
        return await LocationValue.create(details)
    }
    catch(err) {
        console.error(err);
    }

    return false;
}

async function getLocationValue(filter = {}) {
    try {
        const locationValue = await LocationValue.find(filter).exec();
        return locationValue;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function updateLocationValue(filter, newDetails) {
    try {
        const updatedLocationValue = await LocationValue.findOneAndUpdate(filter, newDetails, {new: true}).exec();
        return updatedLocationValue;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function deleteLocationValue(filter) {
    try {
        const deletedLocationValue = await LocationValue.findOneAndDelete(filter).exec();
        if (!deletedLocationValue) {
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
    createLocationValue,
    getLocationValue,
    updateLocationValue,
    deleteLocationValue
}