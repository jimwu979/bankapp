var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true});

var signUpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  loginCode: String,
  photo: String,
});
signUpSchema.set('collection', 'account');
var signUpModel = mongoose.model('account', signUpSchema);

module.exports = signUpModel;