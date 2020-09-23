const mongoose = require('mongoose');
mongoose.connect("mongodb://172.25.0.2:27017/crud");
module.exports=mongoose;
