const mongoose = require('mongoose');
// server.js
require('dotenv').config();


class DBconnection {
    constructor() {
        this.db = process.env.DATABASE_URL
        this.connect()
    }

    connect() {
        return Promise.resolve()
            .then(() => {
                return mongoose.connect(this.db)
            })
            .then((response) => {
                console.log('database connection successful')
            }).catch((error) => {
                console.error('error occurred while connecting to the database')
            })

    }
}


module.exports = new DBconnection()