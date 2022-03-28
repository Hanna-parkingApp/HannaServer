const mongoose = require('mongoose');
const User = require('../db/schemas/User');
const Car = require('../db/schemas/Car');
const LocationValue = require('../db/schemas/LocationValue');
const Navigation = require('../db/schemas/Navigation');
const ParkingTransaction = require('../db/schemas/ParkingTransaction');
const UserParking = require('../db/schemas/UserParking');

async function dbTest() {
    const userId = await User.findOne({email: 'test@example.com'}).lean().exec();
    const carId = await Car.findOne({registrationNumber: '123'}).lean().exec();

    try {
        await Navigation.create({
            estimatedArrivalTime: '2',
            totalTime: '20',
            carLocation: 'here',
            distanceFromCar: 5,
            userId: userId._id
        })
    } catch (err) {
        console.log(`Error Creating Navigation instance \n${err}`);
    }

    try {
        await ParkingTransaction.create({
            timeStamp: new Date(),
            location: 's',
            sharingUser: userId._id,
            parkingUser: userId._id,
            carParked: carId._id
        })
    } catch (err) {
        console.log(`Error Creating ParkingTansaction instance \n${err}`);
    }

    try {
        await UserParking.create({
            userId: userId._id,
            type: 'get',
            location: 'ds',
            carParked: carId._id,
            timeStamp: new Date(),
        })
    } catch (err) {
        console.log(`Error Creating UserParking instance \n${err}`);
    }
}

module.exports = dbTest;