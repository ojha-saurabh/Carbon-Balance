const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../db/db')

const { Users, Questions } = require('../schema/commonSchema');

let model = {};

model.questionaire = questionaire;

module.exports = model;

async function questionaire(params, userData){
    let deferred = Q.defer();
    console.log(userData);
    const questions = await Questions.find({});
    deferred.resolve({status:true, data:questions});
    return deferred.promise;
}