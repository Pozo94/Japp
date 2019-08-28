var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var flash=require('connect-flash');
var app = express();
var user= require('./models/user');
mongoose.connect('mongodb://localhost/Sedziowanie');
var db = mongoose.connection;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var competitorsRouter = require('./routes/competitors');
var resultsRouter = require('./routes/results');
var judgingRouter = require('./routes/judging');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true

}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    res.locals.admin1 = req.admin || null;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/competitors', competitorsRouter);
app.use('/results', resultsRouter);
app.use('/judging', judgingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//Flash


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
