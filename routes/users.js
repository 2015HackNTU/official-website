require('../db');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

exports.user = function(req, res){
	Users.find(function(error, users){
		res.render('user', { title: 'User test', h1: 'User List', users: users});
	});
}

exports.create = function(req, res){
	console.log(req.body.name);
	var temp_user = new Users({
		name: req.body.name,
    	department: req.body.department,
    	email: req.body.email,
    	username: req.body.username,
    	password: req.body.password,
		created_at: Date.now(),
	});
	temp_user.save( function(error, Users){
		res.redirect('/');
	});
}

