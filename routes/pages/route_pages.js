var express = require('express');
var router = express.Router();

var route_blog = require('./blog/route_blog');
var route_community = require('./community/route_community');
var route_course = require('./course/route_course');
var route_hackathon = require('./hackathon/route_hackathon');
var route_hackcampus = require('./hackcampus/route_hackcampus');
var route_home = require('./home/route_home');

router.use('/', route_home);
router.use('/blog', route_blog);
router.use('/community', route_community);
router.use('/course', route_course);
router.use('/hackathon', route_hackathon);
router.use('/hackcampus', route_hackcampus);

module.exports = router;