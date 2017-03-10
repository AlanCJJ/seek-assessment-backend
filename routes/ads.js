var express = require('express');
var router = express.Router();
var controller = require('../controllers/ad');

router.get('/get-ads', function(req, res, next){
  controller.index().then(function(result){
    for(var i = 0; i < result.length; i++){
      result[i].price = parseFloat(result[i].price).toFixed(2);
    }
    res.json(result);
  });
});

/* GET ads listing page. */
router.get('/index', function(req, res, next) {
  controller.index().then(function(result){
    for(var i = 0; i < result.length; i++){
      result[i].price = parseFloat(result[i].price).toFixed(2);
    }
    res.render('ads/index', {
      data:{
        ads: result
      }
    });
  }, function(err){
    console.log('Err:  ', err);
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  });
});

/* Redirect to creating new ads' form */
router.get('/create-ads', function(req,res,next){
  res.render('ads/create', {
    data: {
        title: 'Create new advertisement',
        err: false,
        errMsg: "",
    },
   });
 });

 /* Create new ad */
router.post('/create',function(req, res, next){
  console.log(req.body);
  const result = controller.validateCreateAds(req);
  console.log(result);
  if(result.isErr){
    res.render('ads/create', {
      data: {
          title: 'Create new advertisement',
          err: true,
          errMsg: result.msg,
      },
    });
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
  controller.getOneAd(req.query.id).then(function(result){
    res.render('ads/update', {
      data: {
          title: 'Update Advertisement (ID : '+result[0].id+' )',
          id: result[0].id,
          name: result[0].name,
          price: result[0].price,
      },
    });
  });
});

/* Update existing ad */
router.post('/update', function(req, res, next){
  console.log('REq  ', req.body);
  controller.update(req).then(function(result){

    console.log('Res update: ', result);
  }, function(err){
    console.log('Err: ', err);
  });
  res.redirect('index');
});

/* Delete ad */
router.get('/delete', function(req, res, next){
  const result = controller.validateDeleteAds(req);
  console.log(result);
  if(result.isErr){
    var err = new Error(result.msg);
    err.status = 400;
    next (err);
  }else{
    next();
  }
}, function(req, res, next) {
  controller.deleteAds(req).then(function(result){
    console.log('Res:  ', result);
  }, function(err){
    console.log('Err:  ', err);
  });
  res.redirect('index');
  // res.render('index', {title: "Delete"});
});

router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('ads/create', {
    data: {
        title: 'SEEK Ads Checkout System',
        err: true,
        errMsg: err.message,
    },
   });
});

module.exports = router;
