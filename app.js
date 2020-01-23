var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const express = require('express')
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
// DB CONFIGURATION
const db = require("./config/keys");
  
 // Connect to Mongo 
 mongoose.connect(db, { useUnifiedTopology: true , useNewUrlParser: true}).then(() => console.log('MongoDB  is connected')).catch(err =>console.log(err))


// view engine setup
app.use(expressLayouts)
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   const{authorization} = req.headers
//   if (req.method === 'GET') {
//     next()
//     return
//   }
//   else if (!authorization) {
//     res.status(403).send('no authorization')
//   }
//   else {
//     next()
//   }


  
// }) 

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
