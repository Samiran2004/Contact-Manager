const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    createContact,
    getContactByID,
    updateContact,
    deleteContact
} = require('../controller/contactController');
const validatToken = require('../middleware/authMiddleware');

//@desc:-Create a contact
//@route:- /api/contacts/create-contact
router.post('/create-contact',validatToken, createContact);

//@desc:-Get all contact
//@route:- /api/contacts/get-all-contacts
router.get('/get-all-contacts',validatToken, getAllContacts);

//@desc:-Get a specific contact
////@route:- /api/contacts/:id
router.get('/:id',validatToken, getContactByID);

//@desc:-Update a specific contact by id
////@route:- /api/contacts/update/:id
router.put('/update/:id', updateContact);

//@desc:-Delete a contact
////@route:- /api/contacts/delete/:id
router.delete('/delete/:id',validatToken, deleteContact);

module.exports = router;