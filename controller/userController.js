const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@route:- POST   /api/user/register
const registerUser = (async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(404).send({
            status: "Failed",
            message: "All feilds are required."
        });
    } else {
        const check = await User.findOne({ email: email });
        if (!check) {
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                const createdUser = await User.create({ firstname: firstname, lastname: lastname, email: email, password: hashedPassword });
                const newUser = { _id: createdUser._id, firstname: createdUser.firstname, lastname: createdUser.lastname, email: createdUser.email };
                res.status(201).send({
                    status: "Success",
                    message: "New user created.",
                    data: newUser
                });
            } catch (error) {
                res.status(400).send({
                    status: "Failed",
                    message: "User registration failed."
                });
            }
        } else {
            res.status(301).send({
                status: "Failed",
                message: "User with the provided email already exists."
            });
        }
    }
});

//@route:- POST  /api/user/login
const loginUser = (async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            status: "Failed",
            message: "All feilds are required."
        });
    } else {
        const checkUser = await User.findOne({ email: email });
        if (!checkUser) {
            res.status(404).send({
                status: "Failed",
                message: "User not found in database."
            });
        } else {
            const checkPassword = await bcrypt.compare(password, checkUser.password);
            if (checkPassword == true) {
                const token = jwt.sign({ id: checkUser._id, firstname: checkUser.firstname, lastname: checkUser.lastname, email: checkUser.email }, process.env.JWT_KEY, { expiresIn: "10m" });
                res.status(200).send({
                    token
                });
            } else {
                res.status(404).send({
                    status: "Failed",
                    message: "Invalid Password."
                });
            }
        }
    }
});

const currentUser = (async (req, res) => {
    res.status(200).send({
        status:"Success",
        data: req.user
    });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}