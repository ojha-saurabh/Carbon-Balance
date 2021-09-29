const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoDb');
const { ObjectId } = require('mongodb');

let model = {};

model.getActionableTips = getActionableTips;

module.exports = model;


function getActionableTips(){
    let deferred = Q.defer();
    // console.log('=====Model');
    db.get().collection('tbl_actionable_tips').find().toArray((err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve(data);
        }else{
            deferred.resolve(false);            
        }
    })
    return deferred.promise;
}