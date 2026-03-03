// const express = require('express');
// const router = express.Router();
// const userModel =  require('../models/users.model');

// router.get('/', (req, res) => {
//     res.send("user Home Page");
// });

// router.post("/register", async function(req,res){
//     try {
//         let { email , password , fullname} = req.body;

//         let user = await userModel.create({
//             email,
//             password,
//             fullname
//         });
//         res.status(201).json(user);
//       res.send(user);

//     } catch (err) {
//         console.log(err.message);
        
//         res.status(500).json({ error: err.message });

//     }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const userModel = require("../models/users.model"); // Why: To talk to the User collection in DB
const bcrypt = require("bcrypt"); // Why: To scramble the password for safety
const jwt = require("jsonwebtoken"); // Why: To create a token for the user to stay logged in
router.post("/register", async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        // 1. Check if user already exists so we don't have duplicates
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account, please login.");

        // 2. Scramble (Hash) the password
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);

                // 3. Actually create the user in MongoDB
                let newUser = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });

// 1. Generate the Token (The ID Card)
                // "secretkey" is a private password only your server knows
                let token = jwt.sign({ email: email, id: newUser._id }, "secretkey");

                // 2. Set the Cookie in the browser
                res.cookie("token", token);

                res.send("User created! Go check your MongoDB Compass/Atlas.");
            });
        });

    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
