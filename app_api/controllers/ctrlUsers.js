var mongoose = require('mongoose');
//var User=mongoose.model('users');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

function setFavorites(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function getFavorites(req,res){
    sendJsonResponse(res,200,{'message':'it is stub'});
}

function delFavorite(req,res){
    sendJsonResponse(res,200,{'message':'it is stub'});
}

module.exports.setFavorites=setFavorites;
module.exports.getFavorites=getFavorites;
module.exports.delFavorite=delFavorite;