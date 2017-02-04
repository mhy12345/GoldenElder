var mongoose = require('mongoose');
var FeedbackSchema = new mongoose.Schema({
    text:String,
    title:String,
    cellphone:String,
    postUser:String,
    contactEmail:String,
    postTime:String,
    public:Boolean
});
module.exports=mongoose.model('feedback', FeedbackSchema);
