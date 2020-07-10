'use strict';
var session = require('express-session');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));



//use session for login
app.use(session( {
  secret: "i love myself",
  resave: true,
  saveUninitialized: false 
}));

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// view engine setup
app.engine('pug', require('pug').__express)//
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;// catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('File Not Found');
      err.status = 404;
      next(err);
    });
    
    // error handler
    // define as the last app.use callback
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
    next(err);
  });
  
  // error handler
  // define as the last app.use callback
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

app.listen(3000 , ()=>{

    console.log("running");
})



