var db = require('../config/db');
var mongoose = require('mongoose');
//var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')
var tempUsers = mongoose.model('tempUsers')


/* Users Start*/
exports.users = function (req, res){
    //Display on User Page//
    Users.find(function(error, users){
    tempUsers.find(function(err, tempUsers){
        res.render('admin/user', { 
        title : 'User test',
        users : users,
        tempUsers : tempUsers,
        message : ''
      });
    })
    });
    console.log('>>>>> route through users.js fn exports.user <<<<<');
}
exports.create = function (req,res){
    console.log('>>>>> route through users.js fn exports.user.create <<<<<');
    // Applying 
    if(!req.user){
        Users.findOne({'local.email' : req.body.email}, function(err, user){
          tempUsers.find({'local.email' : req.body.email}, function(err,tempUser){
            if(err)
              res.redirect('/login')

            if(user){
              res.redirect('/signup',{ message : 'Already Exists'}) 
            }else if (tempUser){
              res.redirect('/signup'), { message : 'You\'re still authenticating, please wait.' }
            }else {
                var newTempUser = new tempUsers(); // create a tempUser to be authenticate
                ///
                newTempUser.local.name = req.body.name;
                newTempUser.local.department = req.body.department;
                newTempUser.local.email = req.body.email;
                newTempUser.local.password = newTempUser.generateHash(req.body.password);
                newTempUser.local.creat_at = req.body.create_at;
                ///
                newTempUser.save(function(err, user, count){
                    if(err)
                        res.redirect('/login');
                      console.log('tempUser : ' + user.local.name );
                })
            }
          })
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
exports.authenticate = function(req,res){
  tempUsers.findById(req.params.id, function(err,tempUser){
    if(!tempUser.isAuthenticate) { // Avoid double authentication
      var newUser = new Users(); // New Users object

      /// Copy infomation to authenticate user
      newUser.local.name = tempUser.local.name;
      newUser.local.department = tempUser.local.department;
      newUser.local.email = tempUser.local.email;
      newUser.local.password = tempUser.local.password;
      newUser.local.create_at = tempUser.local.creat_at;
      ///

      // Record authentication
      tempUser.isAuthenticate = true;
      console.log(tempUser.isAuthenticate)
      tempUser.authenticate_at = Date.now();
      tempUser.save(function(err, tempUser, count){
        newUser.save(function(err, newUser, count){
          if(err)
            res.redirect('/user');
          res.redirect('/user');
        })
      })
    } else {
        res.redirect('/user');
    }
  })
};
exports.edit =function(req,res){
    res.render('admin/profile',{ 
      user : req.user,
      posts : req.posts,
      news : req.news,
      message : 'edit'
    })
    /*
    res.render('useredit',{
        user : req.user,
        posts : req.posts,
        news : req.news
    })
    */
}
exports.modify = function(req,res){
  Users.findById(req.params.id, function(err, user){
    if(err){
      res.render('error',{
        message : err.message,
        error : {}
      })
    }
    if (!user)
        res.redirect('/profile',{ message:"Modification not saved" })

    // Save modification
        user.local.name = req.body.name;
        user.local.department = req.body.department;
        //user.local.password = user.generateHash(req.body.password);


    user.save(function(err, user, count){
        res.redirect('/profile');
    })

  });
}



exports.destroy = function(req,res){
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