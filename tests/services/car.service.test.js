const carService = require('../../Services/car.service');
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

describe('create car', () => {
    test('return new car', async () => {
        const newCar = await carService.createCar({
            registrationNumber: '123656',
            make: 'testtest',
            model: 'test',
            color: 'primary',
        });
        expect(newCar).toBeTruthy();
    });

    test('should return flase, as registration number is already in use', async () => {
        const newCar = await carService.createCar({ 
            registrationNumber: '123656',
            make: 'testtest',
            model: 'test',
            color: 'primary',
        });
        expect(newCar).toBeFalsy();
    });

    test('should return flase, as all fields are required', async () => {
        const newCar = await carService.createCar({ 
            registrationNumber: '1236567',
            model: 'test',
            color: 'primary',
        });
        expect(newCar).toBeFalsy();
    });
});

describe('get car', () => {
    test('should return car', async () => {
        const car = await carService.getCar({registrationNumber: '123656'});
        expect(car).toEqual(
            expect.arrayContaining([
              expect.objectContaining({registrationNumber: '123656'})
            ])
        );
    });

    test('should return all cars', async () => {
        const car = await carService.getCar({});
        expect(car).toBeTruthy();
    });

    test('should return false', async () => {
        const car = await carService.getCar({registrationNumber: '1236568'});
        expect(car).toStrictEqual([]);
    });
});

describe('Update car', () => {
    test('should update car', async () => {
        const updatedCar = await carService.updateCar(
            {registrationNumber: '123656'},
            {make: 'toster'});
            
        expect(updatedCar).toEqual(
            expect.objectContaining({make: 'toster'})
        );
    });

    test('should return false, as user doesnt exists', async () => {
        const updatedCar = await carService.updateCar(
            {registrationNumber: '1236568'},
            {make: 'toster'}
        );
        
        expect(updatedCar).toBeFalsy();
    })
});

describe('delete Car', () => {
    test('Should return deleted Car', async () => {
        const deleteCar = await carService.deleteCar({registrationNumber: '123656'});
        expect(deleteCar).toBeTruthy();
    });

    test('Should return false, as Car doesnt exists', async () => {
        const deletedCar = await carService.deleteCar({registrationNumber: '1236568'})

        expect(deletedCar).toBeFalsy();
    })
});