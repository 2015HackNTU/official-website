var db = require('../config/db');
var mongoose = require('mongoose');
//var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')


/* Users Start*/
exports.users = function (req, res){
	//Display on User Page//
	Users.find(function(error, users){
    	res.render('user', { title: 'User test', users: users, message : ''});
  	});
  	console.log('>>>>> route through users.js fn exports.user <<<<<');
}
exports.users.create = function (req,res){
  	console.log('>>>>> route through users.js fn exports.user.create <<<<<');
    if(!req.user){
        Users.findOne({'local.email' : req.body.email}, function(err, user){
            if(err)
                res.redirect('/login')

            if(user){
                res.redirect('/user',{ message : 'Already Exists'}) 
            }else{
                var newUser = new Users();
                ///
                newUser.local.name = req.body.name;
                newUser.local.department = req.body.department;
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.creat_at = req.body.create_at;
                ///
                console.log('hi')
                newUser.save(function(err, user, count){
                    if(err)
                        res.redirect('/user');
                })
            }
        })
    }


    /*
	var user = new Users({
	   local:
        {
      		name : req.body.name,
      		department : req.body.department,
      		email : req.body.email,
      		password : user.generateHash(req.body.password),
      		creat_at : req.body.create_at
    	}
    	}).save( function( err, user, count ){
            console.log(user + "is created");
            if(err){
                res.render('error', {
                    message: err.message,
                    error: {}
                });
        }   
		console.log(req.body.department + "'s " + req.body.name + " is created.")
		res.redirect( '/user' );
	});
    */
};

exports.users.modify = function(req,res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      res.render('error',{
        message : err.message,
        error : {}
      })
    }
    if (!user)
        res.redirect('/profile',{message:"Modification not saved"})
    user.local.department = req.body.department;
    user.local.username = req.body.username;
    user.local.password = user.generateHash(req.body.password);

    user.save(function(err, user, count){
      res.redirect('/profile');
    })

  })

;}

exports.users.destroy = function(req,res){
	console.log(req.body.name + ' removed');
  	console.log('>>>>> route through users.js fn exports.user.destroy <<<<<');
  	// Delete //
  	Users.findById(req.params.id, function(err, user){
        if(err){
	        res.render('error', {
                message: err.message,
                error: {}
            });
        }   
    	user.remove( function(err, user){
      		res.redirect('/user');
		});
	});
};
/* Users End*/