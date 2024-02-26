const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');
const router = express.Router();

//@desc:- Signup a new user
//@route:- http://192.168.1.4:8000/api/user/register
router.post('/register', registerUser);

//@desc:- Login a user
//@route:- http://192.168.1.4:8000/api/user/login
router.post('/login',loginUser);

module.exports = router;