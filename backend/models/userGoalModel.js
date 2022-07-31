const mongoose = require('mongoose');

const userGoalScehma = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name ']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'please add a email ']
    },
    goal:{
        type:String,
        required:[true,'please add goal ']
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model('usergoals',userGoalScehma)