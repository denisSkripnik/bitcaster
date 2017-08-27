var mongoose = require('mongoose');
var Coin = mongoose.model('Coins');
var Pair= mongoose.model('pairs');
var Report=mongoose.model('topReport');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

var dataFuncs=(function(){
    function updateObject(req,doc){
        var cnt=0;
        for (i in req.body) {
            if (i=='_id' || i=='_v') continue;  //Protection
            if (i in doc.schema.paths){
                doc[i]=req.body[i];
                cnt++;
            }
        }
         if (cnt>0) { doc.lastUpdate=Date.now(); 
                      return doc;
                    }
         else {return false;}
    }
    function getDate(dateString,res){
      if (!dateString) {var tempDate=new Date();}
   else {
    try{
    var tempDate=new Date(dateString);
    if (isNaN(tempDate.getDay())) throw new Error('Invalid Date');

  }
    catch(err){
      sendJsonResponse(res,400,{'message':err.message});
    }

  }
  var date = new Date (tempDate.toDateString());
  return date;
    }

    return {
        updateObject:updateObject,
        getDate:getDate
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
            	if (req.payload && req.payload.favoriteCoins>0){
                   coins.forEach(function(coin){
                   	if (coin.short_num in req.payload.favoriteCoins){
                   		coin.rating+=100
                   	}
                   })
            	}
            	sendJsonResponse(res,200,coins);
            }
        });
}

function getPairs(req,res){
    //All possibly requests
	var mongoReq=[{exchange:req.params.exchange,quoteCoin:req.params.cointag},
                  {exchange:req.params.exchange},
                  {quoteCoin:req.params.cointag},
                  {}
             ];
    var reqParam;
        if(req.params.exchange!='all' && req.params.cointag!='all'){
            reqParam=0;
        }
        else if(req.params.exchange!='all'){
            reqParam=1;
        }
        else if(req.params.cointag!='all'){
            reqParam=2;
        }
        else{reqParam=3};
        promise=Pair.find(mongoReq[reqParam]).exec();
        promise
               .then(function(pairs){
                if(!pairs) throw new Error('Coin not found');
                else if(pairs.length==0)  throw new Error('Coin not found');
                sendJsonResponse(res,200,pairs);
               })
               .catch(function(err){sendJsonResponse(res,400,{'message':err.message});});
}
   


function getTopPairs(req,res){
  var date=dataFuncs.getDate(req.query.date,res);
  var promise=Report.findOne({type:req.params.type,date:{'$gte':date}}).exec();
  promise
        .then(function(report){
          if(!report) throw new Error('Report not found');
          sendJsonResponse(res,200,report);
        })
        .catch(function(err){sendJsonResponse(res,400,{'message':err.message});});
}

function setNewCoin(req,res){
	Coin.create({
        name:req.body.name,
        tag:req.body.tag,
        rating:req.body.rating,
        tagImg:req.body.tagImg,
        coinDesc:req.body.coinDesc,
        coinType:req.body.coinType,
        miningAlgo:req.body.miningAlgo
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
    var promise=Pair.create({
        pair:req.body.pair,
        quoteCoin:req.body.quoteCoin,
        baseCoin:req.body.baseCoin,
        exchange:req.body.exchange,
        isForMedian:req.body.isForMedian
    });
    promise
          .then(function(pair){
            sendJsonResponse(res,200,pair);
          })
          .catch(function(err){
            sendJsonResponse(res,400,err);
          });

}

function updateCoins(req,res){
    var promise=Coin.findOne({tag:req.params.cointag}).exec();
    promise
          .then(function (coin) {
            if(!coin) {
                throw new Error('Coin not found');
            } else {
              coin=dataFuncs.updateObject(req,coin);
              if (!coin) throw new Error('Nothing to update');
              return coin.save()
            }})
          .then(function(coin){
             sendJsonResponse(res,200,coin);
          })
          .catch(function (err) {sendJsonResponse(res,400,{'message':err.message});});

}

function updatePairs(req,res){
    var promise=Pair.findOne({exchange:req.params.exchange,pair:req.params.pair}).exec();
    promise
           .then(function(pair){
            console.log(req.body);
            if(!pair) throw new Error('Pair not found');
            pair=dataFuncs.updateObject(req,pair);
            if(!pair) throw new Error('Nothing to update');
            return pair.save()
           })
           .then(function(pair){
            sendJsonResponse(res,200,pair);
           })
           .catch(function(err){sendJsonResponse(res,400,{'message':err.message})});    
}

function setTopReport(req,res){
   var promise=Report.create(req.body);
   promise
          .then(function(rep){
            sendJsonResponse(res,200,rep);
          })
          .catch(function(err){sendJsonResponse(res,400,{'message':err.message})});
   
}

function delPair(req,res){
  var promise=Pair.deleteOne({exchange:req.params.exchange,pair:req.params.pair});
  promise
        .then(function(){sendJsonResponse(res,204,null);})
        .catch(function(err){sendJsonResponse(res,400,err)});
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