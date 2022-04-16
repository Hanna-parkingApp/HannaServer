const userService = require('../../Services/user.service');
require('dotenv').config();
const mongoose = require('mongoose');


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

});

afterAll( done => {
    mongoose.connection.close();
    done();
});

describe('create user', () => {
    test('return new User', async () => {
        const newUser = await userService.createUser({
            email: 'test@example.com',
            password: 'testtest',
            fullName: 'test',
        });
        expect(newUser).toBeTruthy();
    });

    test('should return flase, as email is already in use', async () => {
        const newUser = await userService.createUser({ 
            email: 'test@example.com',
            password: 'testtest',
            fullName: 'test',
        });
        expect(newUser).toBeFalsy();
    });

    test('should return flase, as password too short', async () => {
        const newUser = await userService.createUser({ 
            email: 'test1@example.com',
            password: 'testte',
            fullName: 'test',
        });
        expect(newUser).toBeFalsy();
    });
});

describe('get user', () => {
    test('should return user', async () => {
        const user = await userService.getUser({email: 'test@example.com'});
        expect(user).toEqual(
            expect.arrayContaining([
              expect.objectContaining({email: 'test@example.com'})
            ])
        );
    });

    test('should return all users', async () => {
        const user = await userService.getUser({});
        expect(user).toBeTruthy();
    });

    test('should return false', async () => {
        const user = await userService.getUser({email: 'test1@example.com'});
        expect(user).toStrictEqual([]);
    });
});

describe('Update user', () => {
    test('should update user', async () => {
        const updatedUser = await userService.updateUser(
            {email: 'test@example.com'},
            {fullName: 'toster'});
            
        expect(updatedUser).toEqual(
            expect.objectContaining({fullName: 'toster'})
        );
    });

    test('should return false, as user doesnt exists', async () => {
        const updatedUser = await userService.updateUser(
            {email: 'test1@example.com'},
            {fullName: 'toster'}
        );
        
        expect(updatedUser).toBeFalsy();
    })
});

describe('deleteUser', () => {
    test('Should return deleted user', async () => {
        const deleteUser = await userService.deleteUser({email: 'test@example.com'});
        expect(deleteUser).toBeTruthy();
    });

    test('Should return false, as user doesnt exists', async () => {
        const deletedUser = await userService.deleteUser({email: 'test1@example.com'})

        expect(deletedUser).toBeFalsy();
    })
});