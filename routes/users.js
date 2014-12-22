var db = require('../db');
var mongoose = require('mongoose');
//var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')


/* Users Start*/
exports.users = function (req, res){
	//Display on User Page//
	Users.find(function(error, users){
    	res.render('user', { title: 'User test', users: users});
  	});
  	console.log('>>>>> route through users.js fn exports.user <<<<<');
}
exports.users.create = function (req,res){
	console.log(req.body.name);
  	console.log('>>>>> route through users.js fn exports.user.create <<<<<');
	new Users({
		name : req.body.name,
		department : req.body.department,
		username : req.body.username,
		password : req.body.password,
		creat_at : req.body.create_at
	}).save( function( err, user, count ){
		console.log(req.body.department + "'s " + req.body.name + " is created.")
		res.redirect( '/user' );
	});
};
exports.users.destroy = function(req,res){
	console.log(req.body.name + ' removed');
  	console.log('>>>>> route through users.js fn exports.user.destroy <<<<<');
  	// Delete //
  	Users.findById(req.params.id, function(err, user){
    	user.remove( function(err, user){
      		res.redirect('/user');
		});
	});
};
/* Users End*/