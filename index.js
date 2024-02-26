const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.DATABASE_URI).then(() => console.log("Database connected")).catch((err) => console.log("Database connection error."));

app.use('/api/contacts', require('./router/contactRouter'));
app.use('/api/user',require('./router/userRouter'));

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Server connection error.");
    } else {
        console.log(`Server connected on port ${process.env.PORT}`);
    }
});