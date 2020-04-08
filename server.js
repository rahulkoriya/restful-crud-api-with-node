const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');
const cors = require('cors');

// create express app
const app = express();

const port = 8000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

// Require routes
require('./app/routes')(app);

// listen for requests
app.listen(port, () => {
    console.log('we are live on ' + port);
})

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('database connected successfully.')
}).catch(err => {
    console.log(err)
    process.exit()
})
