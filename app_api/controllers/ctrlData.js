var mongoose = require('mongoose');
var Coin = mongoose.model('Coins');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

function getActiveCoins(req,res){
    Coin
        .find({isActive:true})
        .exec(function(error,coins){
        	if (!coins){
        		sendJsonResponse(res,404,{"message":"no active coins found"});
        	}
        	else if (error){
        		sendJsonResponse(res,404,error);
        	}
        	else if (coins.length==0){
        		sendJsonResponse(res,404,{"message":"no active coins found"});
        	}
            else {
            	//Raising raiting for user favorite coins.
            	if (req.payload && req.payload.favorites>0){
                   coins.forEach(function(coin){
                   	if (coin.short_num in req.payload.favorites){
                   		coin.rating+=100
                   	}
                   })
            	}
            	sendJsonResponse(res,200,coins);
            }
        });
}

function getPairs(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function getTopPairs(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function setNewCoin(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function setNewPair(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function updateCoins(req,res){
    sendJsonResponse(res,200,{'message':'it is stub'});
}

function updatePairs(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function setTopReport(req,res){
    sendJsonResponse(res,200,{'message':'it is stub'});
}
function delPair(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

module.exports.getActiveCoins=getActiveCoins;
module.exports.getTopPairs=getTopPairs;
module.exports.getPairs=getPairs;
module.exports.setNewCoin=setNewCoin;
module.exports.setNewPair=setNewPair;
module.exports.updateCoins=updateCoins;
module.exports.updatePairs=updatePairs;
module.exports.setTopReport=setTopReport;
module.exports.delPair=delPair;