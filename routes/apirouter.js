var express = require('express');
var router = express.Router();

const user= require('../database/users');
const USER =user.model;
const USERSCHEMA = user.schema;

var valid = require('../utils/valid');

//POST
router.post('/user', async(req, res) => {
    console.log(req.body);
    var params = req.body;
    params["registerdate"] = new Date();

    if (!valid.checkParams(USERSCHEMA, params)){
        res.status(300).json({
          msn: "PARAMETROS INCORRECTOS"
        });
        return;
      }
    if (!valid.checkEmail(params.email)){
        res.status(300).json({
          msn: "EMAIL INCORRECTO"
        });
        return;
    }
    if (!valid.checkPassword(params.password)){
        res.status(300).json({
          msn: "PASSWORD INCORRECTO"
        });
        return;
    }

    var users = new USER(params);
    var result = await users.save();
    res.status(200).json(result);
});

//GET
router.get("/user", (req, res) => {
    var params = req.query;
    console.log(params);
    var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
        if (params.order == "desc") {
            order = -1;
        } else if (params.order == "asc") {
            order = 1;
        }
    }
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
});

//PATCH
router.patch("/user", (req, res) =>{
    if(req.query.id == null){
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params,(err, docs)=>{
        res.status(200).json(docs);
    });
});

//DELETE
router.delete("/user", async(req, res)=>{
    if(req.query.id == null){
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var r = await USER.remove({_id: req.query.id});
    res.status(300).json(r);
});

module.exports=router;
