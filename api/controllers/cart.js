const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.add_to_cart = async(req, res, next) => {
    try {
        const {body: {productId, quantity}, userData: {id: userId}} = req;
        if(productId && quantity) {
            const product = await Product.findOne({
                where: {
                    id: productId,
                }
            });
            if (product) {
                await Cart.create({
                    userId,
                    productId,
                    itemQuantity: quantity,
                    totalPrice: quantity * product.actualPrice,
                });
                const userCart = await Cart.findAll({
                    where: {
                        userId,
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt', 'userId', 'productId']},
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                    }],
                });
                res.status(200).json(userCart)
            } else {
                res.status(500).json({
                    message: 'Invalid product.',
                });
            }
        } else {
            res.status(500).json({
                message: 'Insufficient details to add product to cart',
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.get_cart = async(req, res, next) => {
    try {
        const {userData: {id}} = req;
        const userCart = await Cart.findAll({
            where: {
                userId: id,
            },
            attributes: {exclude: ['createdAt', 'updatedAt', 'userId', 'productId']},
            include: [{
                model: Product,
                as: 'product',
                attributes: {exclude: ['createdAt', 'updatedAt']},
            }],
        });
        res.status(200).json(userCart);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

exports.delete_cart = async(req, res, next) => {
    try {
        const {params: {id}, userData: {id: userId}} = req;

        const cartItem = await Cart.findOne({
            where: {
                id,
            }
        });
        if (cartItem) {
            if(cartItem.userId === userId) {
                await cartItem.destroy();
                const userCart = await Cart.findAll({
                    where: {
                        userId,
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt', 'userId', 'productId']},
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: {exclude: ['createdAt', 'updatedAt']},
                    }],
                });
                res.status(200).json(userCart);
            } else {
                res.status(401).json({
                    message: 'Not authorized to remove cart item',
                });
            }
        } else {
            res.status(404).json({
                message: 'Could not find cart item.',
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}