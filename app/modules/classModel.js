var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true});

var classSchema = new mongoose.Schema({
    account: String,
    order: Number,
    className: String,
    typeIsIncome: Boolean,
    iconImg: Number,
    iconColor: Number,
});
classSchema.set('collection', 'class');
var classModel = mongoose.model('class', classSchema);

module.exports = classModel;