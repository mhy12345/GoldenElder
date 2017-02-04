var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
function md5 (text) {
      return crypto.createHash('md5').update(text).digest('hex');
};

/* GET users listing. */
router.get('/login', function(req, res, next) {
    if (req.session.user){
        res.redirect("/");
    }else{
        res.render('login',{});
    }
});
router.post('/login', function(req, res, next) {
    if (req.session.user){
        res.redirect("/");
    }else{
        user.findOne({name:req.body.username},function(ferr,fres){
            if (fres && fres.password == md5(req.body.password)){
                req.session.admin = fres.admin;
                req.session.user = req.body.username;
            }
            res.redirect("/");
        });
    }
});

router.get('/register', function(req, res, next) {
    if (req.session.user){
        res.redirect("/");
    }else{
        res.render('register',{});
    }
});
router.post('/register', function(req, res, next) {
    if (req.session.user){
        res.redirect("/");
    }else{
        var newUser = new user;
        newUser.password = md5(req.body.password);
        newUser.name = req.body.username;
        if (req.body.code == '12345679')
            newUser.admin = true;
        else
            newUser.admin = false;
        newUser.save();
        console.log("Register succeed!");
        res.redirect("/");
    }
});



module.exports = router;
