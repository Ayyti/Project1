const express = require('express');
const router = express.Router();
const cartModel = require('../models/cart.model');
const LoggedIn = require ('../utils/LoggedIn');
const { findOne } = require('../models/users.model');


router.get("/", LoggedIn, async(req, res) => {
    try{
       // let userId = req.user._id;
        let cart = await cartModel.findOne ({userId : req.user.id});
        res.send(cart);
    }
    catch(err){
        console.log(err);
        res.status(501).send("server not working");
    }
});
router.post('/add',LoggedIn, async (req, res) => {
     try {

         let productId = req.body.productId;
        let cart = await cartModel.findOne ({userId : req.user.id});
        if(cart){
           
             let existingItem = cart.products.find(item => item.productId == productId)
             console.log(req.user);

        if(existingItem){

            existingItem.quantity++;
            await cart.save();

            res.send("Quantity updated successfully.");
        }        else{
            cart.products.push({ productId: productId , quantity: 1})
            
            await cart.save();
            res.status(200).send("Product added to cart successfully.");    
        }
    }
        else{
            let createCart = await cartModel.create({
                userId : req.user.id,
                products: [{ productId: productId , quantity: 1}]
            });
             res.send("Cart created and product added successfully.");   
             console.log(req.user);
            }
        }
         catch(err) {
            console.log(err);
        res.status(500).send("Server error, try again later.."); 
        }
});

 router.delete("/remove", LoggedIn, async (req, res) => {
        try {       
            let cart = await cartModel.findOne ({userId:req.user.id })
            if(!cart){
                
                return res.status(404).send("Cart doesnt exist");
            }
            let productId = req.body.productId;
            let existingItem = cart.products.find(item => item.productId == productId)

            if(!existingItem){
                return res.status(404).send("Product not in the cart");
            }


            if(existingItem.quantity > 1){
                existingItem.quantity--;
            await cart.save();
         //   res.send("cart removed successfully");
            res.status(200).json({
                success: true,
                message: "Product quantity decreased",
               // remainingItems: cart.products,     //to see the remaining items left in the cart
              //  fullCart: cart
            });

            }
            else{
                cart.products= cart.products.filter( item => item.productId.toString()!== productId);
            }
                await cart.save();
                res.send("product removed successfully");
                res.send(json);
            }
          catch (err) {
            res.status(500).send("Server error, try again later.");     
        }
    }

 )
 
module.exports = router;