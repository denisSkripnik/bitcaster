
function sendJsonResponse(res,status,content) {
	res.status(status);
	res.json(content);
}

function getState(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

function setState(req,res){
	sendJsonResponse(res,200,{'message':'it is stub'});
}

module.exports.getState=getState;
module.exports.setState=setState;