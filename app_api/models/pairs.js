var mongoose=require('mongoose');
var numSeq1 = require('mongoose-sequence');

var pairsListSchema=new mongoose.Schema({
	pair:{type:String,require:true},
	quoteCoin:{type:String,require:true},
	baseCoin:{type:String,require:true},
	exchange:{type:String,require:true},
	hight:{type:Number},
	low:{type:Number},
	open:{type:Number},
	close:{type:Number},
	last:{type:Number},
	percentChange:{type:Number},
	ema:{type:Number},
	isForMedian:{type:Boolean,'default':false},
	barTime:{type:Date}
	});

pairsListSchema.plugin(numSeq1,{inc_field:'faw_short_num'});
pairsListSchema.index({exchange:1,quoteCoin:1});
pairsListSchema.index({exchange:1,pair:1});

mongoose.model('pairs',pairsListSchema,'pairs');
