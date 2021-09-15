const Q = require('q');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//MogoDB Connection
const db = mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, dbo)=>{
    if(err){
        console.log(err);
    }
    if(dbo){
        console.log('Database connected');
    }
});

const { Users } = require('../schema/commonSchema');

let model = {};

model.login = login;
model.register = register;

module.exports = model;


//Login functionality
async function login(params){
    let deferred = Q.defer();
    let user = await Users.findOne({ email:params.email });
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

        // jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAeW9wbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3RAMTIzIiwiaWF0IjoxNjMxNTQwOTQzLCJleHAiOjE2NjMwOTc4Njl9.3KIa3mA5MGNRVIX3XdkdhEtcbPdNZBjdK5UXmy7ih2w', process.env.JWT_SECRET, (err, decoded)=>{
        //     if(err){
        //         deferred.resolve();
        //     }else{
        //         deferred.resolve({status:true, message:'Token decoded',data:decoded});
        //     }  
        // })      
    }else{
        deferred.resolve({status:false, message:'Please use valid credentials.'});
    }
    return deferred.promise;
}

async function register(params){
    let deferred = Q.defer();
    console.log('Seeding authors to ' + mongoose.connection.name + '...');
    let user = await Users.findOne({ email:params.email });
    if(!user){
        let saveObj = {email:params.email, password:bcrypt.hashSync(params.password, 10)};
        // console.log(saveObj); return 
        var newUser = new Users(saveObj);
        let dataSave = await newUser.save();
        // console.log(dataSave);
        if(!dataSave._id){
            deferred.resolve({status:false, message:'Something went wrong'});
        }else{
            deferred.resolve({status:true, message:'User created successfully'});
        }   
    }else{
        deferred.resolve({status:false, message:'Entered email is already registered with us.'});
    }
    
    return deferred.promise;
}

