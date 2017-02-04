var express = require('express');
var router = express.Router();
var article = require('../models/article');

/* GET users listing. */
router.get('/', function(req, res, next) {
    article.findOne({field:'contact'},function(ferr,fres){
        var data = new Object;
        if (fres == null)
        {
            data = new Object;
            data.text='Article(contact) doesn\'t exist.';
        }else
        {
            data = fres;
        }
        res.render('article',{data:data});
    });
});

module.exports = router;
