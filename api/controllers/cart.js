const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.add_to_cart = async(req, res, next) => {
    try {
        const {body: {
            userId, productId, quantity
        }} = req;
        if(userId && productId && quantity) {
            const user = await User.findOne({
                where: {
                    id: userId,
                }
            });
            const product = await Product.findOne({
                where: {
                    id: productId,
                }
            });
            if (user && product) {
                const createdCart = await Cart.create({
                    userId,
                    productId,
                    itemQuantity: quantity,
                    totalPrice: quantity * product.actualPrice,
                });
                const userCart = await Cart.findAll({
                    where: {
                        userId,
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
                    include: [{model: Product, as: 'product'}],
                });
                res.status(200).json({
                    cart: userCart,
                })
            } else {
                res.status(500).json({
                    message: 'Invalid details.',
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