//Coins collection using in main form of app

var mongoose=require('mongoose');
var numSeq = require('mongoose-sequence');

var exchangesStateSchema=new mongoose.Schema({
    exchange:{type:String,required:true},
    isActive:{type:String,'default':true},
});

var coinsListSchema=new mongoose.Schema({
	name:{type:String,required:true},
	tag:{type:String,required:true,unique: true},
	medianPrice:{type:Number},
    prevPrice:{type:Number},
    supply:{type:Number},
    exchanges:[exchangesStateSchema],
    rating:{type:Number,required:true},
    percentPredict:{type:Number},
    tagImg:{type:String},
    coinDesc:{type:String},
    coinType:{type:String},
    miningAlgo:{type:String},
    diff:{type:String},
    isActive:{type:Boolean,'default':true},
    lastUpdate:{type:Date,'default':Date.now}
});

//Short num used in user favorite list, stored in JWT payload.
coinsListSchema.plugin(numSeq,{inc_field:'short_num'});
coinsListSchema.index({numSeq:1},{unique: true});

mongoose.model('Coins',coinsListSchema,'coins');

