const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoDb');
const { ObjectId } = require('mongodb');

let model = {};

model.questionaire = questionaire;
model.saveCalculatedFootprint = saveCalculatedFootprint;
model.getActions = getActions;
model.saveCalculatedActions = saveCalculatedActions;
model.fetchSummary = fetchSummary;

module.exports = model;


function getTableData(table, params){
    let deferred = Q.defer();
    db.get().collection(table).findOne(params, (err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve(data);
        }else{
            deferred.resolve(false);            
        }
    })
    return deferred.promise;
}

async function questionaire(params, userData){
    let deferred = Q.defer();
    const date = new Date();
    const year = date.getFullYear();
    const tableData = await getTableData('tbl_users_footprints', {userId: ObjectId(userData.id), forYear: year});
    if(!tableData){
        db.get().collection('tbl_questionaires').findOne({}, (err, data) =>{
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve({status:true, data:data});
            }else{
                deferred.resolve({status:false, message:'Something went wrong'});            
            }
        })
    }else{
        deferred.resolve({status:true, data:tableData});
    }
    
    return deferred.promise;
}

async function saveCalculatedFootprint(params){
    let deferred = Q.defer();

    let saveObj = {};
    const date = new Date();
    const year = date.getFullYear();    
    saveObj.questionaire = params.questionaireData;
    saveObj.totalCalculatedFootPrint = parseFloat(params.totalCalculatedFootPrint);
    saveObj.forYear = year;
    // console.log(saveObj);

    const tableData = await getTableData('tbl_users_footprints', {userId: ObjectId(params.userData.id), forYear: year});
    if(!tableData){        
        saveObj.userId = ObjectId(params.userData.id);
        db.get().collection('tbl_users_footprints').insertOne(saveObj, (err, data) =>{
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve({status:true, message:'Carbon footprint calculated successfully'});
            }else{
                deferred.resolve({status:false, message:'Something went wrong'});            
            }
        })
    }else{
        db.get().collection('tbl_users_footprints').updateOne({userId: ObjectId(params.userData.id), forYear: year}, {$set: saveObj}, (err, data) => {
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve({status:true, message:'Carbon footprint recalculated successfully'});
            }else{
                deferred.resolve({status:false, message:'Something went wrong'});            
            }
        })
    }
    
    let arrayObj = {
        userId: ObjectId(params.userData.id),
        totalCarbonFootprint:saveObj.totalCalculatedFootPrint,
        totalTakeActionPoint:0,
        remainingFootprint:0,
        createdDate: new Date(),
        updatedDate: new Date(),
        forYear: year
    }
    const summaryData = await getTableData('tbl_carbon_summary', {userId: ObjectId(params.userData.id), forYear: year});
    if(summaryData){
        arrayObj.totalTakeActionPoint = summaryData.remainingFootprint
        arrayObj.remainingFootprint = parseFloat(arrayObj.totalCarbonFootprint) - parseFloat(summaryData.totalTakeActionPoint);
    }
    await saveOrUpdateCarbonSummary(arrayObj);
    return deferred.promise;
}

async function getActions(params, userData){
    let deferred = Q.defer();
    const date = new Date();
    const year = date.getFullYear();
    const tableData = await getTableData('tbl_users_actions', {userId: ObjectId(userData.id), forYear: year});

    db.get().collection('tbl_actions').findOne({}, (err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve({status:true, data:data, objArray:tableData});
        }else{
            deferred.resolve({status:false, message:'Something went wrong'});            
        }
    })
    
    return deferred.promise;
}

async function saveCalculatedActions(params){
    let deferred = Q.defer();

    let saveObj = {};
    const date = new Date();
    const year = date.getFullYear();    
    saveObj.actions = params.actionData;
    saveObj.totalCalculatedTakeActionPoint = parseFloat(params.takeActionPoint).toFixed(2);
    saveObj.forYear = year;
    // console.log(params);    return;

    const tableData = await getTableData('tbl_users_actions', {userId: ObjectId(params.userData.id), forYear: year});
    if(!tableData){        
        saveObj.userId = ObjectId(params.userData.id);
        db.get().collection('tbl_users_actions').insertOne(saveObj, (err, data) =>{
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve({status:true, message:'Actions saved successfully'});
            }else{
                deferred.resolve({status:false, message:'Something went wrong'});            
            }
        })
    }else{
        db.get().collection('tbl_users_actions').updateOne({userId: ObjectId(params.userData.id), forYear: year}, {$set: saveObj}, (err, data) => {
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve({status:true, message:'Actions updated successfully'});
            }else{
                deferred.resolve({status:false, message:'Something went wrong'});            
            }
        })
    }

    let arrayObj = {
        userId: ObjectId(params.userData.id),
        totalCarbonFootprint:0,
        totalTakeActionPoint:parseFloat(saveObj.totalCalculatedTakeActionPoint),
        remainingFootprint:0,
        createdDate: new Date(),
        updatedDate: new Date(),
        forYear: year
    }
    const summaryData = await getTableData('tbl_carbon_summary', {userId: ObjectId(params.userData.id), forYear: year});
    if(summaryData){
        arrayObj.totalCarbonFootprint = summaryData.totalCarbonFootprint
        arrayObj.remainingFootprint = parseFloat(summaryData.totalCarbonFootprint) - parseFloat(arrayObj.totalTakeActionPoint);
    }
    await saveOrUpdateCarbonSummary(arrayObj);

    return deferred.promise;
}

async function saveOrUpdateCarbonSummary(objArray){
    let deferred = Q.defer();
    const tableData = await getTableData('tbl_carbon_summary', {userId: objArray.userId, forYear: objArray.forYear});
    // console.log({userId: objArray.userId, forYear: objArray.forYear})
    // console.log(tableData, objArray); 
    // return
    if(!tableData){        
        objArray.userId = objArray.userId;
        db.get().collection('tbl_carbon_summary').insertOne(objArray, (err, data) =>{
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve(true);
            }else{
                deferred.resolve(false);            
            }
        })
    }else{
        db.get().collection('tbl_carbon_summary').updateOne({userId: objArray.userId, forYear: objArray.forYear}, {$set: objArray}, (err, data) => {
            if(err) deferred.reject(err.name+': '+err.message);
            if(data){
                deferred.resolve(true);
            }else{
                deferred.resolve(false);            
            }
        })
    }
}


async function fetchSummary(params, userData){
    let deferred = Q.defer();
    const date = new Date();
    const year = date.getFullYear();
    const tableData = await getTableData('tbl_users_actions', {userId: ObjectId(userData.id), forYear: year});

    db.get().collection('tbl_actions').findOne({}, (err, data) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(data){
            deferred.resolve({status:true, data:data, objArray:tableData});
        }else{
            deferred.resolve({status:false, message:'Something went wrong'});            
        }
    })
    
    return deferred.promise;
}

