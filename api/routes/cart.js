const express = require('express');

const checkAuth = require('../middleware/check-auth');
const cartController = require('../controllers/cart');

const router = express.Router();

router.post('/addtocart', checkAuth, cartController.add_to_cart);

router.get('/', checkAuth, cartController.get_cart);

router.delete('/:id', checkAuth, cartController.delete_cart);

router.patch('/:id', checkAuth, cartController.update_cart);

module.exports = router;