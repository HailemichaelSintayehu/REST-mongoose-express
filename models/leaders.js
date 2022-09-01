const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const promoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:String,
        default:false
    }

})

var Promotions = mongoose.model("promotion",promoSchema);

module.exports = Promotions;