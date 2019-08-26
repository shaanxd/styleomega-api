const express = require('express');

const checkAuth = require('../middleware/check-auth');
const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/addtocart', checkAuth, cartController.add_to_cart);

module.exports = router;