const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/Auth/Register');
const loginController = require('../Controllers/Auth/Login');
const parkingSearcherController = require('../Controllers/App/ParkingSearcherController');
const shareParkController = require('../Controllers/App/ShareParkController');

const auth = require('../Middleware/Auth');

router.get('/', auth, (req, res) => {res.status(200).json('hello')})
// router.get('/share-park')

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/find-parks', parkingSearcherController);
router.post('/share-parks', shareParkController);


module.exports = router;