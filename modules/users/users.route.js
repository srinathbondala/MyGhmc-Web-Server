const express = require('express');

const router = express.Router();

const User = require('./admin_schema');

const usersController = require('./users.controller')

/********* common routes *********/

router.post('/insert', (req, res) => {
    res.send("hi there")
    usersController.insertUser(req, res)
})

router.get('/statistics/houses', (req, res) => {
    usersController.getUsersStatistics(res)
})

/********* admin related routes *********/

router.post('/admin/login',
    (req, res) => usersController.verifyLogin(req, res, 'admin'))

router.get('/admins/fetch',
    (req, res) => usersController.fetchRegisteredDataBasedOnType(req, res, 'admins'))


/********* driver related routes *********/

router.post('/driver/login',
    (req, res) =>{
        usersController.verifyLogin(req, res, 'driver');});

router.get('/drivers/fetch',
    (req, res) => usersController.fetchRegisteredDataBasedOnType(req, res, 'drivers'))

router.post('/driver/house-scanned-info',
    (req, res) => usersController.updateHouseScannedInfo(req, res, 'admins'))

router.get('/driver/check-scanned-info',
    (req, res) => usersController.checkHouseScannedInfo(req, res, 'admins'))



/********* users related routes *********/

router.post('/users/login',
    (req, res) => usersController.verifyLogin(req, res, 'user'))

router.get('/users/fetch',
    (req, res) => usersController.fetchRegisteredDataBasedOnType(req, res, 'users'))

router.get('/users/fetch',
    (req, res) => usersController.fetchRegisteredDataBasedOnType(req, res, 'users'))




module.exports = router