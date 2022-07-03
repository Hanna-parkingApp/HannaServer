const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = {
    email:"tests@gmail.com",
	password:"blablabla"
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

describe("Login", () => {
    it("return status code 400 with missing fields message", async () => {
        const res = await request(baseUrl)
            .post('/login')
            .send({email: userInput.email});

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual("Failed to login, Please enter email and password");
    });

    it("return status code 400 with Failed to login, Wrong Password message", async () => {
        const res = await request(baseUrl)
            .post('/login')
            .send({email: userInput.email, password: 'wrong password'});

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Failed to login, Wrong Password");
    });

    it("return status code 400 with Failed to login, User not found message", async () => {
        const res = await request(baseUrl)
            .post('/login')
            .send({email: "no email", password: 'wrong password'});

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("Failed to login, User not found");
    });

    it("return status code 200 with login successful message", async () => {
        const res = await request(baseUrl)
            .post('/login')
            .send(userInput);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("login successful");
    });
})