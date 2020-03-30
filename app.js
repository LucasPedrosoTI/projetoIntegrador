var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const viewRouter = require('./routes/routes')

// var usersRouter = require('./routes/users');
// const accountRouter = require('./routes/account');

var app = express();

app.use('/public/stylesheets/', express.static('./public/stylesheets'));
app.use('/public/images/', express.static('./public/images'));
app.use('/public/javascripts/', express.static('./public/javascripts'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter)

// app.use('/users', usersRouter);
// app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;