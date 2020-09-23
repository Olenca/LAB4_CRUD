var mongoose = require("./connect");
var updateavatarSchema = new mongoose.Schema({
    foto: {
        type: String,
        required: [true, "la ruta de la imagen es necesaria"]
    },
    relativepath: {
        type: String
    },
    
    hash: {
        type: String,
        required: [true, "la ruta de la imagen es necesaria"]
    }
});
var UPDATEAVATAR = mongoose.model("updateavatar", updateavatarSchema);
module.exports = UPDATEAVATAR;
