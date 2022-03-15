const Food = require('../models/Food');

const cart_index = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    Food.find((err, foods) => {
        if (err) {
            console.log(err);
        } else {


            res.send(foods);
        }
    })
}

const cart_delete = (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");

    Food.deleteOne({
        description: req.body.description
    }, (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const cart_create = async (req, res) => {
    const newFood = new Food({
        calories: req.body.calories,
        description: req.body.description,
        protein: req.body.protein,
        carbohydrates: req.body.carbohydrates,
        fat: req.body.fat,
        sugar: req.body.sugar
    })

    newFood.save();
    res.header('Access-Control-Allow-Origin', "*");
    res.send("you're here");
}

module.exports = {
    cart_index,
    cart_delete,
    cart_create
}