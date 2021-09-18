var express = require('express');
var router = express.Router();
var accountModel = require('../modules/accountModel');
var classModel = require('../modules/classModel');
var recordModel = require('../modules/recordModel');
const crypto = require("crypto");

//------------------------------------------------------------------------<< 帳號 >>
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

//------------------------------------------------------------------------<< 類別 >>
// 類別 - 增
router.post('/createClass', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    if(data !== null){
      classModel.find({
        email: req.body.email,
        typeIsIncome: req.body.isIncome,
      }, function(err, classfindData){
        let newClass = new classModel({
          account: req.body.email,
          order: classfindData.length,
          className: req.body.className,
          typeIsIncome: req.body.isIncome,
          iconImg: req.body.iconImg,
          iconColor: req.body.iconColor,
        });
        newClass.save(function(){
          res.send({ isSuccess : true });
        });
      })
    }
  });
});


// 類別 - 查
router.post('/readClass', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, accountEmail){
    if(accountEmail != null){
      classModel.find({
        account: req.body.email,
      }, function(err, data){
        res.send(data);
      })
    }
  });
});


// 類別 - 改
router.post('/updateClass', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, account){
    if(account != null){
      classModel.update(
        { '_id': req.body.targetClass._id }, 
        { 'order': req.body.targetClass.order }, 
        function(err){ }
      );
      classModel.update(
        { '_id': req.body.siblingClass._id }, 
        { 'order': req.body.siblingClass.order }, 
        function(err){ }
      )
      res.send({isSuccess: true});
    }
  });
});


// 類別 - 刪
router.post('/deleteClass', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, accountData){
    if(accountData !== null){
      classModel.deleteOne({
        email: req.body.email,
        _id: req.body.classId,
      }, function(err, deleteClassData){
        
      });
      classModel.update({
        email: req.body.email,
        typeIsIncome: req.body.isIncome,
        order: {'$gt': req.body.order},
      }, {
        '$inc': {'order': -1},
      }, {
        multi: true,
      }, function(err, updateData){

      });
      res.send({isSuccess: true});
    }
  });
});


//------------------------------------------------------------------------<< 記帳 >>
// 記帳 - 增
router.post('/createRecord', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName
  }, function(err, data){
    if(data !== null){
      let newRecord = new recordModel({
        account: req.body.email,
        classId: req.body.classId,
        typeIsIncome: req.body.typeIsIncome,
        description: req.body.description,
        value: req.body.value,
        // time: req.body.time,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        timestamp: req.body.timestamp,
      });
      newRecord.save(function(){
        res.send({isSuccess: true});
      });
    }
  });
});


// 記帳 - 查
router.post('/readRecord_aMonth', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    if(data !== null){
      recordModel.find({
        account: req.body.email,
        year: req.body.year,
        month: req.body.month,
      }, function(err, recordData){
        classModel.find({
          account: req.body.email,
        }, function(err, iconData){
          res.send({
            record: recordData,
            classList: iconData
          })
        })
      });
    }
  })
});
router.post('/readRecord_aClasswithinAMonth', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    if(data !== null){
      recordModel.find({
        account: req.body.email,
        year: req.body.year,
        month: req.body.month,
        classId: req.body.classId,
      }, function(err, recordData){
        res.send(recordData);
      });
    }
  })
});
router.post('/readRecord_findOne', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, data){
    if(data !== null){
      recordModel.findOne({
        account: req.body.email,
        _id: req.body.id,
      }, function(err, recordData){
        res.send(recordData);
      });
    }
  })
});


// 記帳 - 改
router.post('/updateRecord', function(req, res, next) {
  console.log(req.body);
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, account){
    if(account !== null){
      recordModel.update({
        account: req.body.email,
        _id: req.body.recordId
      }, {
        classId: req.body.classId,
        typeIsIncome: req.body.typeIsIncome,
        description: req.body.description,
        value: req.body.value,
        // time: req.body.time,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        timestamp: req.body.timestamp,
      }, function(err, data){
        res.send({ isSuccess: true });
      })
    }
  })
});


// 記帳 - 刪
router.post('/deleteRecord', function(req, res, next) {
  accountModel.findOne({
    email: req.body.email,
    loginCodeName: req.body.loginCodeName,
  }, function(err, accountData){
    if(accountData !== null){
      recordModel.remove({
        email: req.body.email,
        _id: req.body.recordId,
      }, function(err, data){
        res.send({isSuccess: true});
      })
    }
  });
});


module.exports = router;
