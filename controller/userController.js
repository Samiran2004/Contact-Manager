const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
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
                res.status(201).send({
                    status: "Success",
                    message: "New user created.",
                    data: createdUser
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

const loginUser = (async (req, res) => {
    res.status(200).send("Login User");
});

const currentUser = (async (req, res) => {
    res.status(200).send("Current user.");
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}