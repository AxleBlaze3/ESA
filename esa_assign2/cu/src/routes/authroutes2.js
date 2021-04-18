const express=require("express")
const mongoose=require("mongoose")
const Prod=mongoose.model("Product")
const Cart=mongoose.model("Cart")
const User=mongoose.model("User")
const router =express.Router()
router.put('/cart',async (req,res)=>{
    const {productId,userId,quantity}=req.body
    let product
    try{
        product=await Prod.findById(productId)
    }catch(err){
        return res.send(err)
    }
    if(!product){
        return res.send("Product Not Found")
    }
    let user
    try{
        user=await User.findById(userId)
    }catch(err){
        return res.send(err)
    }
    if(!user){
        return res.send("user Not Found")
    }
    if(product.quantity<quantity){
        return res.status(500).send("Quantity not available")
    }
    let cart
    try{
        cart=await Cart.findOne({userId:userId,productId:productId})
    }catch(err){
        return res.send(err)
    }
    if(!cart){
        
        const amt=quantity*product.price
        const cart2=new Cart({productId,userId,quantity,price:amt})
        let curProdQuant=product.quantity-quantity
        product.quantity=curProdQuant
        try{
            await product.save()
            await cart2.save()
        }catch(err){
            res.send(err)
        }
        return res.send("Success!!!")
    }else{
        let quant=cart.quantity
        quant+=quantity
        const amt=quant*product.price
        cart.quantity=quant
        cart.price=amt
        let curProdQuant=product.quantity-quantity
        product.quantity=curProdQuant
        try{
            await product.save()
            await cart.save()
        }catch(err){
            res.send(err)
        }
        return res.send("Success!!!")
    }

   
    
})

router.get('/cart/:id',async (req,res)=>{
    let carts
    try{
        carts=await Cart.find({userId:req.params.id})
    }catch(err){
        res.send(err)
    }

    res.json(carts)
})



module.exports=router