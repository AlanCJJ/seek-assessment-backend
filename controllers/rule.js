// rule controller, rule.js
/*
Rules type:
1 = FOR deal ( buy 4 for 3 )
2 = Direct Drop deal (drop to $399.00, original is $499.00)
3 = Conditional Drop deal ( if buy >= 5, drop to $299 each, ori $499)
*/
var connection = require('../db/connection');
const TABLE_NAME = 'rules';

function index(){
  return getRules();
}

function create(req){
  return addRules(req.body.type, req.body.condition, req.body.result);
}

function update(req){
  return updateRules(req.body.id, req.body.type, req.body.condition, req.body.result);
}

function deleteRules(req){
  return removeRules(req.query.id);
}

function getRules(){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function getOneRule(req){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', req.query.id, function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function addRules(type, condition, result){
  return new Promise (function (resolve, reject){
    var data = {
      type: type,
      condition: condition,
      result: result
    };
    connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function updateRules(id, type, condition, result){
  return new Promise (function (resolve, reject){
    var data = {};
    if(type){
      data.type = type;
    }
    if(condition) {
      data.condition = condition;
    }
    if(result) {
      data.result = result;
    }
    connection.query('UPDATE ' + TABLE_NAME + ' SET ? WHERE id = ?', [data, id], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}


function removeRules(id){
  return new Promise (function (resolve, reject){
    connection.query('DELETE FROM ' + TABLE_NAME + ' WHERE id = ?', id, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function findRules(id){
  id = parseInt(id);
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE id = ?', id, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function validateCreateRules(req){
  console.log(req.body.type);
  if (typeof req.body.type === "undefined") {
    return {
      isErr: true,
      msg: "Type is required",
    };
  }
  if (typeof req.body.condition === "undefined") {
    return {
      isErr: true,
      msg: "Condition is required",
    };
  }
  if (typeof req.body.result === "undefined") {
    return {
      isErr: true,
      msg: "Result is required",
    };
  }
  return {
    isErr: false,
  };
}

function validateDeleteRules(req){
  console.log(req.query.id);
  if (typeof req.query.id === "undefined") {
    return {
      isErr: true,
      msg: "No rule has been selected",
    };
  }
  return {
    isErr: false,
  };
}

function validateUpdateRules(req){
  console.log(req.body.id);
  if (typeof req.body.id === "undefined") {
    return {
      isErr: true,
      msg: "No rule has been selected",
    };
  } else {
    return findRules(req.body.id).then(function(result){
      console.log(result);
      if (result.length){
        return Promise.resolve ({
          isErr: false,
        });
      }else{
        console.log("In else");
        return Promise.resolve ({
          isErr: true,
          msg: "Rule selected is not exist",
        });
      }
    });
  }
}

module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.deleteRules = deleteRules;
module.exports.validateCreateRules = validateCreateRules;
module.exports.validateDeleteRules = validateDeleteRules;
module.exports.validateUpdateRules = validateUpdateRules;
module.exports.getOneRule = getOneRule;
