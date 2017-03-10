var express = require('express');
var router = express.Router();
var controller = require('../controllers/privilege');
var a_controller = require('../controllers/ad');
var c_controller = require('../controllers/customer');
var r_controller = require('../controllers/rule');

/* GET privileges listing page. */
router.get('/index', function(req, res, next) {
  controller.index().then(function(result){
    res.render('privilege/index', {
      data:{
        privileges: result
      }
    });
  }, function(err){
    console.log('Err:  ', err);
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  });
});

/* Redirect to creating new privilege's form */
router.get('/create-privilege', function(req,res,next){
  controller.getAllLists().then(function(results){
   console.log(results);
   generateRuleList(results);
   res.render('privilege/create', {
     data: {
          title: 'Create new privilege',
          err: false,
          errMsg: "",
          ads: results.ads,
          rules: results.rules,
          customers: results.customers,
      },
   });
  })
 });

/* Create new privilege */
router.post('/create',function(req, res, next){
  console.log("Body  ", req.body);
  const result = controller.validateCreatePrivileges(req);
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
  res.redirect('index');
});

/* Redirect to update form */
router.get('/update-form', function(req, res, next){
  controller.getOnePrivilege(req).then(function(result){
    controller.getAllLists().then(function(allListResult){
      generateRuleList(allListResult);
      res.render('privilege/update', {
        data: {
            title: 'Update Privilege (ID : '+result[0].id+' )',
            selected: {
              ad: result[0].ads_id,
              rule: result[0].rules_id,
              customer: result[0].customer_id,
            },
            id: result[0].id,
            ads: allListResult.ads,
            rules: allListResult.rules,
            customers: allListResult.customers,
          },
      });
    });
  });
});
/* Update existing privilege */
router.post('/update', function(req, res, next){
  controller.update(req).then(function(result){
    console.log('Res: ', result);
  }, function(err){
    console.log('Err: ', err);
  });
  res.redirect('index');
});

/* Delete privilege */
router.get('/delete', function(req, res, next){
  const result = controller.validateDeletePrivileges(req);
  console.log(result);
  if(result.isErr){
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  }else{
    next();
  }
}, function(req, res, next) {
  controller.deletePrivileges(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
  });
  res.redirect('index');
});

function generateRuleList(results) {
  for(var i = 0; i < results.rules.length; i++){
    switch(results.rules[i].type){
      case 1:
         results.rules[i].name = "Buy " + results.rules[i].condition + " for " + results.rules[i].result;
         break;
      case 2:
        results.rules[i].name = "Direct drop to " + results.rules[i].result + " each";
        break;
      case 3:
        results.rules[i].name = "Buy " + results.rules[i].condition + ", drop to " + results.rules[i].result + " each";
        break;
      default:
        break;
    }
  }
}

module.exports = router;
