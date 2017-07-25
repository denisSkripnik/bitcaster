var mongoose=require('mongoose');

var reportPairSchema=new mongoose.Schema({
	pair:{type:String,require:true},
	quoteCoin:{type:String,require:true},
	baseCoin:{type:String,require:true},
	volume:{type:Number},
	sellOrders:{type:Number},
	byOrders:{type:Number},
	change24:{type:Number},
	change24Predict:{type:Number},
	hight24:{type:Number},
	low24:{type:Number},
	reportPrice:{type:Number},
	reportEma:{type:Number}
});

var topReportSchema=new mongoose.Schema({
	date:{type:Date,require:true},
	type:{type:String,require:true},
	pairs:[reportPairSchema]
});

topReportSchema.index({date:1,type:1});

mongoose.model('topReport',topReportSchema,'topreport');
