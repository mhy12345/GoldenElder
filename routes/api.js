var express = require('express');
var router = express.Router();
var fs = require('fs');
var article = require('../models/article');
var feedback = require('../models/feedback');

/* GET home page. */
router.post('/uploadImg', function(req, res, next) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/../public/upload/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            var info = {
                "error": 0,
                "url": "/upload/"+filename
            };
            res.send(info);
        });
    });
});

router.post('/savearticle', function(req,res,next){
    article.findOne({_id:req.body.id},function(ferr,fres){
        var newArticle = fres;
        newArticle.text = req.body.text;
        newArticle.title = req.body.title;
        newArticle.postUser = req.body.user;
        newArticle.postTime = new Date();
        newArticle.field = req.body.field;
        newArticle.save()
    });
});
router.post('/newarticle', function(req,res,next){
    var newArticle = new article;
    newArticle.text = "";
    newArticle.title = "新建文档";
    newArticle.postUser = "user";
    newArticle.postTime = new Date();
    newArticle.field = "text";
    newArticle.save();
    res.redirect("/panel/articlelist");
    console.log("Article created....");
});
router.post('/newfolder', function(req,res,next){
    var newFolder = new folder;
    newFolder.name = "新建文件夹"
    newFolder.list = [];
    newFolder.save();
    res.redirect("/panel/folders");
    console.log("Article created....");
});

router.get('/getarticle/field', function(req,res,next){
    article.findOne({field:req.query.field},function(ferr,fres){
        if (!fres)
        {
            res.end('NULL');
        }else
        {
            console.log(fres);
            res.end(fres.text);
        }
    });
});

router.post('/postfeedback',function(req,res,next){
    var newFeedback = new feedback;
    newFeedback.postUser= req.body.nickname;
    newFeedback.cellphone = req.body.cellphone;
    newFeedback.contactEmail = req.body.contactEmail;
    newFeedback.title = req.body.title;
    newFeedback.postTime = new Date;
    newFeedback.public = true;
    newFeedback.text = req.body.feedback;
    newFeedback.save();
    res.redirect('/feedback');
});
module.exports = router;
