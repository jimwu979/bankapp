var express = require('express');
var router = express.Router();
var accountModel = require('../modules/accountModel');

// 註冊新帳號
router.post('/signUp', function(req, res, next) {
  console.log('api.js');
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

module.exports = router;
