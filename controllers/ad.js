// ad controller, ad.js
var connection = require('../db/connection');
const TABLE_NAME = 'ads';

function index(){
  return getAds();
}

function create(req){
  return addAds(req.body.name, req.body.price);
}

function update(req){
  return updateAds(req.body.id, req.body.name, req.body.price);
}

function deleteAds(req){
  return removeAds(req.query.id);
}

function getAds(){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function getOneAd(id){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', id, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function addAds(name, price){
  return new Promise (function (resolve, reject){
    var data = {
      name: name,
      price: price
    };
    connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function updateAds(id, name, price){
  return new Promise (function (resolve, reject){
    var data = {};
    if(name){
      data.name = name;
    }
    if(price) {
      data.price = price;
    }
    connection.query('UPDATE ' + TABLE_NAME + ' SET ? WHERE id = ?', [data, id], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}


function removeAds(id){
  return new Promise (function (resolve, reject){
    connection.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', id, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function validateCreateAds(req){
  console.log(req.body.name);
  if (typeof req.body.name === "undefined" || req.body.name.length <= 0) {
    return {
      isErr: true,
      msg: "Name is required",
    };
  }
  if (typeof req.body.price === "undefined" || req.body.price.length <= 0) {
    return {
      isErr: true,
      msg: "Price is required",
    };
  }
  return {
    isErr: false,
  };
}

function validateDeleteAds(req){
  console.log(req.query.id);
  if (typeof req.query.id === "undefined") {
    return {
      isErr: true,
      msg: "No advertisement has been selected",
    };
  }
  return {
    isErr: false,
  };
}

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteAds = deleteAds;
module.exports.validateCreateAds = validateCreateAds;
module.exports.validateDeleteAds = validateDeleteAds;
module.exports.getOneAd = getOneAd;
