var express = require('express');
var router = express.Router();
var accountModel = require('../modules/accountModel');
const crypto = require("crypto");

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
      let md5 = crypto.createHash("md5");
      let newPassword = md5.update(req.body.password).digest("hex");
      let newAccount = new accountModel({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        loginCodeName: ''
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
  let md5 = crypto.createHash("md5");
  let newPassword = md5.update(req.body.password).digest("hex");
  accountModel.findOne({
    email: req.body.email,
    password: newPassword,
  }, function(err, data){
    let loginCodeName = Math.floor(Math.random() * Math.pow(10, 20)).toString();
    accountModel.update(
      {email: req.body.email}, {loginCodeName: loginCodeName}, 
      function(err){
      if(err) console.log(err);
    });
    let result = {
      isSuccess: data == null ? false : true,
      loginCodeName: loginCodeName
    };
    res.send(result);
  });
});

// 檢查是否已登入
router.post('/alreadyLogin', function(req, res, next) {
  let result = {
    alreadyLogin: false,
  }
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    result.alreadyLogin = (data !== null) ? true : false;
    res.send(result);
  });
});

// 登出
router.post('/logout', function(req, res, next) {
  console.log('/logout!');
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    accountModel.update(
      {email: req.body.email}, {loginCodeName: ''}, 
      function(err){
        res.send({
          isSuccess: true
        })
    });
  });
});

module.exports = router;
