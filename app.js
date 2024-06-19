const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

require('./database-connection/db_connection');
const routes = require('./routes')

// Enable CORS for all routes
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("", routes)


app.listen(5000, () => {
    console.log('server listening at port 5000')
})
app.get('/', function(req,res) {
    res.send('Hello, World!');
});