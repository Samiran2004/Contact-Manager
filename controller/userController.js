const mongoose = require('mongoose');
const registerUser = ((req, res) => {
    res.status(200).send("New contact");
});

const loginUser = (async (req, res) => {
    res.status(200).send("Login User");
});

const currentUser = (async(req,res)=>{
    res.status(200).send("Current user.");
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}