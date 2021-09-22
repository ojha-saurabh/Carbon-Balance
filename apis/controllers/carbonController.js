const carbonModel = require("../models/carbonModel")

let controller = {};
controller.questionaire = questionaire;
controller.saveCalculatedFootprint = saveCalculatedFootprint;
controller.getActions = getActions;
controller.saveCalculatedActions = saveCalculatedActions;
controller.fetchSummary = fetchSummary;

module.exports = controller;

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

function saveCalculatedFootprint(req, res){
    carbonModel.saveCalculatedFootprint(req.body).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

function getActions(req, res){
    carbonModel.getActions(req.body,req.tokenDecoded).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

function saveCalculatedActions(req, res){
    carbonModel.saveCalculatedActions(req.body).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}

function fetchSummary(req, res){
    carbonModel.fetchSummary(req.body,req.tokenDecoded).then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}


