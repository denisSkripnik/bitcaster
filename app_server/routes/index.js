var express = require('express');
var router = express.Router();
var ctrlLeading=require('../controllers/leading');
var ctrlAlpha=require('../controllers/alpha');

/* GET home page. */
router.get('/alpha',ctrlAlpha.alphapage);
router.get('/',ctrlLeading.leading);


module.exports = router;
