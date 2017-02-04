var express = require('express');
var router = express.Router();
var fs = require('fs');
var article = require('../models/article');
var folder = require('../models/folder');

/* GET home page. */
router.get('/', function(req, res, next){
    if (!req.session.admin) {
        res.render('panel',{title:'管理页面'});
    }else{
        res.render('panel',{title:'管理页面',user:req.session.user});
    }
});

router.get('/article/*', function(req, res, next){
    var articleId = req.path.substr(9,req.path.length-9);
    console.log(articleId);
    article.findOne({_id:articleId},function(ferr,fres){
        if (!fres)console.log("Error Cannot find article");
        res.render('panel-article',{title:'管理界面-文章修改',data:fres});
    });
});

router.get('/articlelist', function(req, res, next){
article.find({},function(ferr,fres){
console.log(fres);
res.render('panel-articlelist',{title:'管理页面-全部文章',data:fres});
});
});

router.get('/folders',function(req, res, next){
  folder.find({},function(ferr,fres){
    res.render('panel-folderlist',{title:'管理页面-全部资料',data:fres});
  });
});
router.get('/folder/*', function(req, res, next){
    console.log(req.path);
    var articleId = req.path.substr(8,req.path.length-8);
    console.log(articleId);
    article.findOne({_id:articleId},function(ferr,fres){
        if (!fres)console.log("Error Cannot find article");
        res.render('panel-folder',{title:'管理界面-文件夹修改',data:fres});
    });
});
module.exports = router;
