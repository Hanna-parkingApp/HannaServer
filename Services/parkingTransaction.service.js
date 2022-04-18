const mongoose = require('mongoose');
const ParkingTransaction = require('../db/schemas/ParkingTransaction');

async function createParkingTransaction(details) {
    try{
        return await ParkingTransaction.create(details)
    }
    catch(err) {
        console.error(err);
    }

    return false;
}

async function getParkingTransaction(filter = {}) {
    try {
        const parkingTransaction = await ParkingTransaction.find(filter).exec();
        return parkingTransaction;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function updateParkingTransaction(filter, newDetails) {
    try {
        const updatedParkingTransaction = await ParkingTransaction.findOneAndUpdate(filter, newDetails, {new: true}).exec();
        return updatedParkingTransaction;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function deleteParkingTransaction(filter) {
    try {
        const deletedParkingTransaction = await ParkingTransaction.findOneAndDelete(filter).exec();
        if (!deletedParkingTransaction) {
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
    createParkingTransaction,
    getParkingTransaction,
    updateParkingTransaction,
    deleteParkingTransaction,
}