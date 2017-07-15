var express=require('express');
var router=express.Router();

var ctrlData=require('../controllers/ctrlData');
var ctrlAuth=require('../controllers/ctrlAuth');
var ctrlUsers=require('../controllers/ctrlUsers');

//Public routers
router.get('/public/coins',ctrlData.getActiveCoins);
router.get('/public/pairs/:cointag',ctrlData.getPairs);
router.get('/public/reports/top',crtlData.getTopPairs);

//Capcha protected routers
router.post('/protected/register',ctrlAuth.setNewUser);
router.post('/protected/login',ctrlAuth.userLogin);
//Private routers for processors
router.post('/private/coins',crtlData.setNewCoin);
router.post('/private/pairs',ctrlData.setNewPair);
router.put('/private/coins/:cointag',ctrlData.updateCoins);
router.put('/private/pairs/:exchange/:pair',ctrlData.updatePairs);
router.post('/private/reports/top',ctrlData.setTopReport);
router.delete('/private/coins/:exchange/:pair');
router.get('/private/state/:exchange');
router.post('/private/state/:exchange');
//User private routers
router.post('/private/users/favorites',ctrlUsers.setFavorites);
router.get('/private/users/favorites',ctrlUsers.getFavorites);
router.delete('/private/users/favorites/:cointag',ctrlUsers.delFavorite);