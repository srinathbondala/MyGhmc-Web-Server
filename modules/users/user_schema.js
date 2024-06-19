const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    sfaNumber: {
        type: Number,
        required: true,
    },


    colonyName: {
        type: String,
        required: true,
    },
    plotNo: {
        type: String,
        required: true
    },
    roadNumber: {
        type: Number,
        required: true
    },
    totalUnits: {
        type: Number,
        required: true
    },
    commercialUnits: {
        type: Number,
        required: true
    },
    residentialUnits: {
        type: Number,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    circle: {
        type: Number,
        required: true
    },
    ward: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    latitudeAndLongitude: {
        type: String,
        required: true,
    },
    qrCodeData: {
        type: String,
        required: true,
    },
    isWasteCollected: {
        type: Boolean,
        required: false,
    },
    driverSat: {
        type: String,
        required: false,
    },
    wasteCollectedTime: {
        type: String,
        required: false,
    },

})

module.exports = mongoose.model('user_details', userSchema);