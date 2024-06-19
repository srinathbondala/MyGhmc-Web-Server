const express = require('express')
const userDetailsRoute = require('./modules/users/users.route')

const router = express.Router();

router.use('/fetch', (req, res) => {
    res.send('hello, athena server. your build.')
})


router.use('/users', userDetailsRoute)


module.exports = router