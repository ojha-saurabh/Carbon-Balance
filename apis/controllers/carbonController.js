const carbonModel = require("../models/carbonModel")
let controller = {};

controller.questionaire = questionaire;

module.exports = controller;
console.log('i am here')

//Questionaire functionality

function questionaire(req, res){
    carbonModel.questionaire(req.body,req.tokenDecoded).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}


