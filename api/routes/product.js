const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.get_products);

router.get('/:id', productController.get_product);

module.exports = router;