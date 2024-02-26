const mongoose = require('mongoose');
const Contact = require('../models/contactModel')

const createContact = async (req, res) => {
    const { name, email, phonenumber } = req.body;
    if (!name || !email || !phonenumber) {
        res.status(400).send({
            status: "Bad Request",
            message: "All Fields are required"
        });
    } else {
        const check = await Contact.findOne({ $or: [{ email: email }, { phonenumber: phonenumber }] });
        if (!check) {
            const newContact = await Contact.create({
                name: name,
                email: email,
                phonenumber: phonenumber
            });
            res.status(201).send({
                status: "Success",
                message: "New contact created.",
                data: newContact
            });
        } else {
            res.status(301).send({
                status: "Failed",
                message: "Contact with the provided email or phone number already exists."
            });
        }
    }
};


const getAllContacts = (async (req, res) => {
    try {
        const allContatcs = await Contact.find();
        res.status(200).send(allContatcs);
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Database error."
        });
    }
});

const getContactByID = (async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).send({
            status: "Success",
            data: contact
        });
    } catch (error) {
        res.status(404).send({
            status: "Failed",
            message: "Contact with the id is not exists."
        });
    }
});

const updateContact = (async (req, res) => {
    try {
        const check = await Contact.findById(req.params.id);
        if (!check) {
            res.status(301).send({
                status: "Failed",
                message: "Contact with the provided id is not exists."
            });
        } else {
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).send({
                status: "Success",
                message: "Contact updated",
                updatedContactData: updatedContact
            });
        }
    } catch (error) {
        res.status(301).send({
            status: "Failed",
            message: "Contact with the provided id is not exists."
        });
    }
});

const deleteContact = (async(req, res) => {
    const check = await Contact.findById(req.params.id);
    if(!check){
        res.status(301).send({
            status: "Failed",
            message: "Contact with the provided id is not exists."
        });
    }else{
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).send({
            status:"Success",
            message:"Success",
            deleteContactData: deletedContact
        });
    }
});


module.exports = {
    getAllContacts,
    createContact,
    getContactByID,
    updateContact,
    deleteContact
}