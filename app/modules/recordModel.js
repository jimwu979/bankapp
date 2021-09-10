var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app', {useNewUrlParser: true});

var recordSchema = new mongoose.Schema({
    account: String,
    classId: String,
    typeIsIncome: Boolean,
    description: String,
    value: Number,
    time: {
        year: Number,
        month: Number,
        day: Number,
    },
    timestamp: Array,
});
recordSchema.set('collection', 'record');
var recordModel = mongoose.model('record', recordSchema);

module.exports = recordModel;