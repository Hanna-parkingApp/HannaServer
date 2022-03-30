const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/Auth/Register');
const loginController = require('../Controllers/Auth/Login');

router.get('/', (req, res) => {res.status(200).json('hello')})

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;