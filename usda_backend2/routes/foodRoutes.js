const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const dotenv = require('dotenv')

dotenv.config({
    path: 'config.env'
})


const api_key = process.env.API_KEY;
const foodListUrl = "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=" + api_key + "&pageNumber=1&pageSize=12";

router.get('/food', foodController.food_index);


router.get('/food/:food', foodController.food_details);


module.exports = router;