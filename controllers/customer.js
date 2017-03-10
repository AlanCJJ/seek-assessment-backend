// customer controller, customer.js
var connection = require('../db/connection');
const TABLE_NAME = 'customers';

function index(){
  return getCustomers();
}

function checkCustomer(req){
   return getOneCustomerByName(req.query.name).then(function (res){
     console.log("Find cust: ", res);
    if (res.length <= 0){
       return addCustomer(req.query.name).then (function (results){
        return Promise.resolve({
          id: results.insertId,
          msg: "You can now enjoy purchasing ads as NORMAL customer."
        });
      });
    }else{
      return Promise.resolve({
        id: res[0].id,
        msg: "Enjoy buying."
      });
    }
  });
}



function getOneCustomerByName(name){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE name = ?', name, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function getCustomers(){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function addCustomer(name){
  return new Promise (function (resolve, reject){
    var data = {
      name: name,
    };
    connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

module.exports.index = index;
module.exports.checkCustomer = checkCustomer;
