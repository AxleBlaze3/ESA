const express=require("express")
const mongoose=require("mongoose")
const Prod=mongoose.model("Product")
const router =express.Router()
router.post('/product',async (req,res)=>{
    const {category,productName,productModel,price,quantity}=req.body
    const prod=new Prod({category,productName,productModel,price,quantity})
    try{
        await prod.save()
    }catch(err){
        res.send(err)
    }
    res.send("Save Successfull")
})

router.get('/product',async (req,res)=>{
    let products
    try{
        products=await Prod.find({})
    }catch(err){
        res.send(err)
    }

    res.json(products)
})



module.exports=router