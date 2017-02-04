var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var session = require('express-session');


var index = require('./routes/index');
var user = require('./routes/user');
var introduction = require('./routes/introduction');
var panel = require('./routes/panel');
var api = require('./routes/api');
var contact = require('./routes/contact');
var feedback = require('./routes/feedback');
var news = require("./routes/news");
var article = require('./routes/article');
var photo = require('./routes/photo');

var mongoose = require('mongoose');
var session = require('express-session');
mongoose.connect('mongodb://127.0.0.1/goldenelder');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(session({
          secret: 'hubwiz app', //secret的值建议使用随机字符串
                  cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

//app.use(bodyParser({uploadDir:'./public/upload'}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(busboy()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/introduction', introduction);
app.use('/panel', panel);
app.use('/api', api);
app.use('/contact',contact);
app.use('/feedback',feedback);
app.use('/news',news);
app.use('/article',article);
app.use('/photo',photo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
