const User = require('../models/user');
const Product = require('../models/product');
const Review = require('../models/review');

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
        const product = await Product.findOne({
            attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {
                id: id,
            }
        });
        if (product) {
            const productReviews = await Review.findAll({
                limit: 3,
                where: {productId: id},
                attributes: {exclude: ['userId', 'createdAt', 'productId']},
                include: [{
                    model: User,
                    as: 'user',
                    attributes: {exclude: ['userPassword', 'createdAt', 'updatedAt']}
                }],
            });
            res.status(200).json({
                ...product.toJSON(),
                reviews: productReviews,
            });
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

exports.add_review = async(req, res, next) => {
    const {
        body: {productId, title, comment, rating},
        userData: {id: userId}
    } = req;
    try {
        if (productId && title && comment && rating) {
            const product = await Product.findOne({where: {id: productId}});
            if (product) {
                const createdReview = await Review.create({
                    title,
                    comment,
                    rating,
                    userId,
                    productId,
                });
                const productReviews = await Review.findAll({
                    where: {productId},
                    attributes: {exclude: ['userId', 'createdAt', 'productId']},
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: {exclude: ['userPassword', 'createdAt', 'updatedAt']}
                    }],
                });
                let totalRating = 0;
                for (const review of productReviews) {
                    totalRating = totalRating + review.rating;
                };
                const averageRating = totalRating/productReviews.length;
                const updatedProduct = await product.update({
                    averageRating,
                });
                res.status(200).json({
                    productId,
                    averageRating,
                    reviews: productReviews,
                });
            } else {
                res.status(404).json({
                    message: 'Product not found',
                })
            }
        } else {
            res.status(400).json({
                message: 'Insufficient details.'
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
}

exports.get_reviews = async(req, res, next) => {
    const {params: {id}} = req;
    try {
        const product = await Product.findOne({where: {id}});
        if (product) {
            const productReviews = await Review.findAll({
                where: {productId: id},
                attributes: {exclude: ['userId', 'createdAt', 'productId']},
                include: [{
                    model: User,
                    as: 'user',
                    attributes: {exclude: ['userPassword', 'createdAt', 'updatedAt']}
                }],
            });
            res.status(200).json({
                productId: id,
                averageRating: product.averageRating,
                reviews: productReviews,
            })
        } else {
            res.status(404).json({
                message: 'Product not found.',
            });
        }
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
}