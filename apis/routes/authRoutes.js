const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//Middleware
router.use((req,res,next)=>{
    console.log('Middleware function is running');
    next();
})

router.route('/').get(authController.firstFunction);

module.exports = router;