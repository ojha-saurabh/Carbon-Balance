const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//Middleware
router.use((req,res,next)=>{
    console.log('Middleware function is running');
    next();
})

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/getUserById').post(authController.getUserById);
router.route('/createProfile').post(authController.createUserProfile);

module.exports = router;