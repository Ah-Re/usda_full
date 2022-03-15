const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const cartController = require('../controllers/cartController');

router.post('/cart', cartController.cart_create);

router.post('/cart/removeFromCart', cartController.cart_delete);

router.get('/cart', cartController.cart_index);


module.exports = router;