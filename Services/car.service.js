const mongoose = require('mongoose');
const Car = require('../db/schemas/Car');

async function createCar(details) {
    try{
        return await Car.create(details)
    }
    catch(err) {
        console.error(err);
    }

    return false;}

async function getCar(filter = {}) {
    try {
        const car = await Car.find(filter).exec();
        console.log(car);
        return car;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function updateCar(filter, newDetails) {
    try {
        const updatedCar = await Car.findOneAndUpdate(filter, newDetails, {new: true}).exec();
        return updatedCar;
    }
    catch(err) {
        console.error(err);
    }
     return false;
}

async function deleteCar(filter) {
    try {
        const deletedCar = await Car.findOneAndDelete(filter).exec();
        if (!deletedCar) {
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
    createCar,
    getCar,
    updateCar,
    deleteCar,
}