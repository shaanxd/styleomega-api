const express = require('express');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.status(200).json({
        message: 'LOGIN WORKING BITAACCH',
    });
});

router.post('/signup', async (req, res, next) => {
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
});

module.exports = router;