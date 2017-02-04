var express = require('express');
var router = express.Router();
var fs = require('fs');
var article = require('../models/article');

/* GET home page. */
router.get('/*', function(req, res, next) {
    var articleId = req.path.substr(1,req.path.length-1);
    article.findOne({_id:articleId},function(ferr,fres){
        if (!fres)console.log("Error Cannot find article");
        res.render('article',{title:'管理界面-文章修改',data:fres});
    });
});
module.exports = router;
