const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

exports.connect = async () => {
    await mongoose.connect(MONGO_URI)
        .then(async () => {
            console.log('DB connection established');
        })
        .catch((err) => {
            console.log("DB connection failed. Exiting...");
            console.error(err);
            process.exit(1);
        })
}
