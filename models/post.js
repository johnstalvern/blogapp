// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    title: String,
    body: String,
    time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', PostSchema);