/**
 * Created by pilagod on 3/17/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('course/course2');
});

//router.get('/2', function(req, res){
//    res.render('course/course2');
//});

module.exports = router;