var mongoose = require('mongoose');
var Coin = mongoose.model('Coins');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

var safeUpdater=(function(){
    function updateObject(req,doc){
        var cnt=0;
        for (i in req.body) {
            if (i=='_id' || i=='_v') continue;  //Protection
            if (i in doc.schema.paths){
                if (i=='exchanges'){doc[i]=req.body[i].split(',')} //Stub!!!
                else {doc[i]=req.body[i]}
                cnt++;
            }
        }
         if (cnt>0) { return doc;}
         else {return false;}
    }
    return {
        updateObject:updateObject
    };
})();

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
	Coin.create({
        name:req.body.name,
        tag:req.body.tag,
        exchanges:req.body.exchanges.split(','),
        rating:req.body.rating,
        tagImg:req.body.tagImg,
        coinDesc:req.body.coinDesc,
        coinType:req.body.coinType
    },function (err,coin){
        if (err) {
            sendJsonResponse(res,400,err);
        }
        else {
            sendJsonResponse(res,201,coin);
        }
    });
}

function setNewPair(req,res){
     sendJsonResponse(res,200,{'message':'it is stub'});

}

function updateCoins(req,res){
    var counter=0;
    if (!req.params.cointag){
        sendJsonResponse(res,400,{'message':'coin tag name is required'});
        return;
    }
    var promise=Coin.findOne({tag:req.params.cointag}).exec();
    promise
          .then(function (coin) {
            if(!coin) {
                throw new Error('Coin not found');
            } else {
              coin=safeUpdater.updateObject(req,coin);
              if (!coin) throw new Error('Nothing to update');
              return coin.save()
            }})
          .then(function(coin){
             sendJsonResponse(res,200,coin);
          })
          .catch(function (err) {sendJsonResponse(res,400,{'message':err.message});});

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