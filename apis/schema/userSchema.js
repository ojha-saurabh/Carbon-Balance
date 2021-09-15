const mongoose = require('mongoose');

const userModel = mongoose.Schema(
{
    firstName: { type: String },
    lastName: { type: String  },
    email: { type: String },
    password: { type: String },
    age: { type: String },
    state: { type: String },
    zip: { type: String },
    occupation: { type: String },
    terms: { type: Boolean }
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('tbl_users', userModel);