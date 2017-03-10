var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart');
var adsController = require('../controllers/ad');

router.get('/get-cart', function(req, res, next){
  var results = [];
  var grandTotal = 0;

  controller.getCartByCustomerId(req).then(function(cartResult){
    console.log("Response data: ", cartResult);
      Promise.all(
        cartResult.map(function(cart){
        return Promise.resolve(controller.checkout(req.query.cid, cart.ads_id, cart.quantity).then(function(calResult){
          grandTotal += parseFloat(calResult.dealPrice);
          return(calResult);
        }))
        .then(function(calResult) {
          console.log('Cal Result', calResult);
          return adsController.getOneAd(cart.ads_id).then(function(adResult){
            console.log("mm  ", adResult);
            return (
              {
                ads:{
                  id: adResult[0].id,
                  name: adResult[0].name,
                  price: parseFloat(calResult.dealPrice),
                },
                qty: calResult.qty,
                cid: cart.customer_id,
              }
            );
          });
        })
      })).then(function(result) {
          console.log('Done', result);
          res.json ({
            carts: result,
            grandTotal
          });
        }
      )
  });
});

router.get('/add-to-cart', function(req, res, next){
  controller.create(req).then(function(result){
    return res.redirect('/carts/get-cart?cid=' + req.query.cid);
  });
});

router.get('/delete-item-cart', function(req, res, next){
  controller.deleteCarts(req).then(function(result){
    return res.redirect('/carts/get-cart?cid=' + req.query.cid);
  });
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  // var a = controller.calPrice(1, "5", "4", 6, 269.99);
  // var b = controller.calPrice(2, "", "309.99", 2, 322.99);
  // var c = controller.calPrice(3, ">= 3", "389.99", 4, 394.99);
  // var d = parseFloat(parseFloat(a) + parseFloat(b) + parseFloat(c)).toFixed(2);
  controller.checkout(req).then(function(result){
    console.log(result);
    res.render('index', {title: "Grand total: "+ String(result), });
  });
  // console.log("Grand total: ", d);
  // res.render('index', {title: "Grand total: "+ String(d), });
});

/* Create new cart */
router.get('/create',function(req, res, next){
  const result = controller.validateCreateCarts(req);
  console.log(result);
  if(result.isErr){
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  }else{
    next();
  }
}, function(req, res, next) {
  controller.create(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
  });
  res.render('index', {title: "Add Cart"});
});

/* Update existing cart */
router.get('/update', function(req, res, next){
  controller.update(req).then(function(result){
    console.log('Res: ', result);
  }, function(err){
    console.log('Err: ', err);
  });
  res.render('index', {title: "Update Cart"});
});

/* Delete cart */
router.get('/delete', function(req, res, next){
  const result = controller.validateDeleteCarts(req);
  console.log(result);
  if(result.isErr){
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  }else{
    next();
  }
}, function(req, res, next) {
  controller.deleteCarts(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
  });
  res.render('index', {title: "Delete Cart"});
});

module.exports = router;
