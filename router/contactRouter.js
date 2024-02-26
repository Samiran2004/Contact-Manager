const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    createContact,
    getContactByID,
    updateContact,
    deleteContact
} = require('../controller/contactController')

//@desc:-Create a contact
//@route:- http://192.168.1.4:8000/api/contacts/create-contact
router.post('/create-contact', createContact);

//@desc:-Get all contact
//@route:- http://192.168.1.4:8000/api/contacts/get-all-contacts
router.get('/get-all-contacts', getAllContacts);

//@desc:-Get a specific contact
////@route:- http://192.168.1.4:8000/api/contacts/:id
router.get('/:id', getContactByID);

//@desc:-Update a specific contact by id
////@route:- http://192.168.1.4:8000/api/contacts/:id
router.put('/update/:id', updateContact);

//@desc:-Delete a contact
////@route:- http://192.168.1.4:8000/api/contacts/delete/:id
router.delete('/delete/:id', deleteContact);

module.exports = router;