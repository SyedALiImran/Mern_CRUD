const mongoose = require('mongoose');

const userGoalScehma = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
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

module.exports = mongoose.model('usergoal',userGoalScehma)