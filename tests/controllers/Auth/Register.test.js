const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = { 
    email:"tests@gmail.com",
	password:"blablabla",
	fullName:"aviv bla",
	carNumber: "8",
	carMaker:"1",
	carModel:"1",
	carColor:"1"
}

const userInput2 = { 
    email:"tests1@gmail.com",
	password:"blablabla",
	fullName:"aviv bla",
	carNumber: "8",
	carMaker:"1",
	carModel:"1",
	carColor:"1"
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

    await userModel.deleteOne({email: userInput.email}).exec();
    await carModel.deleteOne({registrationNumber: userInput.carNumber}).exec();
    await userModel.deleteOne({email: userInput2.email}).exec();
    await carModel.deleteOne({registrationNumber: userInput2.carNumber}).exec();
});

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await userModel.deleteOne({email: userInput.email}).exec();
    await carModel.deleteOne({registrationNumber: userInput.carNumber}).exec();
    await userModel.deleteOne({email: userInput2.email}).exec();
    await carModel.deleteOne({registrationNumber: userInput2.carNumber}).exec();
    mongoose.connection.close()
})

describe("register", () => {
    it("should return status code 200", async () => {
        const res = await request(baseUrl)
            .post('/register')
            .send(userInput);

            expect(res.statusCode).toEqual(200);
    });

    it("should return status code 400", async () => {
        const res = await request(baseUrl)
        .post('/register')
        .send(userInput);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Email already in use")
    });

    it("should return status code 400", async () => {
        const missingFieldsUser = userInput;
        missingFieldsUser.carColor = undefined;

        const res = await request(baseUrl)
        .post('/register')
        .send(missingFieldsUser);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("All Fields must be provided")

    });

    it("should return status code 500", async () => {
        const res = await request(baseUrl)
        .post('/register')
        .send(userInput2);

        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual("Error while uploading new car to db")

    });
})