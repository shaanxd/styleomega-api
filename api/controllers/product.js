const Product = require('../models/product');

exports.get_products = async(req, res, next) => {
    try {
        const {body: {pageNumber}} = req;
        const offset = pageNumber ? pageNumber * 2 : 0;
        const result = await Product.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            limit: 2,
            offset: offset
        });
        res.status(200).json({
            products: result,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

exports.get_product = async(req, res, next) => {
    const {params: {id}} = req;
    try {
        const result = await Product.findOne({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {
                id: id,
            }
        });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'Product not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}