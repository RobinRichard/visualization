const unempcount = require('../models').unempcount;
module.exports = {
  // redirect to home page
  getindex(req,res){
  return unempcount.findAll()
    .then(unempcount => res.status(200).render("index",{"title":"working","data":unempcount}))
    .catch(error => res.status(400).send(error));
  },
  //fetch data from table and send to ajax as json
  getjsondata(req,res){
      return unempcount.findAll()
      .then(unemp => res.status(200).send(JSON.stringify(unemp)))
      .catch(error => res.status(400).send(error));
    },
     // redirect to inspiration page
  inspiration(req,res){
  return unempcount.findAll()
    .then(unempcount => res.status(200).render("inspiration"))
    .catch(error => res.status(400).send(error));
  },
};