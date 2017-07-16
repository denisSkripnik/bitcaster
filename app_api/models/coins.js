var mongoose=require('mongoose');

var exchangeListSchema=new mongoose.Schema({
	name:{type:String,required:true},
	isActive:{type:Boolean,required:true}
});

var coinsListSchema=new mongoose.Schema({
	name:{type:String,required:true},
	tag:{type:String,required:true},
	medianPrice:{type:Number},
    supply:{type:Number},
    exchanges:[exchangeListSchema],
    rating:{type:Number,required:true},
    percentPredict:{type:Number},
    tagImg:{type:String},
    coinDesc:{type:String},
    coinType:{type:String},
    isActive:{type:Boolean,'default':true},
    lastUpdate:{type:Date,'default':Date.now}
});

mongoose.model('coins',coinsListSchema,'coins');