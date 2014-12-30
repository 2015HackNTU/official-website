var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var tempUsers = mongoose.model('tempUsers');

var configAuth = require('./auth');



module.exports = function(passport){


    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // ========================================================================
    // ==========================  LOCAL  =====================================
    // ========================================================================
    /* Local Sign-up */
    passport.use('local-signup', new LocalStrategy({
    	usernameField : 'email',
    	passwordField : 'password',
    	passReqToCallback : true
    },
    function(req, email, password, done){
    	if(email)
    		email = email.toLowerCase();

    	// asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                Users.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // create the user
                        var newTempUser            = new tempUsers();

                        newTempUser.local.name = req.body.name;
                        newTempUser.local.email    = email;
                        newTempUser.local.password = newTempUser.generateHash(password);
                        newTempUser.local.creat_at = req.body.create_at;

                ///
                newTempUser.save(function(err, user, count){
                    if(err)
                        res.redirect('/user');
                })
                        newTempUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newTempUser, req.flash('profileMessage','Sign-up successfully'));
                        });
                    }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.local.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                Users.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            
                            return done(null,user,req.flash('profileMessage','Local Linked'));
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }))
    /* Local Login */
    passport.use('local-login', new LocalStrategy({
    	usernameField : 'email',
    	passwordField : 'password',
    	passReqToCallback : true
    },
    function(req, email, password, done){
    	Users.findOne({'local.email': email}, function(err, user){
    		console.log('User:'+user);
    		if(err)
    				return done(err, false, req.flash('loginMessage', 'User Not Found.'))
                console.log(password)
    		if(!user||email===null){
    			console.log('user not found');
    			return done(null, false, req.flash('loginMessage', 'User Not Found.'))
    		}else if(!user.validPassword(password)||password===null){
    			console.log(user+" wrong password")
    			return done(null, false, req.flash('loginMessage', 'Wrong Password'))
    		}
    		else{
    			return done(null, user, req.flash('profileMessage', 'Successful logged-in'));
    		}
    	});
    }));

    // ========================================================================
    // =======================  FACEBOOK =========+============================
    // ========================================================================
    // Log-in //
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebook.clientID,
        clientSecret    : configAuth.facebook.clientSecret,
        callbackURL     : configAuth.facebook.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {
                // if not logged-in
                console.log(req.user)
                Users.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }
                        console.log('good')

                        return done(null, user, req.flash( 'profileMessage', 'Successful logged-in.' ) ); // user found, return that user
                    } else {
                        console.log('signup first')
                        return done(null ,false ,  req.flash( 'signupMessage', 'You have to signup first') );
                    }
                });

            } else {
                // Link 
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                    console.log('Linked')
                    return done(null, user, req.flash( 'profileMessage', 'Successful linked.') ) ;
                });
                    console.log('Failed')

            }
        });

    }));

/*
    // Link Facebook //
    passport.use('facebookLink',new FacebookStrategy({

        clientID        : configAuth.facebookLink.clientID,
        clientSecret    : configAuth.facebookLink.clientSecret,
        callbackURL     : configAuth.facebookLink.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {
            console.log(profile)
            // check if the user is already logged in
            if (req.user) {
                // if logged-in, then link facebook //
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);

                    return done(null, user, req.flash( 'profileMessage', 'Successful linked.') ) ;
                });

            }else{
                return done(null, false, req.flash( 'profileMessage', '') );
            }
        });

    }));
*/

};