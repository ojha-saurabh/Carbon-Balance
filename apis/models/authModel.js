const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoDb')
const { ObjectId } = require('mongodb');

let model = {};

model.login = login;
model.register = register;
model.getUserById = getUserById;
model.createUserProfile = createUserProfile;
model.updateProfileOrBannerPicture = updateProfileOrBannerPicture;

module.exports = model;


//Login functionality
async function login(params){
    let deferred = Q.defer();
    db.get().collection('tbl_users').findOne({ email:params.email }, (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        console.log(user);
        if(user && bcrypt.compareSync(params.password, user.password)){
            let jwtObj = {id:user._id, email: user.email};
            if(user.displayName!=''){
                jwtObj.displayName = user.displayName;
            }
            jwt.sign(jwtObj, process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES_IN
            },(err,token)=>{
                if(err){
                    deferred.resolve({status:false, message:'Something went wrong', error:err});
                }else{
                    deferred.resolve({status:true, message:'Logged in successfully',token:token});
                }            
            })  
        }else{
            deferred.resolve({status:false, message:'Please use valid credentials.'});            
        }
    })
    return deferred.promise;
}

async function register(params){
    let deferred = Q.defer();

    db.get().collection('tbl_users').findOne({ email:params.email }, (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        console.log(user);
        if(user){
            deferred.resolve({status:false, message:'Entered email is already registered with us.'});
        }else{
            let saveObj = {email:params.email, password:bcrypt.hashSync(params.password, 10)};
            db.get().collection('tbl_users').insertOne(saveObj, (err, data) =>{
                if(err) deferred.reject(err.name+': '+err.message);
                if(data){
                    deferred.resolve({status:true, message:'User created successfully'});
                }else{
                    deferred.resolve({status:false, message:'Something went wrong'});           
                }
            })       
        }
    })
    
    return deferred.promise;
}

// get user by id

async function getUserById(params){
    let deferred = Q.defer();

    db.get().collection('tbl_users').findOne({ email:params.email }, (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(user){
            deferred.resolve({status:true, message:'', data: user});
        }
    })
    
    return deferred.promise;
}


// create profile

async function createUserProfile(body){
    let deferred = Q.defer();
    db.get().collection('tbl_users').
    findOneAndUpdate({ email:body.email },{$set : {
        "displayName": body?.displayName,
        "about": body?.about,
        "firstName": body?.firstName,
        "lastName": body?.lastName,
        "email": body?.email,
        "streetAddress": body?.streetAddress,
        "zipCode": body?.zipCode,
        "state": body?.state,
        "age": body?.age,
        "occupation": body?.occupation,
        "termsAccepted": body?.termsAccepted,
    }}, (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(user){
            deferred.resolve({status:true, message:'Profile Created Successfully.', data: user});
        }
    })
    
    return deferred.promise;
}

function updateProfileOrBannerPicture(params){
    let deferred = Q.defer();
    let imageObj = {};
    if(params.type==='profile'){
        imageObj = {"profileImage": params.profileImage};
    }else{
        imageObj = {"bannerImage": params.bannerImage};
    }
    db.get().collection('tbl_users').updateOne({ _id:ObjectId(params.id) },
    {$set : imageObj}, 
    (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        if(user){
            deferred.resolve({status:true});
        }
    })
    
    return deferred.promise;
}

