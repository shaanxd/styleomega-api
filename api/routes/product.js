const express = require('express');

const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.get_products);

router.get('/:id', productController.get_product);

router.post('/addreview', checkAuth, productController.add_review);

router.get('/getreviews/:id', productController.get_reviews);

module.exports = router;