const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const foodRoutes = require('./routes/foodRoutes')
const cartRoutes = require('./routes/cartRoutes')
const Food = require('./models/Food');



app.options('*', cors());


const mongoUrl = 'mongodb://127.0.0.1:27017/usda';
mongoose.connect(mongoUrl);




// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

dotenv.config({
    path: 'config.env'
})

// Food routes 
app.use(foodRoutes)

// Cart routes
app.use(cartRoutes);

app.listen(4000, () => {
    console.log("Listening on port 4000.");
})