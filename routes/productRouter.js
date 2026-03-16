const express = require('express');
const router = express.Router();
const productModel = require ('../models/product.model');
const loggedIn = require("../utils/LoggedIn");

router.get('/', async (req, res) => {
 let products = await productModel.find();
 res.json(products);                                                                                                                                                                                                                                                                                                    
});




module.exports = router;
