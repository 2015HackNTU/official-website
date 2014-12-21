var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db'); 

var routes = require('./routes');

var index = require('./routes/index');
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

/* ~~~ */

var routes = require('./routes');

app.get('/',routes.index);
app.get('/delete/:id', routes.remove);
app.get('/complete/:id', routes.completed);
app.get('/uncomplete/:id', routes.uncomplete)
app.post('/create', routes.create);

app.get('/user', routes.user);
app.post('/user/create', routes.user.create);
app.get('/user/delete/:id', routes.user.destroy);


/* ~~~ */
/*
var routes = require('./routes');
app.get('/',routes.index);

app.get('/delete/:id', routes.remove);
app.get('/complete/:id', routes.completed);
app.get('/uncomplete/:id', routes.uncomplete)
app.post('/create', routes.create);

app.get('/user', routes.user);
app.post('/user/create', routes.user.create);
app.get('/user/delete/:id', routes.user.destroy);
console.log("Creating HTTP server..");
*/

app.use('/', index);
app.use('/users', users);
app.use('/news',news);

app.get('/users', routes.users);
app.post( '/users/create', routes.users.create );


////////////////////////////
app.listen(3000, function () {

  var host = 'localhost'
  var port = server.address().port

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
