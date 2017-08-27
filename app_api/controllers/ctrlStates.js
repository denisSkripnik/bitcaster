var mongoose = require('mongoose');
var Coin = mongoose.model('Coins');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

function setExchange(req,res){
	var promise=Coin.findOne({tag:req.params.coin}).exec();
	promise
	   .then(function(coin){
	   	if(!coin) throw new Error('Coin not found');
	   	coin.exchanges.push({exchange:req.body.exchange});
	   	return coin.save();
	   })
	   .then(function(coin){sendJsonResponse(res,200,coin)})
	   .catch(function(err){sendJsonResponse(res,400,{message:err.message})});
}

function updateExchange(req,res){
	var promise=Coin.findOneAndUpdate({tag:req.params.coin,'exchanges.exchange':req.body.exchange},
		             {$set:{'exchanges.$.updated':req.body.updated,'exchanges.$.isActive':req.body.isActive}})
	                 .exec();
	promise
	    .then(function(coin){
		    sendJsonResponse(res,201,coin);
	    })
	    .catch(function(err){
	    	sendJsonResponse(res,400,{'message':err.message});
	    })
   
}

module.exports.updateExchange=updateExchange;
module.exports.setExchange=setExchange;