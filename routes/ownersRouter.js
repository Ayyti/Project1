const express = require('express');
const router = express.Router();

const ownerModel =  require('../models/owner.model');

router.get('/', (req, res) => {
    res.send("Owners Home Page");
});

if(process.env.NODE_ENV==='development'){
    router.post("/create", async function(req,res){

        let owners = await ownerModel.find();
        if(owners.length> 0){
            return res
            .send(503)
            .send("Owners already exist, you dont have permission ");
        }
        
        let { fullname, email, password } = req.body;
        let createOwner = await ownerModel.create({
            fullname,
            email,  
            password,
        });
        res.status(201).send(createdOwner);

       // res.send("Creating new Owner");

    });
} 

//console.log("ROUTER FILE LOADED");
//if(process.env)
module.exports = router;
