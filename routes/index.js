var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    data: {
        title: 'SEEK Advertisement Checkout System',
        menus: [
          {url: "ads/index", menu: "Ads Management", icon: "glyphicon glyphicon-bullhorn"},
          {url: "rules/index", menu: "Rules Management", icon: "glyphicon glyphicon-tasks"},
          {url: "privileges/index", menu: "Privilege Management", icon: "glyphicon glyphicon-star"},
        ],
    },
   });
});

module.exports = router;
