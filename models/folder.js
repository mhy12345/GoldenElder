var mongoose = require('mongoose');
var FolderSchema = new mongoose.Schema({
    name:String,
    children:[mongoose.Schema.Types.ObjectId],
    father:mongoose.Schema.Types.ObjectId
});
module.exports=mongoose.model('folder', FolderSchema);
