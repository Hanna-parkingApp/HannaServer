const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/Auth/Register');
const loginController = require('../Controllers/Auth/Login');
const parkingSearcherController = require('../Controllers/App/ParkingSearcherController');
const auth = require('../Middleware/Auth');

router.get('/', auth, (req, res) => {res.status(200).json('hello')})
// router.get('/share-park')

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/find-parks', parkingSearcherController);
router.post('/share-park', parkingSearcherController);


module.exports = router;