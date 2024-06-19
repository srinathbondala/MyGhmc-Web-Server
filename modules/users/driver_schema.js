// server.js

const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    sfiNumber: {
        type: Number,
        required: true
    },
    sat: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    driverId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})


// Create the Driver model
const Driver = mongoose.model('driver_details', driverSchema);

module.exports = Driver