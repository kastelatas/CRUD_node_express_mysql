const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();



authRouter.use('/register', authController.postRegister);
authRouter.use('/login', authController.postLogin);
authRouter.use('/', authController.home);

authRouter.use( (req, res, next) => {
    res.status(404).send({message: 'NOT Found'})
});

module.exports = authRouter
