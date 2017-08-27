var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser')

var ctrlData=require('../controllers/ctrlData');
var ctrlAuth=require('../controllers/ctrlAuth');
var ctrlUsers=require('../controllers/ctrlUsers');
var ctrlStates=require('../controllers/ctrlStates');

//Public routers
router.get('/public/coins',ctrlData.getActiveCoins);
router.get('/public/pairs/:exchange/:cointag',ctrlData.getPairs);
router.get('/public/reports/:type',ctrlData.getTopPairs);

//Capcha protected routers
router.post('/protected/register',ctrlAuth.setNewUser);
router.post('/protected/login',ctrlAuth.userLogin);
//Private routers for processors
router.post('/private/coins',ctrlData.setNewCoin);
router.post('/private/pairs',ctrlData.setNewPair);
router.put('/private/coins/:cointag',bodyParser.json({reviver: 'reviveDates'}),ctrlData.updateCoins);
router.put('/private/pairs/:exchange/:pair',bodyParser.json({reviver: 'reviveDates'}),ctrlData.updatePairs);
router.post('/private/reports',bodyParser.json({reviver: 'reviveDates'}),ctrlData.setTopReport);
router.delete('/private/pairs/:exchange/:pair',ctrlData.delPair);
router.post('/private/coins/:coin/exchanges',ctrlStates.setExchange);
router.put('/private/coins/:coin/exchanges',bodyParser.json({reviver: 'reviveDates'}),ctrlStates.updateExchange)
//User private routers
router.post('/private/users/favorites',ctrlUsers.setFavorites);
router.get('/private/users/favorites',ctrlUsers.getFavorites);
router.delete('/private/users/favorites/:cointag',ctrlUsers.delFavorite);
//Comment

module.exports=router;