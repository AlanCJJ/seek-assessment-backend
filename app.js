var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressVue = require('express-vue');
var cors = require('cors');

var index = require('./routes/index');
var customers = require('./routes/customers');
var ads = require('./routes/ads');
var rules = require('./routes/rules');
var privileges = require('./routes/privileges');
var carts = require('./routes/carts');
var connection = require('./db/connection');

var app = express();

connection.connect();

// console.log(connection);

// // log something to confirm connection
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('vue', {
    //ComponentsDir is optional if you are storing your components in a different directory than your views
    componentsDir: __dirname + '/components',
    //Default layout is optional it's a file and relative to the views path, it does not require a .vue extention.
    //If you want a custom layout set this to the location of your layout.vue file.
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/customers', customers);
app.use('/ads', ads);
app.use('/rules', rules);
app.use('/privileges', privileges);
app.use('/carts', carts);

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
  res.render('error', {
    data:{
      msg: err.message,
      status: "Error " + err.status,
      stack: err.stack,
    }
  });
});

module.exports = app;
