const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    calories: {
        type: String
    },
    description: {
        type: String
    },
    protein: {
        type: String
    },
    carbohydrates: {
        type: String
    },
    fat: {
        type: String
    },
    sugar: {
        type: String
    },
    brandOwner: {
        type: String
    }
});

module.exports = mongoose.model('Food', foodSchema);