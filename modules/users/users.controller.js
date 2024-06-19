const Admin = require('./admin_schema')
const helpers = require('../helpers');
const Driver = require('./driver_schema');
const User = require('./user_schema');

class UsersController {

    insertUser(req, response) {
        return Promise.resolve()
            .then(() => {
                const role = req.body.role;
                if (role === 'admin') {
                    return this.insertAdmin(req.body);
                } else if (role === 'driver') {
                    return this.insertDriver(req.body);
                } else if (role === 'user') {
                    return this.insertUserDetails(req.body);
                }
            })
            .then(() => {
                return response.status(200).json('User inserted successfully.');
            })
            .catch((error) => {
                response.status(500).json({
                    message: error && error.message || "Error occurred while inserting user details"
                })
            })


    }

    insertAdmin(params) {
        return Promise.resolve()
            .then(() => {
                return Admin.find({
                    email: params.email
                })
            })
            .then((userData) => {
                if (userData && userData.length) {
                    throw new Error('User already exists.');
                }
                return helpers.hashPassword(params.password)
            })
            .then((hashedPassword) => {
                const {
                    name,
                    email,
                    phone,
                    role
                } = params
                const newAdmin = new Admin({
                    name,
                    email,
                    phoneNumber: phone,
                    password: hashedPassword,
                    employeeId: this.getRandomString('ADMIN'),
                    role
                });
                return newAdmin.save()
            })
            .catch((error) => {
                return Promise.reject({
                    message: error && error.message || "Error occurred while inserting user details"
                })
            })
    }

    insertDriver(params) {
        return Promise.resolve()
            .then(() => {
                return Driver.find({
                    sfiNumber: params.sfiNumber
                })
            })
            .then((userData) => {
                if (userData && userData.length) {
                    throw new Error('User already exists.');
                }
                return helpers.hashPassword(params.password)
            })
            .then((hashedPassword) => {
                const {
                    name,
                    phone,
                    sfiNumber,
                    vehicleNumber,
                    role,
                    sat
                } = params
                const newDriver = new Driver({
                    name,
                    phoneNumber: phone,
                    sfiNumber,
                    vehicleNumber,
                    password: hashedPassword,
                    driverId: this.getRandomString('DRIVER'),
                    role,
                    sat
                });
                return newDriver.save()
            })
            .catch((error) => {
                return Promise.reject({
                    message: error && error.message || "Error occurred while inserting user details"
                })
            })
    }

    insertUserDetails(params) {
        return Promise.resolve()
            .then(() => {
                return User.find({
                    plotNo: params.plotNo
                })
            })
            .then((userData) => {
                if (userData && userData.length) {
                    throw new Error('User already exists.');
                }
                const {
                    name,
                    phoneNumber,
                    colonyName,
                    sfaNumber,
                    plotNo,
                    roadNumber,
                    totalUnits,
                    commercialUnits,
                    residentialUnits,
                    zone,
                    circle,
                    ward,
                    latitudeAndLongitude
                } = params
                const userId = this.getRandomString('USER')
                const qrCodeData = this.generateQRCodeData({
                    ...params,
                    userId
                })
                const newUser = new User({
                    name,
                    phoneNumber,
                    sfaNumber,
                    colonyName,
                    roadNumber,
                    plotNo,
                    totalUnits,
                    commercialUnits,
                    residentialUnits,
                    zone,
                    circle,
                    ward,
                    latitudeAndLongitude,
                    userId,
                    qrCodeData
                });
                return newUser.save()
            })
            .catch((error) => {
                return Promise.reject({
                    message: error && error.message || "Error occurred while inserting user details"
                })
            })
    }


