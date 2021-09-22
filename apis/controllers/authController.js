const authModel = require("../models/authModel")
let controller = {};

controller.register = register;
controller.login = login;
controller.getUserById = getUserById;
controller.createUserProfile = createUserProfile;

module.exports = controller;


//Login functionality

function login(req, res){
    authModel.login(req.body).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

// Register user

function register(req, res){
    authModel.register(req.body).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

// get user by id

function getUserById(req, res){
    authModel.getUserById(req.body).then((response)=>{    
        console.log('=======res', response);
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

// create user profile

function createUserProfile(req, res){
    authModel.createUserProfile(req.body).then((response)=>{    
        console.log('=======res', response);
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}


