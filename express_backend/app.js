var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var usersRouter = require('./api/routes/users');
var translationRouter = require('./api/routes/Translation')

translationRouter.options('*',cors({origin: true, credentials:true}))

var app = express();


app.use(cors({origin: true, credentials:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// set a an id cookie
app.use(function (req, res, next) {
  // check if client sent id cookie
  var cookie = req.cookies.id;
  if (cookie === undefined) {
    // no: set a new id cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.cookie('id',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, id cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next();
});



app.use('/users', usersRouter);
app.use("/translation", translationRouter);

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
  
});

module.exports = app;
