const mongoose       = require('mongoose');

const StudentsSchema = mongoose.Schema({
    firstName     : String,
    lastName      : String,
    birthDate     : Date  ,
    email         : String,
    password      : String,
    classroom     : String,
    registerNumber: Number
},{
    timestamps    : true
});
module.exports = mongoose.model('Student', StudentsSchema);