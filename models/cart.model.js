const mongoose = require("mongoose");   

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,           
        ref: 'user',

    },
    products:[{
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
     },
        quantity : Number
    
    }]
})

    module.exports =mongoose.model('cart', cartSchema);
        
