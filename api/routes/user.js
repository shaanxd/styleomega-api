const express = require('express');

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.status(200).json({
        message: 'LOGIN WORKING BITAACCH',
    });
});

router.get('/signup', (req, res, next) => {
    res.status(200).json({
        message: 'SIGNUP WORKING BITAACCH',
    });
});

module.exports = router;