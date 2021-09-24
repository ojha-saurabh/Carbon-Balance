const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const path = require('path');

//Multer function

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(`${__dirname}/../../public/user/images`))
        // console.log(`${__dirname}/../../public/user/images`)
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+'-'+file.originalname);
        // console.log(Date.now()+'-'+file.originalname);
    }
});
var upload = multer({ storage: storage });

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
router.route('/getUserById').post(authController.getUserById);
router.route('/createProfile').post(authController.createUserProfile);
router.post('/updateProfileOrBannerPicture', upload.fields([{ name: 'fileData', maxCount: 1 }]), authController.updateProfileOrBannerPicture);

module.exports = router;