    verifyLogin(req, response, role) {
        return Promise.resolve()
            .then(() => {
                if (role === 'admin') {
                    return Admin.findOne({
                        email: req.body.email
                    })
                } else if (role === 'driver') {
                    return Driver.findOne({
                        sat: req.body.sat
                    })
                } else if (role === 'user') {
                    return User.findOne({
                        phoneNumber: req.body.phoneNumber
                    })
                }

            })
            .then((userData) => {
                if (userData && role === 'user') {
                    return true
                }
                if (userData) {
                    return helpers.verifyPassword(req.body.password, userData.password)
                } else {
                    throw new Error('Invalid credentials provided.');
                }
            })
            .then((isValidPassword) => {
                if (isValidPassword) {
                    response.status(200).json({
                        message: 'Login successful'
                    });
                } else {
                    response.status(401).json({
                        message: 'Invalid credentials provided'
                    });
                }
            })
            .catch((error) => {
                response.status(500).json({
                    message: error && error.message || "Technical Error. Please try again later"
                })
            })
    }


    getRandomString(prefix) {
        const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(6, '0'); // Generate a random 4-digit number
        return `${prefix}${randomDigits}`
    }

    generateQRCodeData(params) {
        // Create a unique QR code data using user information
        const qrCodeData = JSON.stringify({
            userId: params.userId,
            zone: params.zone,
            circle: params.circle,
            ward: params.ward,
            plotNo: params.plotNo,
            totalUnits: params.totalUnits
        });

        return qrCodeData;
    }


    fetchRegisteredDataBasedOnType(req, res, type) {
        return Promise.resolve()
            .then(() => {
                if (type === 'users') {
                    if (req.query && req.query.phoneNumber) {
                        return User.find({
                            phoneNumber: req.query.phoneNumber
                        })
                    } else {
                        return User.find({})
                    }
                } else if (type === 'drivers') {
                    if (req.query && req.query.sat) {
                        return Driver.find({
                            sat: req.query.sat
                        })
                    } else {
                        return Driver.find({})
                    }
                } else if (type === 'admins') {
                    if (req.query && req.query.email) {
                        return Admin.find({
                            email: req.query.email
                        })
                    } else {
                        return Admin.find({})
                    }
                }
            })
            .then((data) => {
                return res.status(200).json(data)
            })
            .catch(() => {
                return Promise.reject({
                    message: error && error.message || "Error occurred while fetching data"
                })
            })
    }


    updateHouseScannedInfo(req, res) {
        return Promise.resolve()
            .then(() => {
                return User.updateOne({
                    userId: req.body.userId
                }, {
                    isWasteCollected: true,
                    wasteCollectedTime: new Date().toLocaleString(),
                    driverSat: req.body.driverSat
                }, {
                    upsert: true
                })
            })
            .then(() => {
                return res.status(200).send('success')
            })
            .catch(() => {
                return Promise.reject({
                    message: error && error.message || "Error occurred while fetching data"
                })
            })
    }

    checkHouseScannedInfo(req, res) {
        return Promise.resolve()
            .then(() => {
                return User.find({
                    userId: req.query.userId,
                    isWasteCollected: true
                })
            })
            .then((response) => {
                if (response && response.length) {
                    return res.status(200).json({
                        message: 'waste collected already',
                        isWasteCollected: true
                    })
                } else {
                    return res.status(200).json({
                        message: 'waste not collected',
                        isWasteCollected: false
                    })
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: error && error.message || "Technical error, please try again later"
                })
            })
    }


    getUsersStatistics(res) {
        return Promise.resolve()
            .then(() => {
                return Promise.allSettled([User.find({}), Driver.find({})])
            })
            .then((response) => {
                if (response) {
                    const userInfo = response[0] && response[0].value
                    const driverInfo = response[1] && response[1].value
                    const wasteCollectedHouses = userInfo.filter(val => val.isWasteCollected) || [];
                    const wasteNotCollectedHouses = userInfo.filter(val => !val.isWasteCollected) || [];
                    return res.status(200).json({
                        totalHouses: userInfo,
                        scannedHouses: wasteCollectedHouses,
                        unScannedHouses: wasteNotCollectedHouses,
                        totalDrivers: driverInfo,
                    })
                } else {
                    return res.status(200).json({})
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: error && error.message || "Technical error, please try again later"
                })
            })
    }
}


module.exports = new UsersController()