// server.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})


// Create the Admin model
const Admin = mongoose.model('admin_details', userSchema);

module.exports = Admin