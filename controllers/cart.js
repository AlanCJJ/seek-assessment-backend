// cart controller, cart.js
var connection = require('../db/connection');
const TABLE_NAME = 'carts';

function index(){
  return getCarts();
}

function create(req){
  return addCarts(req.query.cid, req.query.aid, req.query.qty);
}

function update(req){
  return updateCarts(req.query.id, req.query.cid, req.query.aid, req.query.qty);
}

function checkout(cid, aid, qty){
  return checkPrivileges(cid, aid).then(function(privilegeRes){
    console.log(privilegeRes); // privilege result
    return getAds(aid).then(function(adsRes){
      console.log(adsRes); // ad result
      if (privilegeRes.length){
          return checkRules(privilegeRes[0].rules_id).then(function(ruleRes){
            console.log(ruleRes); // rule result
            console.log(privilegeRes); // privilege result
            return Promise.resolve(calPrice(ruleRes[0].type, ruleRes[0].condition, ruleRes[0].result, qty, adsRes[0].price));
          });
      }else{
        return Promise.resolve(calPrice(0, 0, 0, qty, adsRes[0].price));
      }
    });
  });
}

function deleteCarts(req){
  return removeCarts(req.query.cid, req.query.aid);
}

function getCarts(){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function getCartByCustomerId(req){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE customer_id = ?', req.query.cid , function (error, results, fields) {
      if (error) return reject(error);
      resolve(results);
    });
  });
}


function addCarts(cid, aid, qty){
  return new Promise (function (resolve, reject){
    var data = {
      customer_id: cid,
      ads_id: aid,
      quantity: qty
    };
    console.log('Add to cart data: ', data);
    connection.query('SELECT * FROM ' + TABLE_NAME + ' WHERE customer_id = ? AND ads_id = ?', [cid, aid], function (error, results, fields){
      console.log('Result ', results);
      if(results.length > 0){
        return connection.query('UPDATE ' + TABLE_NAME + ' SET quantity = quantity + ' + qty + ' WHERE customer_id = ? AND ads_id = ?', [cid, aid] , function (error, results, fields){
          if (error) return reject(error);
          resolve(results);
        });
      }else{
        return connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
          if (error) return reject(error);
          resolve(results);
        });
      }
    });
    // connection.query('INSERT INTO ' + TABLE_NAME + ' SET ?', data, function (error, results, fields){
    //   if (error) return reject(error);
    //   resolve(results);
    // });
  });
}

function updateCarts(id, cid, aid, qty){
  return new Promise (function (resolve, reject){
    var data = {};
    if(cid){
      data.customer_id = cid;
    }
    if(aid){
      data.ads_id = aid;
    }
    if(qty){
      data.quantity = qty;
    }
    connection.query('UPDATE ' + TABLE_NAME + ' SET ? WHERE id = ?', [data, id], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function removeCarts(cid, aid){
  return new Promise (function (resolve, reject){
    connection.query('DELETE FROM ' + TABLE_NAME + ' WHERE customer_id = ? AND ads_id = ?', [cid, aid], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function checkPrivileges(cid, aid){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM privilege WHERE customer_id = ? AND ads_id = ?', [cid, aid], function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    })
  })
}

function checkRules(rid){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM rules WHERE id = ? ', rid, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    })
  })
}

function getAds(aid){
  return new Promise (function (resolve, reject){
    connection.query('SELECT * FROM ads WHERE id = ?', aid, function (error, results, fields){
      if (error) return reject(error);
      resolve(results);
    })
  })
}

function calPrice(type, condition, result, qty, price){
  var dealPrice;
  switch (type){
    case 1: //for deal
      qty = parseInt(qty);
      condition = parseInt(condition);
      result = parseInt(result);
      dealPrice = ((parseInt(qty / condition) * result) + (qty % condition)) * price;
      dealPrice = parseFloat(dealPrice).toFixed(2);
      console.log(dealPrice);
      break;
    case 2://direct drop
      dealPrice = qty * result;
      dealPrice = parseFloat(dealPrice).toFixed(2);
      console.log(dealPrice);
      break;
    case 3://drop with condition
      var c = qty + condition;
      if (eval(c)){
        dealPrice = qty * result;
      }else{
        dealPrice = qty * price;
      }
      dealPrice = parseFloat(dealPrice).toFixed(2);
      console.log(dealPrice);
      break;
    default:
      dealPrice = qty * price;
      console.log(dealPrice);
      break;
  }
  return {
    dealPrice: dealPrice,
    qty: qty
  };
}

function validateCreateCarts(req){
  console.log(req.query.id);
  if (typeof req.query.cid === "undefined") {
    return {
      isErr: true,
      msg: "Customer is required",
    };
  }
  if (typeof req.query.aid === "undefined") {
    return {
      isErr: true,
      msg: "Advertisement is required",
    };
  }
  if (typeof req.query.qty === "undefined" && typeof req.query.qty > 0) {
    return {
      isErr: true,
      msg: "Quantity is required and must be at least ONE (1)",
    };
  }
  return {
    isErr: false,
  };
}

function validateDeleteCarts(req){
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
module.exports.checkout = checkout;
module.exports.deleteCarts = deleteCarts;
module.exports.validateCreateCarts = validateCreateCarts;
module.exports.validateDeleteCarts = validateDeleteCarts;
module.exports.calPrice = calPrice;
module.exports.getCartByCustomerId = getCartByCustomerId;
