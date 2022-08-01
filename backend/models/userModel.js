const mongoose = require('mongoose');


const userModel = mongoose.Schema({
    name:{
        type:String,
        min:3,
        required:[true,'kindly fill the Name field Correctly']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'kindly fill the Email field']
    },
    password:{
        type:String,
        required:[true,'kindly fill the Password field']
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('User',userModel);