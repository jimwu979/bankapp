var express = require('express');
var router = express.Router();
var accountModel = require('../modules/accountModel');

// 註冊新帳號
router.post('/signUp', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
  }, function(err, data){
    let checkResult = {
      isSuccess: 'false',
      nameIsFill: req.body.name.length > 0,
      emailIsFill: req.body.email.length > 0,
      emailIsNew: data == null,
      passwordIsFill: req.body.password.length > 0,
    }
    if( checkResult.nameIsFill && 
        checkResult.emailIsFill && 
        checkResult.emailIsNew && 
        checkResult.passwordIsFill
    ){
      let newAccount = new accountModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      newAccount.save(function(err, data){
        checkResult.isSuccess = true;
        res.send(checkResult);
      });
    } else {
      res.send(checkResult);
    }
  });
});

// 登入
router.post('/login', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, data){
    var isSuccess = data == null ? false : true;
    res.send(isSuccess);
  });
});

module.exports = router;
