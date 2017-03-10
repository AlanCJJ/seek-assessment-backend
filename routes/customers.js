var express = require('express');
var router = express.Router();
var controller = require('../controllers/customer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/check-customer', function(req, res, next){
  controller.checkCustomer(req).then(function(result){
    console.log("Response data: ", result);
    res.json(result);
  });
});

module.exports = router;
