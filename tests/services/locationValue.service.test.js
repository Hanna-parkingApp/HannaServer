const LocationValueService = require('../../Services/locationValue.service');
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

describe('create LocationValue', () => {
    test('return new LocationValue', async () => {
        const newLocationValue = await LocationValueService.createLocationValue({
            city: 'New York',
            value: 8
        });
        expect(newLocationValue).toBeTruthy();
    });
});

describe('get LocationValue', () => {
    test('should return LocationValue', async () => {
        const locationValue = await LocationValueService.getLocationValue({city: 'New York'});
        expect(locationValue).toEqual(
            expect.arrayContaining([
              expect.objectContaining({city: 'New York'})
            ])
        );
    });

    test('should return all LocationValues', async () => {
        const locationValue = await LocationValueService.getLocationValue({});
        expect(locationValue).toBeTruthy();
    });

    test('should return false', async () => {
        const locationValue = await LocationValueService.getLocationValue({city: 'New'});
        expect(locationValue).toStrictEqual([]);
    });
});

describe('Update LocationValue', () => {
    test('should update LocationValue', async () => {
        const updatedLocationValue = await LocationValueService.updateLocationValue(
            {city: 'New York'},
            {value: 10});
            
        expect(updatedLocationValue).toEqual(
            expect.objectContaining({value: 10})
        );
    });

    test('should return false, as location value doesnt exists', async () => {
        const updatedLocationValue = await LocationValueService.updateLocationValue(
            {city: 'New'},
            {value: 10}
        );
        
        expect(updatedLocationValue).toBeFalsy();
    })
});

describe('delete LocationValue', () => {
    test('Should return deleted LocationValue', async () => {
        const deleteLocationValue = await LocationValueService.deleteLocationValue({city: 'New York'});
        expect(deleteLocationValue).toBeTruthy();
    });

    test('Should return false, as LocationValue doesnt exists', async () => {
        const deletedLocationValue = await LocationValueService.deleteLocationValue({city: 'New'})

        expect(deletedLocationValue).toBeFalsy();
    })
});