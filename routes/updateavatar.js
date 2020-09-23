var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var fileupload = require('express-fileupload')
var UPDATEAVATAR = require("../database/updateavatar");
router.use(fileupload({
    fileSize: 50 * 1024 * 1024
}));

router.post("/sendfile", (req, res) => {
    var imagen = req.files.foto;
    var path = __dirname.replace(/\/routes/g, "/Imagenes");
    var date = new Date();
    var sing  = sha1(date.toString()).substr(1, 5);
    var totalpath = path + "/" + sing + "_" + imagen.name.replace(/\s/g,"_");
    imagen.mv(totalpath, async(err) => {
        if (err) {
            return res.status(300).send({msn : "Error al escribir el archivo en el disco duro"});
        }
        var obj = {};
        obj["foto"] = totalpath;
        obj["hash"] = sha1(totalpath);
        obj["relativepath"] = "/v1.0/api/getfile/?id=" + obj["hash"];
        var updateavatar = new UPDATEAVATAR(obj);
        updateavatar.save((err, docs) => {
            if (err) {
                res.status(500).json({msn: "ERROR "})
                return;
            }
            res.status(200).json({msn: "UpdaterAvatar Registrado"}); 
        });
    });
 });

router.get('/getUpdateavatar', (req, res, next) => {
  UPDATEAVATAR.find({}, (err, docs) => {
    res.status(200).json(docs);
  });
});

router.get("/getfile", async(req, res, next) => {
    var params = req.query;
    if (params == null) {
        res.status(300).json({ msn: "Error es necesario un ID"});
        return;
    }
    var id = params.id;
    var updateavatar =  await UPDATEAVATAR.find({hash: id});
    if (updateavatar.length > 0) {
        var path = updateavatar[0].foto;
        res.sendFile(path);
        return;
    }
    res.status(300).json({
        msn: "Error en la petición"
    });
    return;
});
router.delete("/menu", (req, res) => {
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    UPDATEAVATAR.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});
module.exports = router;
