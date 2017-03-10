// privilege controller, privilege.js
var a_controller = require('../controllers/ad');
var c_controller = require('../controllers/customer');
var r_controller = require('../controllers/rule');

var connection = require('../db/connection');
const TABLE_NAME = 'privilege';

function index(){
  return getPrivileges();
}

function create(req){
  return addPrivileges(req.body.cid, req.body.aid, req.body.rid);
}

function update(req){
  return updatePrivileges(req.body.id, req.body.cid, req.body.aid, req.body.rid);
}

function deletePrivileges(req){
  return removePrivileges(req.query.id);
}

function getAllLists(){
  return a_controller.index().then(function(adsRes){
    console.log(adsRes); // ad result
    return r_controller.index().then(function(ruleRes){
      console.log(ruleRes); // rule result
      return c_controller.index().then(function(custRes){
        console.log(custRes); // customer result
        return Promise.resolve(makeOptionList(adsRes, ruleRes, custRes));
      });
    });
  });
}

function makeOptionList(a, r, c){
  return {
    ads: a,
    rules: r,
    customers: c
  };
}

function getPrivileges(){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function getOnePrivilege(req){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', req.query.id, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function addPrivileges(cid, aid, rid){
  return new Promise (function (resolve, reject){
    var data = {
      customer_id: cid,
      ads_id: aid,
      rules_id: rid
    };
    connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function updatePrivileges(id, cid, aid, rid){
  return new Promise (function (resolve, reject){
    var data = {};
    if(cid){
      data.customer_id = cid;
    }
    if(aid){
      data.ads_id = aid;
    }
    if(rid){
      data.rules_id = rid;
    }
    connection.query('UPDATE ' + TABLE_NAME + ' SET ? WHERE id = ?', [data, id], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}


function removePrivileges(id){
  return new Promise (function (resolve, reject){
    connection.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', id, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function validateCreatePrivileges(req){
  console.log(req.body.id);
  if (typeof req.body.cid === "undefined") {
    return {
      isErr: true,
      msg: "Customer is required",
    };
  }
  if (typeof req.body.aid === "undefined") {
    return {
      isErr: true,
      msg: "Advertisement is required",
    };
  }
  if (typeof req.body.rid === "undefined") {
    return {
      isErr: true,
      msg: "Rule is required",
    };
  }
  return {
    isErr: false,
  };
}

function validateDeletePrivileges(req){
  console.log(req.query.id);
  if (typeof req.query.id === "undefined") {
    return {
      isErr: true,
      msg: "No privilege has been selected",
    };
  }
  return {
    isErr: false,
  };
}

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.deletePrivileges = deletePrivileges;
module.exports.validateCreatePrivileges = validateCreatePrivileges;
module.exports.validateDeletePrivileges = validateDeletePrivileges;
module.exports.getOnePrivilege = getOnePrivilege;
module.exports.getAllLists = getAllLists;
