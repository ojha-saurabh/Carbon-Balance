const Q = require('q');
const jwt = require('jsonwebtoken');

let model = {};

model.login = login;


//Login functionality
function login(params){
    let deferred = Q.defer();
    console.log('Auth model is working', params)
    if(params.email!='' && params.password!=''){
        console.log(process.env.JWT_SECRET)
        params.name = 'Saurabh Ojha';
        delete params.password;
        jwt.sign(params, process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        },(err,token)=>{
            if(err){
                deferred.resolve({status:false, message:'Something went wrong'});
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

module.exports = model;

