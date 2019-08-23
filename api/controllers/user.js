const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const User = require('../models/user');

exports.login_user = async (req, res, next) => {
    const {body: {userEmail, userPassword}} = req;
    if (userEmail && userPassword) {
        try {
            const user = await User.findOne({
                where: {
                    userEmail: userEmail,
                }
            });
            if (user) {
                const isValid = await bcrypt.compare(userPassword, user.userPassword);
                if (isValid) {
                    const jwtToken = jwt.sign({
                        id: user.id,
                        userEmail: user.userEmail,
                        userName: user.userName,
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: '1h',
                    });
                    res.status(200).json({
                        message: 'Login successful.',
                        userToken: jwtToken,
                    });
                } else {
                    res.status(404).json({
                        message: 'Invalid password.',
                    });
                }
            } else {
                res.status(404).json({
                    message: 'User credentials not found.'
                });
            }
        } catch (err) {
            res.status(500).json({
                message: 'Authentication failed.',
            });
        }
    } else {
        res.status(500).json({
            message: 'Authentication failed.',
        });
    }
}

exports.signup_user = async (req, res, next) => {
    const {body: {userName, userEmail, userPassword}} = req;
    if (userName && userEmail && userPassword) {
        try {
            const userList = await User.findAll({
                where: {
                    [Sequelize.Op.or]: [{userName: userName}, {userEmail: userEmail}]
                }
            });
            if(userList.length == 0) {
                const hashedPassword = await bcrypt.hash(userPassword, 10);
                const createdUser = await User.create({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: hashedPassword,
                });
                res.status(200).json({
                    message: 'Signed up successfully.',
                });
            } else {
                res.status(500).json({
                    message: 'User already exists.',
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    } else {
        res.status(500).json({
            message: 'Insufficient details.',
        });
    }
}