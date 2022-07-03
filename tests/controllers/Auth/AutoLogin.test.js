// this file will also check the auth middleware since the autoLogin route is fully dependent on the auth middleware.
const request = require('supertest');
const mongoose = require('mongoose');
const userModel = require('../../../db/schemas/User');
const carModel = require('../../../db/schemas/Car');
const baseUrl = "http://localhost:3000";

const userInput = {
    refreshToken: "",
    accessToken: ""
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

    const regRes = await request(baseUrl)
            .post('/register')
            .send(testUser);

    userInput.accessToken = regRes.body.tokens.accessToken;
});

afterAll(async () => {
    await userModel.deleteOne({email: testUser.email}).exec();
    await carModel.deleteOne({registrationNumber: testUser.carNumber}).exec();

    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
})


describe('Auth Middleware', () => {
    it('should return status code 400 with Token is required', async () => {
        const res = await request(baseUrl)
            .get('/autoLogin')
            .set('x-access-token', userInput.accessToken)
            .set('x-refresh-token', userInput.refreshToken);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual("Token is required");
    });

    it('should return status code 200 with User with token not found', async () => {
        const loginRes = await request(baseUrl)
            .post('/login')
            .send({email: userInput.email, password: userInput.password});
        userInput.refreshToken = (await userModel.findOne({email: testUser.email})).token;
        console.log(userInput);
        const res = await request(baseUrl)
            .get('/autoLogin')
            .set('x-access-token', userInput.accessToken)
            .set('x-refresh-token', "fghjkl");
            
        console.log(res);
        expect(res.statusCode).toEqual(200);
    });
})
/* with headers
    await request(baseUrl)
            .post('/register')
            .set('header-key', 'value')
            .send(testUser);

*/