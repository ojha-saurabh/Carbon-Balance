const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const commonController = require('../controllers/commonController');

router.route('/getActionableTips').get(commonController.getActionableTips);

module.exports = router;