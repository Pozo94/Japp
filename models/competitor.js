var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Sedziowanie');
var db = mongoose.connection;

var CompetitorSchema=mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
        ,
        required:true
    },
    club:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    clas:{
        type:String,
        required:true
    },
    subdivision:{
        type:String,
        required:true

    },
    FX:{
        type:Number,
        required:false

    },
    PH:{
        type:Number,
        required:false
    },
    SR:{
        type:Number,
        required:false
    },
    VT:{
        type: Number,
        required: true,
        default: 0
        },
    VT1:{
        type:Number,
        required:false
    },
    VT2:{
        type:Number,
        required:false
    },
    PB:{
        type:Number,
        required:false
    },
    HB:{
        type:Number,
        required:false
    },
    suma:{
        type:Number,
        required:false
    }


});

var Competitor=module.exports = mongoose.model('Competitor',CompetitorSchema);
module.exports.createCompetitor=function(newCompetitor, callback){

            newCompetitor.save(callback);


    };