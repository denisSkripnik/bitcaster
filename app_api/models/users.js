var mongoose=require('mongoose');
var jwt = require('jsonwebtoken');

var usersSchema=new mongoose.Schema({
	email:{type:String,required:true},
	type:{type:String,required:true},
	apikey:{type:String},
	facebook:{
		id:String,
		token:String,
		email:String,
		name:String
	},
	twitter:{
		id:String,
		token:String,
		name:String,
		username:String
	}

});

usersSchema.methods.getJWT=function(provider){
	var expiry=new Date();
	expiry.setDate(expiry.getDate()+7);
	return jwt.sign({
		_id:this.id,
		type:this.type,
		name:this[provider].name,
		exp:parseInt(expiry.getTime()/1000),
	},process.env.JWT_SECRET);
}

mongoose.model('Users',usersSchema,'users');
