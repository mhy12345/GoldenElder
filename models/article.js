var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
    field:String,
    text:String,
    title:String,
    postUser:String,
    postTime:Date,
    status:Number
});
module.exports=mongoose.model('article', ArticleSchema);
