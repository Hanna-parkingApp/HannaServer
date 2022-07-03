const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = {
    token: undefined,
    pointsModifier: undefined
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
});

describe('points controller tests', () => {
    it('should reutrn status code 400, with all parameters required message', async () => {
        const res = await request(baseUrl)
            .post('/update-user-points')
            .send(userInput);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("all parameters required");
    });

    it('should reutrn status code 404, with user not found message', async () => {
        userInput.token = "xcvbnm";
        userInput.pointsModifier = 1
        const res = await request(baseUrl)
            .post('/update-user-points')
            .send(userInput);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("user not found");
    });

    it('should reutrn status code 400, with not enough points to update message', async () => {
        userInput.token = (await userModel.findOne({email: testUser.email})).token;
        userInput.pointsModifier = -11;
        const res = await request(baseUrl)
            .post('/update-user-points')
            .send(userInput);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("not enough points to update");
    });

    it('should reutrn status code 200, with user points updated successfully message', async () => {
        userInput.token = (await userModel.findOne({email: testUser.email})).token;
        userInput.pointsModifier = -1;
        const res = await request(baseUrl)
            .post('/update-user-points')
            .send(userInput);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("user points updated successfully");
    });
})
