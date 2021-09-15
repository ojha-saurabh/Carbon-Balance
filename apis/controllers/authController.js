const authModel = require("../models/authModel")
let controller = {};

controller.register = register;
controller.login = login;

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


