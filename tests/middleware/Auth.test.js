const app = require('/Users/shovalgibly/Downloads/HannaServer/index.js') 
const User = require('../../db/schemas/User');
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('/Users/shovalgibly/Downloads/HannaServer/index.js')

const email = 'test@a.com'
const pwd = '123456'
const fullName= 'test'

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


describe('Testing Auth API',()=>{

    test('test registration',async ()=>{
        const response = await request(app).post('/register').send({
            'email' : email,
            'password':pwd,
            'fullName': fullName
        })
        expect(response.statusCode).toEqual(200)
    })

    test('test login',async ()=>{
        const response = await request(app).post('/login').send({
            'email' : email,
            'password':pwd        })
        expect(response.statusCode).toEqual(200)
    })
   
})