const commonModel = require("../models/commonModel")

let controller = {};
controller.getActionableTips = getActionableTips;

module.exports = controller;

function getActionableTips(req, res){
    // console.log('================req');
    commonModel.getActionableTips().then((response)=>{    
        if(response.status){
            return res.status(200).send(response);
        }else{
            res.status(201).send(response);
        }   
    })
}