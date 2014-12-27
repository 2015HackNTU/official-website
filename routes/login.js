var mongoose = require('mongoose');
var Users = mongoose.model('Users');
module.exports = function(app,passport){

	// Basic routing 
	app.get('/',function(req,res){
		res.render('index')
	});
	app.get('/profile', isLoggedIn, function(req,res){
		res.render('profile',{
			user : req.user
		});
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
			app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}))			
			/* Sign-up */
			app.get('/auth/facebook/callback',passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/login'
			}));

	// Already Registered //

		// locally //
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', 
			failureRedirect : '/connect/local', 
			failureFlash : true 
		}));

		// facebook //

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/login'
		}));

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}