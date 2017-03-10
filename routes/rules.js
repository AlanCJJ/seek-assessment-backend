var express = require('express');
var router = express.Router();
var controller = require('../controllers/rule');

/* GET home page. */
router.get('/index', function(req, res, next) {
  controller.index().then(function(result){
    for(var i = 0; i < result.length; i++){
      generateReadableTypeList(result[i]);
    }
    res.render('rules/index', {
      data:{
        rules: result
      }
    });
  }, function(err){
    console.log('Err:  ', err);
  });
});

/* Redirect to creating new rule's form */
router.get('/create-rules', function(req,res,next){
  res.render('rules/create', {
    data: {
        title: 'Create new rules',
        err: false,
        errMsg: "",
        types: [
          {type: 1, name: "For Deal"},
          {type: 2, name: "Direct Drop"},
          {type: 3, name: "Condtionally Drop"},
        ],
        expressions: [ '&lt;', '&lt;=', '&gt;', '&gt;='
          // {e: '&lt;'},
          // {e: '&lt;='},
          // {e: '&gt;'},
          // {e: '&gt;='}
        ],
        selected: 1,
        expSelected: ""
    },
   });
 });

/* Create new rule */
router.post('/create',function(req, res, next){
  console.log("R  ", req.body);
  if ( req.body.type == 3){
    req.body.condition = req.body.condition[0] + " " + req.body.condition[1];
  }
  const result = controller.validateCreateRules(req);
  console.log(result);
  if(result.isErr){
    next(throwError(result.msg));
  }else{
    next();
  }
}, function(req, res, next) {
  controller.create(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
    next(throwError(result.msg));
  });
  res.redirect('index');
});

/* Redirect to update form */
router.get('/update-form', function(req, res, next){
  controller.getOneRule(req).then(function(result){
    var data = {
      title: 'Update Rule (ID : '+result[0].id+' )',
      id: result[0].id,
      err: false,
      errMsg: "",
      types: [
        {type: 1, name: "For Deal"},
        {type: 2, name: "Direct Drop"},
        {type: 3, name: "Condtionally Drop"},
      ],
      expressions: [
        {e: '&lt;'},
        {e: '&lt;='},
        {e: '&gt;'},
        {e: '&gt;='},
      ],
    };
    if (result[0].type == 3){
      result[0].condition = result[0].condition.split(' ');
      data.selected = {
        type: result[0].type,
        condition: result[0].condition[1],
        result: result[0].result,
      };
      data.expSelected = result[0].condition[0];
    }else{
      data.selected = {
        type: result[0].type,
        condition: result[0].condition,
        result: result[0].result,
      };
    }
    console.log(result[0].condition);
    console.log(data);
    res.render('rules/update', { data });
  });
});

/* Update existing rule */
router.post('/update', function(req, res, next){
  controller.validateUpdateRules(req).then(function (result) {
    if(result.isErr){
      var err = new Error(result.msg);
      err.status = 400;
      next (err);
    }else{
      next();
    }
  });
}, function(req, res, next){
    controller.update(req).then(function(result){
      console.log('Res: ', result);
    }, function(err){
      console.log('Err: ', err);
    });
  res.redirect('index');
});

/* Delete rule */
router.get('/delete', function(req, res, next){
  const result = controller.validateDeleteRules(req);
  console.log(result);
  if(result.isErr){
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  }else{
    next();
  }
}, function(req, res, next) {
  controller.deleteRules(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
  });
  res.redirect('index');
});

function generateReadableTypeList(results) {
  switch(results.type){
    case 1:
       results.name = "For Deal";
       break;
    case 2:
      results.name = "Direct Drop";
      break;
    case 3:
      results.name = "Conditionally Drop";
      break;
    default:
      break;
  }
  return results.name;
}

function throwError(errMsg) {
  var err = new Error(errMsg);
  err.status = 400;
  return err;
}

module.exports = router;
