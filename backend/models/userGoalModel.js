const mongoose = require('mongoose');

const userGoalScehma = mongoose.Schema({
    
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