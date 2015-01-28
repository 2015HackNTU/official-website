var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');

module.exports = function(app,passport){

	var users = require('./users');
	app.get('/user', users.users);
	app.post('/user/create', users.create)
	app.get('/user/edit/:id',isLoggedIn, users.edit)
	app.post('/user/edit/:id', isLoggedIn, users.modify);
	app.get('/user/delete/:id', users.destroy);
	app.get('/user/authenticate/:id', users.authenticate );

	// Basic routing 
	app.get('/',function(req,res){
		res.render('client/index')
	});
	app.get('/profile', isLoggedIn, function(req,res){
		BreakingNews.find(function(err, news){
			BlogPosts.find(function(err, posts){
				res.render('admin/profile',{
					user : req.user,
					posts : posts,
					news : news,
					message : req.flash('profileMessage')
				});
			})
		})
	});
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});

	app.get('/user/edit',function(req,res){
		res.render('admin/useredit',{
			user : req.user
		});
	});



	// Authenticate //
	/* FIRST LOGIN */

		// Local //
			/* Login */
			app.get('/login',function(req,res){
				//req.flash('loginMessage','hi')
				//console.log(req.flash('loginMessage'))

				res.render('admin/login', { message : req.flash('loginMessage') });
			})
			app.post('/login', passport.authenticate('local-login',{
				successRedirect : '/profile',
				failureRedirect : '/login',
				//failureFlash : true			
			}))
			/* Sign-up */
			app.get('/signup',function(req,res){
				res.render('admin/signup', { message : req.flash('signupMessage') });
			})
			app.post('/signup',passport.authenticate('local-signup',{
				successRedirect : '/profile',
				failureRedirect : '/signup',
				failureFlash : true
			}))

		// Facebook //
			/* Login */
			app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))
			app.get('/auth/facebook/callback', passport.authenticate('facebook',{
				successRedirect : '/profile',
				failureRedirect : '/login',
				successFlash : true,
				failureFlash : true
			}))			

	// Already Registered //

		// facebook //
			/* LINK */
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
		app.get('/connect/facebook/callback',passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/profile',
			successFlash : true,
			failureFlash : true
		}));
			/* UNLINK */
		app.get('/unlink/facebook', isLoggedIn, function(req, res) {
			var user            = req.user;
			user.facebook.id = undefined;
			user.facebook.email = undefined;
			user.facebook.token = undefined;
			user.save(function(err) {
				res.redirect('/profile');
			});
		});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}