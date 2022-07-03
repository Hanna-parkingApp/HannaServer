const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = {
    email:"tests@gmail.com",
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

describe("Generate recovery code", () => {
    it("return status code 404 with email dosen't exist message", async () => {
        const res = await request(baseUrl)
            .post('/generateRecoveryCode')
            .send({email: "no email"});

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("email dosen't exist");
    });

    it("return status code 200 with recovery code sent successfully message", async () => {
        const res = await request(baseUrl)
            .post('/generateRecoveryCode')
            .send(userInput);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("recovery code sent successfully");
    });
});

describe("Verify recovery code", () => {
    it("return status code 200 with recovery code verified message", async () => {
        const recoveryCode = (await userModel.findOne({email: userInput.email}).exec()).password;
        const res = await request(baseUrl)
            .post('/verifyRecoveryCode')
            .send({email: userInput.email, password: recoveryCode});

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("recovery code verified");
    });

    it("return status code 400 with recovery code dosent match message", async () => {
        const res = await request(baseUrl)
            .post('/verifyRecoveryCode')
            .send({email: userInput.email, password: "recoveryCode"});

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("recovery code dosent match");
    });
});

describe("Change Password", () => {
    it("return status code 200 with Password changed successfully message", async () => {
        const res = await request(baseUrl)
            .post('/changePassword')
            .send({email: userInput.email, password: "recoveryCode"});

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Password changed successfully");
    });

    it("return status code 500 with Password change failed message", async () => {
        await userModel.deleteOne({email: testUser.email}).exec();

        const res = await request(baseUrl)
            .post('/changePassword')
            .send({email: userInput.email, password: "recoveryCode"});

        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual("Password change failed");
    });
})