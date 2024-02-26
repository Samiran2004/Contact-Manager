const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;