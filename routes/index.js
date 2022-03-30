const express = require('express');
const router = express.Router();
const registerController = require('../Controllers/Auth/Register')

router.get('/', (req, res) => {res.status(200).json('hello')})

router.post('/register', registerController)

module.exports = router;