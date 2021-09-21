const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoDb');
const { ObjectId } = require('mongodb');

let model = {};

model.questionaire = questionaire;
model.saveCalculatedFootprint = saveCalculatedFootprint;

module.exports = model;

async function questionaire(params, userData){
    let deferred = Q.defer();
    // console.log(userData);
    // const questions = await Questions.find({});
    db.get().collection('tbl_questionaires').findOne({}, (err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve({status:true, data:data});
        }else{
            deferred.resolve({status:false, message:'Something went wrong'});            
        }
    })
    return deferred.promise;
}

async function saveCalculatedFootprint(params){
    let deferred = Q.defer();

    let saveObj = {};

    saveObj.questionaire = params.questionaireData;
    saveObj.userId = ObjectId(params.userData.id);
    saveObj.totalCalculatedFootPrint = parseFloat(params.totalCalculatedFootPrint);
    // console.log(saveObj);
    // const saveUserQuestion = new usersQuestions(saveObj);
    // let dataSave = await saveUserQuestion.save();
    // console.log(dataSave);
    // if(!dataSave._id){
    //     deferred.resolve({status:false, message:'Something went wrong'});
    // }else{
    //     deferred.resolve({status:true, message:'User questionaire saved successfully'});
    // } 
    db.get().collection('tbl_users_footprints').insertOne(saveObj, (err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve({status:true, message:'User questionaire saved successfully'});
        }else{
            deferred.resolve({status:false, message:'Something went wrong'});            
        }
    })
    return deferred.promise;
}