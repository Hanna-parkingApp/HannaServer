const app = require('/Users/shovalgibly/Downloads/HannaServer/index.js') 
const User = require('../../db/schemas/User');
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('/Users/shovalgibly/Downloads/HannaServer/index.js')

const email = 'test@a.com'
const pwd = '123456'

beforeAll(done=>{
    User.remove({'email' : email}, (err)=>{
        done()
    })
})

afterAll(done=>{
    User.remove({'email' : email}, (err)=>{
        mongoosse.connection.close()
        done()
    })
})


describe("Register", () => { 
    test("Add new user", async () => {
     const response = await request (app).post("/auth/register").send( { 
         'email': email,
        'password': pwd,
        'fullName': fullName
     }) 
        expect (response.statusCode). toEqual(200);
     })});



     let accessToken = '' 
     let refreshToken = '' 
     describe("Login", () => {
          test("Login user", async () => {    
            const response = await request (app) .post("/auth/login").send( {
                 'email': email,
                'password': pwd
             })
                 expect (response.statusCode).toEqual (200);
                accessToken = response.body.accessToken 
                refreshToken = response.body.refreshToken 
                expect (accessToken). not. toEqual(null); expect (refreshToken).not.toEqual(null); })});