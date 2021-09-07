var express = require('express');
var router = express.Router();
var accountModel = require('../modules/accountModel');

// 註冊新帳號
router.post('/signUp', function(req, res, next) {
  var newAccount = new accountModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newAccount.save(function(err, data){
    var isSuccess = err ? 'false' : 'success';
    res.send(isSuccess);
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
