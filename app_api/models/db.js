var mongoose=require('mongoose');

dbURI='mongodb://localhost/bitcaster'
if (process.env.NODE_ENV=='production'){
	dbURI='mongodb://bitcaster_api:pyv!l53rf@ds151702.mlab.com:51702/heroku_lp017q5m'
};

mongoose.connect(dbURI);

function gracefulShutdown(msg,callback) {
	mongoose.connection.close(function(){console.log('Dissconnected '+msg);});
	callback();
}
process.once('SIGUSR2',function (){gracefulShutdown('nodemon restart',function() {process.kill(process.pid,'SIGUSR2');});});
process.once('SIGIN',function (){gracefulShutdown('app termination',function() {process.exit(0);});});
process.once('SIGTERM',function (){gracefulShutdown('nodemon restart',function() {process.exit(0);})});

require('./coins');
require('./users');
require('./pairs');
require('./topReport');
require('./processingState');