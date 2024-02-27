const express = require('express');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controller/userController');
const validatToken = require('../middleware/authMiddleware');
const router = express.Router();

//@desc:- Signup a new user
//@route:- /api/user/register
router.post('/register', registerUser);

//@desc:- Login a user
//@route:- /api/user/login
router.post('/login', loginUser);

//@desc:- Current user detials
//@route:- /api/user/current-user-detials
router.get('/current-user-detials',validatToken, currentUser);

module.exports = router;