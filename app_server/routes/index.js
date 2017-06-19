var express = require('express');
var router = express.Router();
var ctrlLeading=require('../controllers/leading');

/* GET home page. */
router.get('/',ctrlLeading.leading);

module.exports = router;
