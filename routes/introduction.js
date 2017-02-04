var express = require('express');
var router = express.Router();
var article = require('../models/article');

/* GET users listing. */
router.get('/', function(req, res, next) {
    article.findOne({field:'introduction'},function(ferr,fres){
        var data;
        if (fres == null)
        {
            data = new Object;
            data.text='Article(introduction) doesn\'t exist.';
        }else
        {
            data = fres;
        }
        res.render('article',{data:data});
    });
});

module.exports = router;
