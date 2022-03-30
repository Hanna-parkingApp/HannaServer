const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/Auth/Register');
const loginController = require('../Controllers/Auth/Login');
const auth = require('../Middleware/Auth');

router.get('/', auth, (req, res) => {res.status(200).json('hello')})

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;