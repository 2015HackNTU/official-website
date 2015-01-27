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


// Routes //
require('./config/passport')(passport); // pass passport for configuration
require('./routes/login')(app,passport);
require('./routes/frontEndTest')(app);

app.get('/', index.index);

app.get('/api/posts', blogposts.blogposts);
app.get('/posts/new', blogposts.blogposts.newPosts);
app.post('/posts/create', blogposts.blogposts.create);
app.get('/posts/edit/:id',blogposts.blogposts.edit);
app.post('/posts/edit/:id', blogposts.blogposts.editUpdate)
app.get('/posts/delete/:id', blogposts.blogposts.destroy);


app.get('/api/news', news.breakingnews);
app.post('/news/create', news.breakingnews.create);
app.get('/news/new', news.breakingnews.newPosts);
app.get('/news/edit/:id', news.breakingnews.edit);
app.post('/news/edit/:id', news.breakingnews.editUpdate);
app.get('/news/isImportant/:id', news.breakingnews.isImportant);
app.get('/news/delete/:id', news.breakingnews.destroy);
// Routes //


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
