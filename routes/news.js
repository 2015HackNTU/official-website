var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

//var news = require('../controller/news');
/* GET users listing. */

exports.create = function ( req, res ){
	new User({
		name : req.body.name,
		department : req.body.department,
		username : req.body.username,
		password : req.body.password,
		creat_at : req.body.create_at
		}).save( function( err, user, count ){
		res.redirect( '/news' );
	});
};

exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  Todo.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};
exports.index = function ( req, res ){
  User.find( function ( err, todos, count ){
    res.render( 'index', {
        title : 'Express Todo Example',
        users : users
    });
  });
};

