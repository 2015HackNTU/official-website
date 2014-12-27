var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');

module.exports = function(app,passport){

	var users = require('./users');
	app.get('/user', users.users);
	app.post('/user/create', users.users.create)
	app.get('/user/edit/:id',isLoggedIn, users.users.edit)
	app.post('/user/edit/:id', isLoggedIn, users.users.modify);
	app.get('/user/delete/:id', users.users.destroy);

	// Basic routing 
	app.get('/',function(req,res){
		res.render('index')
	});
	app.get('/profile', isLoggedIn, function(req,res){
		BreakingNews.find(function(err, news){
			BlogPosts.find(function(err, posts){
				res.render('profile',{
					user : req.user,
					posts : posts,
					news : news
				});
			})
		})
	});
	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/login');
	});

	app.get('/user/edit',function(req,res){
		res.render('useredit',{
			user : req.user
		});
	});



	// Authenticate //
	/* FIRST LOGIN */

		// Local //
			/* Login */
			app.get('/login',function(req,res){
				console.log(req.flash)
				res.render('login', { message : req.flash('loginMessage') });
			})
			app.post('/login', passport.authenticate('local-login',{
				successRedirect : '/profile',
				failreRedirect : '/login',
				failureFlash : true
			}))
			/* Sign-up */
			app.get('/signup',function(req,res){
				res.render('signup', { message : req.flash('signipMessage') });
			})
			app.post('/signup',passport.authenticate('local-signup',{
				successRedirect : '/profile',
				failreRedirect : '/signup',
				failureFlash : true
			}))

		// Facebook //
			/* Login */
			app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }))			
			/* Sign-up */
			app.get('/auth/facebook/callback',passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/signup'
			}));

	// Already Registered //

		// locally //
			/* LINK */
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', 
			failureRedirect : '/connect/local', 
			failureFlash : true 
		}));
			/* UNLINK */
		app.get('/unlink/local', isLoggedIn, function(req, res) {
			var user            = req.user;
			user.local.email    = undefined;
			user.local.password = undefined;
			user.save(function(err) {
				res.redirect('/profile');
			});
		});



		// facebook //
			/* LINK */
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
		app.get('/connect/facebook/callback',passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/login'
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