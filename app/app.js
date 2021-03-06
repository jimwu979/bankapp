var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const fs = require('fs');
const url = require('url');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var albumRouter = require('./routes/albumApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/photo', express.static(__dirname + '/photo'));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/album', albumRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  fs.readFile(__dirname + '/public/index.html', (err, data) => {
    res.end(data);
  })
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