var passport = require('passport');
var fbStrategy=require('passport-facebook').Strategy;
var mongoose=require('mongoose');
var User=mongoose.model('Users');

passport.use(new fbStrategy({
	clientID:process.env.FACEBOOK_APP_ID,
	clientSecret:process.env.FACEBOOK_APP_SECRET,
	callbackURL:process.env.FACEBOOK_CALLBACK_URL
},function (accessToken, refreshToken, profile, cb){
	var promise=User.findOne({Поиск по мылу!!!}).exec();
	promise
	      .then(function(user){
	      	if (!user){
	      		return User.create({
	      			type:'Self',
	      			facebook:{
	      				id:profile.id,
	      				token:profile.
	      			}
	      		})
	      	}
	      })

}

)); 