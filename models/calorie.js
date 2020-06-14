const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define calorie schema
const Calorie = new Schema({

    username : {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date
    },
    calorie_amount_bf: {
        type: Number,
        required: true
    },

    calorie_amount_lunch: {
        type: Number,
        required: true
    },

    calorie_amount_dinner: {
        type: Number,
        required: true
    },

    total_calorie: {
        type: Number
    },
    calorie_goal: {
        type: Number,
        required: true
    }
})

Calorie.statics.findByUser = function(user){
    return this.find({username:user})
}
// 

module.exports = mongoose.model("Calorie", Calorie);