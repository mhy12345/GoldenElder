var express = require('express');
var router = express.Router();
var feedback = require('../models/feedback');

/* GET home page. */
router.get('/', function(req, res, next) {
    feedback.find({},function(ferr,fres){
        console.log(fres);
        res.render('feedback',{data:fres,admin:req.session.admin});
    });
});

router.get('/new', function(req, res, next){
        res.render('feedback-new',{title:'新建留言'});
});

module.exports = router;
