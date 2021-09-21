const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const carbonController = require('../controllers/carbonController');

//Token validator
router.use((req, res, next) => {
    console.log('i am here');
    let token = req.headers['authorization'];
    if (token){
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenDecoded)=>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message:'Invalid X-Access-Token Provided!!!'
                })
            }else{
                req.tokenDecoded = tokenDecoded;
                next();
            }
        });
    }else{
        return res.status(401).send({
            success: false,
            message:'Invalid X-Access-Token Provided!!!'
        });
    }
})

router.route('/questionaire').get(carbonController.questionaire);

module.exports = router;