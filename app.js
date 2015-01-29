var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var db = require('./config/db'); 

//var routes = require('./routes');
var index = require('./routes')
var blogposts = require('./routes/blogposts');
var news = require('./routes/news');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/client')));


// Setup Passport.js
app.use(session({ secret: 'lulalachen' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


/***** Routes *****/
require('./config/passport')(passport); // pass passport for configuration
require('./routes/login')(app,passport);
require('./routes/frontEndTest')(app);

app.get('/', index.index);

// Posts //
    /* Front */ 
    // app.get('/api/posts', blogposts.blogposts); // Get all Posts
    // app.get('/api/posts/:id', blogposts.findPosts); // Find specific post by sending _id
    //GET METHOD
    app.get('/api/posts', function(req, res){
        return db.BlogPosts.find(function(err, post){
            if(!err){
                return res.send(post);
            }
            else{
                return res.send("Error!");
            }
        });
    });
    //GET METHOD BY ID.
    app.get('/api/posts/:pid', function(req, res){
        return db.BlogPosts.findOne({_id: req.params.id}, function(err, post){
            if(!err){
                return res.send(post);
            }
            else{
                return res.send("Error!");
            }
        });
    });

    /* Back */
    app.get('/posts/new', blogposts.newPosts); // Link to create posts page
    app.post('/posts/create', blogposts.create); // Create new posts
    app.get('/posts/edit/:id',blogposts.edit); // Link to Edit page
    app.post('/posts/edit/:id', blogposts.editUpdate) // Save Edited posts
    app.get('/posts/delete/:id', blogposts.destroy); // Delete posts
// Posts //


// News //
    /* Front */
    app.get('/api/news', news.breakingnews); // Get all News
    app.get('/api/news/:id',news.findNews); // Find specific news by sending _id
    /* Back */
    app.get('/news/new', news.newPosts); // Link to create news page
    app.post('/news/create', news.create); // Create news
    app.get('/news/edit/:id', news.edit); // Link to edit page
    app.post('/news/edit/:id', news.editUpdate); //Save edited news
    app.get('/news/isImportant/:id', news.isImportant); // Toggle importancy
    app.get('/news/delete/:id', news.destroy); // Delete news
// News //


// Calendar //
    
    /* Front */
    //app.post('/calendar',calendar.read)
    /* Back */

// Calendar //



////////////////////////////
app.listen(1337, function () {

  var host = 'localhost'
  var port = 1337

  console.log('App listening at http://%s:%s', host, port)

})
////////////////////////////

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('client/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('client/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
