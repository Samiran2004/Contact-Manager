const express = require('express');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controller/userController');
const validatToken = require('../middleware/authMiddleware');
const router = express.Router();

//@desc:- Signup a new user
//@route:- http://192.168.1.4:8000/api/user/register
router.post('/register', registerUser);

//@desc:- Login a user
//@route:- http://192.168.1.4:8000/api/user/login
router.post('/login', loginUser);

//@desc:- Current user detials
//@route:- http://192.168.1.4:8000/api/user/current-user-detials
router.get('/current-user-detials',validatToken, currentUser);

module.exports = router;