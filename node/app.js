'use strict';
var createError = require('http-errors');
const express = require('express');
var path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();
var XLSX = require('xlsx');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const unempcount = require('./server/models').unempcount;

// Require our routes into the application.
require('./server/routes')(app);




//get data from Excel D:\ARULR1\Visualization\asserts\data
var workbook = XLSX.readFile('../asserts/data/unempcount.xlsx');
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';
var worksheet = workbook.Sheets[first_sheet_name];
var json = XLSX.utils.sheet_to_json(worksheet);
var dataobject = []
json.forEach(function(entry) {
  var agegroup=entry.agegroup;
  var gender=entry.gender;
  var country=entry.country;

  var yeardata={}
  for(var i = 1981; i < 2006;i++) {
      yeardata[i] = entry[i]
  }
  dataobject.push({"agegroup":agegroup,"gender":gender,"country":country,"data":yeardata})
});
var jsonobject=JSON.stringify(dataobject);

//To Insert entire object to table
//unempcount.bulkCreate(dataobject);

//show excel data as json
app.get('/showexceldata', (req, res) => res.status(200).send({
   message:jsonobject,
}));


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
