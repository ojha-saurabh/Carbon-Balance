const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoDb')

let model = {};

model.login = login;
model.register = register;

module.exports = model;


//Login functionality
async function login(params){
    let deferred = Q.defer();
    db.get().collection('tbl_users').findOne({ email:params.email }, (err, user) =>{
        if(err) deferred.reject(err.name+': '+err.message);
        console.log(user);
        if(user && bcrypt.compareSync(params.password, user.password)){
            jwt.sign({id:user._id, email: user.email}, process.env.JWT_SECRET,{
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

