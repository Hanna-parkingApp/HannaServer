const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = { 
    latitude, 
    longitude, 
    generalLoc, 
    timeStamp, 
}

const testUser = {
    email:"tests@gmail.com",
	password:"blablabla",
	fullName:"aviv bla",
	carNumber: "8",
	carMaker:"1",
	carModel:"1",
	carColor:"1"
}

const testParking = {
    userId,
    address: "a",
    spacificLocation: "blabla",
    carParked,
    timeStamp: new Date()
}

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/hannaparks")
    .then(async () => {
        console.log('DB connection established');
    })
    .catch((err) => {
        console.log("DB connection failed. Exiting...");
        console.error(err);
        process.exit(1);
    })

    await request(baseUrl)
            .post('/register')
            .send(testUser);
});

afterAll(async () => {
    await userModel.deleteOne({email: testUser.email}).exec();
    await carModel.deleteOne({registrationNumber: testUser.carNumber}).exec();

    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
})
