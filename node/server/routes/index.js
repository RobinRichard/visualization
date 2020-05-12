var express = require('express');
var router = express.Router();



const unempcountController = require('../controllers').unempcount;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  

  app.get('/getjsondata', unempcountController.getjsondata);
  app.get('/', unempcountController.getindex);

  app.get('/inspiration', unempcountController.inspiration);

 

};


