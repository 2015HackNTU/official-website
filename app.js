var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db'); 

//var routes = require('./routes');
var index = require('./routes')
var blogposts = require('./routes/blogposts');
var users = require('./routes/users');
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

// Routes //
app.get('/', index.index);

app.get('/blog', blogposts.blogposts);
app.post('/blog/create', blogposts.blogposts.create);
app.get('/delete/:id', blogposts.blogposts.destroy);

app.get('/user', users.users);
app.post('/user/create', users.users.create);
app.get('/user/delete/:id', users.users.destroy);

app.get('/news', news.breakingnews);
app.post('/news/create', news.breakingnews.create);
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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
