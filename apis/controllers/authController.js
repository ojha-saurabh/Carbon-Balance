const authModel = require("../models/authModel")
let controller = {};

controller.login = login;


//Login functionality

function login(req, res){
    console.log('Auth function is working', req.body)
    authModel.login(req.body).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(301).send(response);
        }   
    })
}

module.exports = controller;

