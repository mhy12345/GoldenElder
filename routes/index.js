var express = require('express');
var router = express.Router();
var article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
    article.findOne({field:'homepage-introduction'},function(ferr,fres){
        var data = new Object;
        if (fres == null)
        {
            data.introduction = new Object;
            data.introduction.text='Article(homepage-introduction) doesn\'t exist.';
        }else
        {
            data.introduction = fres;
        }
        res.render('index',{data:data});
    });
});

module.exports = router;
