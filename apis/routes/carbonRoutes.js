const express = require('express');
const router = express.Router();

const carbonController = require('../controllers/carbonController');

router.use((req,res,next)=>{
    console.log('Middleware function is running');
    next();
})

router.route('/').get(carbonController.firstFunction);

module.exports = router;