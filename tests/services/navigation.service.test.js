const navigationService = require('../../Services/navigation.service');
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

describe('create Navigation', () => {

    test('return new Navigation', async () => {
        const newNavigation = await navigationService.createNavigation({
            estimatedArrivalTime: "f",
            totalTime: "t",
            carLocation: "here",
            distanceFromCar: 2,
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(newNavigation).toBeTruthy();
    });

    test('return false', async () => {
        const newNavigation = await navigationService.createNavigation({
            estimatedArrivalTime: "f",
            totalTime: "t",
            carLocation: "here",
            distanceFromCar: 2,
        });
        expect(newNavigation).toBeFalsy();
    })
});

describe('get Navigation', () => {

    test('should return Navigation', async () => {
        const navigation = await navigationService.getNavigation({
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(navigation).toEqual(
            expect.arrayContaining([
              expect.objectContaining({userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')})
            ])
        );
    });

    test('should return all navigations', async () => {
        const navigation = await navigationService.getNavigation({});
        expect(navigation).toBeTruthy();
    });

    test('should return false', async () => {
        const navigation = await navigationService.getNavigation({
            userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b'),
        });
        expect(navigation).toStrictEqual([]);
    });
});

describe('Update navigation', () => {
    test('should update navigation', async () => {
        const updatedNavigation = await navigationService.updateNavigation(
            {userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')},
            {distanceFromCar: 10});
            
        expect(updatedNavigation).toEqual(
            expect.objectContaining({distanceFromCar: 10})
        );
    });

    test('should return false, as user doesnt exists', async () => {
        const updatedNavigation = await navigationService.updateNavigation(
            {userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')},
            {distanceFromCar: 10}
        );
        
        expect(updatedNavigation).toBeFalsy();
    })
});

describe('delete navigation', () => {
    test('Should return deleted navigation', async () => {
        const deleteNavigation = await navigationService.deleteNavigation({
            userId: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(deleteNavigation).toBeTruthy();
    });

    test('Should return false, as navigation doesnt exists', async () => {
        const deletedNavigation = await navigationService.deleteNavigation({
            userId: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')
        });

        expect(deletedNavigation).toBeFalsy();
    })
});