var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('home/home2');
});

module.exports = router;