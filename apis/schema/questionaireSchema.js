const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    option : {type:String},
    point : {type:String}
})

const questionSchema = mongoose.Schema({
    question:{type:String},
    options:[optionSchema],
    note:{type:String},
    otherAnswer:{type:String}
})

const questionModel = mongoose.Schema(
{
    questionaire: [questionSchema]
}
);

module.exports = mongoose.model('tbl_questionaires', questionModel);