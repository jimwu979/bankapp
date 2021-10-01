var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var accountModel = require('../modules/accountModel');

let storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../photo'));
  },
  filename: function(req, file, cb){
    let fileName = file.originalname.split('.');
    cb(null, req.body.email + '.' + fileName[fileName.length - 1]);
  }
});
let upload = multer({storage: storage});

router.post('/upload', upload.single('file'), function(req, res, next){
    accountModel.findOne({
        email: req.body.email,
        loginCodeName: req.body.loginCodeName,
    }, function(err, accountData){
        if(accountData !== null){
            accountModel.updateOne(
                { email: req.body.email, },
                { photo: req.file.filename }, 
                function(err, data){
                    res.send({isSuccess: true, fileName: req.file.filename});
            });
        }
    });
});

module.exports = router;