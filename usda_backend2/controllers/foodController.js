const axios = require('axios');

const dotenv = require('dotenv')

dotenv.config({
    path: 'config.env'
})

const api_key = process.env.API_KEY;
const foodListUrl = "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=" + api_key + "&pageNumber=1&pageSize=12";

const food_index = async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    try {

        getApiData(foodListUrl).then(data => res.send(getFoodList(data)));


    } catch (e) {
        console.log(e);
    }
}

const food_details = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const food = req.params.food;
    const searchUrl = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + api_key + "&query=" + food + "&pageSize=25";
    getApiData(searchUrl).then(data => res.send(getSpecificFoodList(data)));
}

async function getApiData(url) {


    const response = await axios.get(url);
    return response.data;

}

function getFoodList(url) {
    let foodItems = [];



    for (let i = 0; i < url.length; i++) {

        var description = url[i].description;
        var id = url[i].fdcId;
        const foodNutrients = url[i].foodNutrients;
        var calories;
        var protein;
        var carbohydrates;
        var fat;
        var sugar;
        for (let i = 0; i < foodNutrients.length; i++) {

            if (foodNutrients[i].number.includes("208")) {
                calories = foodNutrients[i].amount;


            }
            if (foodNutrients[i].number.includes("203")) {
                protein = foodNutrients[i].amount;


            }
            if (foodNutrients[i].number.includes("204")) {
                fat = foodNutrients[i].amount;


            }
            if (foodNutrients[i].number.includes("205")) {
                carbohydrates = foodNutrients[i].amount;


            }
            if (foodNutrients[i].number.includes("269")) {
                sugar = foodNutrients[i].amount;


            }




        }
        let food = {
            id: id,
            description: description,
            calories: calories,
            carbohydrates: carbohydrates,
            protein: protein,
            fat: fat,
            sugar: sugar
        }


        foodItems.push(food);






    }

    return foodItems;


}

function getSpecificFoodList(data) {
    let foodItems = [];
    const foodsArray = data.foods;

    for (let i = 0; i < foodsArray.length; i++) {

        var id = foodsArray[i].fdcId;
        var brandOwner = foodsArray[i].brandOwner;
        var description = foodsArray[i].description;
        var calories;
        var protein;
        var carbohydrates;
        var fat;
        var sugar;

        const foodNutrients = foodsArray[i].foodNutrients;
        for (let i = 0; i < foodNutrients.length; i++) {
            const currentFoodNutrient = foodNutrients[i];
            const nutrientNumber = currentFoodNutrient.nutrientNumber;

            switch (nutrientNumber) {
                case "203":
                    protein = currentFoodNutrient.value;
                case "204":
                    fat = currentFoodNutrient.value;
                case "205":
                    carbohydrates = currentFoodNutrient.value;
                case "208":
                    calories = currentFoodNutrient.value;
                case "269":
                    sugar = currentFoodNutrient.value;
            }


        }
        let food = {
            id: id,
            brandOwner: brandOwner,
            description: description,
            calories: calories,
            carbohydrates: carbohydrates,
            protein: protein,
            fat: fat,
            sugar: sugar
        }

        foodItems.push(food);

    }
    return foodItems;
}

module.exports = {
    food_index,
    food_details
}