var mongoose = require('mongoose');
//var User=mongoose.model('users');

function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

function setNewUser(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function userLogin(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

module.exports.setNewUser=setNewUser;
module.exports.userLogin=userLogin;