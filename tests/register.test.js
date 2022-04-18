const request = require('supertest');
const app = require("../index");

describe('No Access for unauth to /', () => {
    test('should respond with status code 400', async () => {
        const response = await request(app).get('/GET');
        expect(response.statusCode).toEqual(400);
    })
})