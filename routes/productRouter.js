const express = require('express');
const router = express.Router();
const productModel = require ('../models/product.model');
const loggedIn = require("../utils/LoggedIn");


router.get('/', async (req, res) => {
 let products = await productModel.find();
 res.json(products);                                                                                                                                                                                                                                                                                                    
});


router.get("/:id", async (req , res) => {
    try {
         let id = req.params.id;
         let product = await productModel.findById(id);
         if(!product) return res.status(404).send("Product not found");
            res.json(product);
    } catch (err) {
        res.status(500).send("Server error, try again later.");
    }
});

module.exports = router;
