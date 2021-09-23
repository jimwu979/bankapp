var express = require('express');
var router = express.Router();
var multer = require('multer');
var accountModel = require('../modules/accountModel');

let storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './photo');
  },
  filename: function(req, file, cb){
    cb(null, req.body.email + '.' + file.originalname.split('.')[1]);
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
                    res.send({isSuccess: true});
            });
        }
    });
});

module.exports = router;