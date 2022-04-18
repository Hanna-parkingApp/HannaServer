const parkingTransactionService = require('../../Services/parkingTransaction.service');
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

describe('create ParkingTransaction', () => {
    test('return new ParkingTransaction', async () => {
        const newParkingTransaction = await parkingTransactionService.createParkingTransaction({
            timeStamp: new Date(),
            location: 'bla',
            sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            parkingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            carParked: new mongoose.Types.ObjectId('61f51a6fc0a8c962096c810e')
        });
        expect(newParkingTransaction).toBeTruthy();
    });

    test('should return flase, as all fields are required', async () => {
        const newParkingTransaction = await parkingTransactionService.createParkingTransaction({ 
            TimeStamp: new Date(),
            location: 'bla',
            sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
            parkingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b'),
        });
        expect(newParkingTransaction).toBeFalsy();
    });
});

describe('get ParkingTransaction', () => {
    test('should return ParkingTransaction', async () => {
        const parkingTransaction = await parkingTransactionService.getParkingTransaction({
            sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(parkingTransaction).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                  sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
                })
            ])
        );
    });

    test('should return all parkingTransactions', async () => {
        const parkingTransaction = await parkingTransactionService.getParkingTransaction({});
        expect(parkingTransaction).toBeTruthy();
    });

    test('should return false', async () => {
        const parkingTransaction = await parkingTransactionService.getParkingTransaction({
            sharingUser: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')
        });
        expect(parkingTransaction).toStrictEqual([]);
    });
});

describe('Update ParkingTransaction', () => {
    test('should update ParkingTransaction', async () => {
        const updatedParkingTransaction = await parkingTransactionService.updateParkingTransaction(
            {sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')},
            {location: 'http'}
        );
            
        expect(updatedParkingTransaction).toEqual(
            expect.objectContaining({location: 'http'})
        );
    });

    test('should return false, as parking transaction doesnt exists', async () => {
        const updatedParkingTransaction = await parkingTransactionService.updateParkingTransaction(
            {sharingUser: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')},
            {location: 'http'}
        );
        
        expect(updatedParkingTransaction).toBeFalsy();
    })
});

describe('delete Car', () => {
    test('Should return deleted Car', async () => {
        const deleteParkingTransaction = await parkingTransactionService.deleteParkingTransaction({
            sharingUser: new mongoose.Types.ObjectId('62514a3edff1c22a400ce44b')
        });
        expect(deleteParkingTransaction).toBeTruthy();
    });

    test('Should return false, as Car doesnt exists', async () => {
        const deleteParkingTransaction = await parkingTransactionService.deleteParkingTransaction({
            sharingUser: new mongoose.Types.ObjectId('62514a3ed123c22a400ce44b')
        })

        expect(deleteParkingTransaction).toBeFalsy();
    })
});