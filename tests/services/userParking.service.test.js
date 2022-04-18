const userParkingService = require('../../Services/userParking.service');
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

describe('create UserParking', () => {
    test('return new UserParking', async () => {
        const newUserParking = await userParkingService.createUserParking({
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            type: 'share',
            location: 'test',
            carParked: new mongoose.Types.ObjectId('61f51a6fc0a8c962096c810e'),
            timeStamp: new Date(),
        });
        expect(newUserParking).toBeTruthy();
    });

    test('should return flase, as type can only be share/get', async () => {
        const newUserParking = await userParkingService.createUserParking({ 
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            type: 'bla',
            location: 'test',
            carParked: new mongoose.Types.ObjectId('61f51a6fc0a8c962096c810e'),
            timeStamp: new Date(),
        });
        expect(newUserParking).toBeFalsy();
    });

    test('should return flase, as all fields are required', async () => {
        const newUserParking = await userParkingService.createUserParking({ 
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            type: 'share',
            carParked: new mongoose.Types.ObjectId('61f51a6fc0a8c962096c810e'),
            timeStamp: new Date(),
        });
        expect(newUserParking).toBeFalsy();
    });
});

describe('get UserParking', () => {
    test('should return UserParking', async () => {
        const userParking = await userParkingService.getUserParking({
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });

        expect(userParking).toEqual(
            expect.arrayContaining([
              expect.objectContaining({userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')})
            ])
        );
    });

    test('should return all UserParkings', async () => {
        const userParking = await userParkingService.getUserParking({});
        expect(userParking).toBeTruthy();
    });

    test('should return false', async () => {
        const userParking = await userParkingService.getUserParking({
            userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')
        });
        expect(userParking).toStrictEqual([]);
    });
});

describe('Update UserParking', () => {
    test('should update UserParking', async () => {
        const updatedUserParking = await userParkingService.updateUserParking(
            {userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')},
            {location: 'toster'}
        );
            
        expect(updatedUserParking).toEqual(
            expect.objectContaining({location: 'toster'})
        );
    });

    test('should return false, as user doesnt exists', async () => {
        const updatedUserParking = await userParkingService.updateUserParking(
            {userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')},
            {location: 'toster'}
        );
        
        expect(updatedUserParking).toBeFalsy();
    })
});

describe('delete UserParking', () => {
    test('Should return deleted UserParking', async () => {
        const deleteUserParking = await userParkingService.deleteUserParking({
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(deleteUserParking).toBeTruthy();
    });

    test('Should return false, as UserParking doesnt exists', async () => {
        const deletedUserParking = await userParkingService.deleteUserParking({
            userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')
        })

        expect(deletedUserParking).toBeFalsy();
    })
});