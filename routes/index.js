const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/Auth/Login');
const parkingSearcherController = require('../Controllers/App/ParkingSearcherController');
const registerController = require('../Controllers/Auth/Register');
const {generateRecoveryCode, verifyRecoveryCode, changePassword} = require('../Controllers/Auth/RecoverPassword');
const shareParkController = require('../Controllers/App/ShareParkController');
const updateProfileController = require('../Controllers/App/UpdateProfileController');
const checkParkingStatusController = require('../Controllers/App/CheckParkingStatusController');
const navigationController = require('../Controllers/App/NavigationController');
const setParkingStatusController = require('../Controllers/App/setParkingStatusController');
const updateUserPoints = require('../Controllers/App/pointsController');

const auth = require('../Middleware/Auth');

router.get('/', auth, (req, res) => {res.status(200).json('hello')})

router.post('/changePassword', changePassword)
router.post('/find-parks', parkingSearcherController);
router.post('/generateRecoveryCode', generateRecoveryCode);
router.post('/login', loginController);
router.post('/navigation-updater', navigationController);
router.post('/parking-status', checkParkingStatusController);
router.post('/update-user-points', updateUserPoints);
router.post('/register', registerController);
router.post('/share-parks', shareParkController);
router.post('/update-profile', updateProfileController);
router.post('/update-parking-status', setParkingStatusController);
router.post('/verifyRecoveryCode', verifyRecoveryCode);


module.exports = router;