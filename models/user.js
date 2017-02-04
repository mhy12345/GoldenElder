var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    admin:Boolean,
    name:String,
    password:String
});
module.exports=mongoose.model('user', UserSchema);
