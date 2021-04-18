const mongoose=require('mongoose')
const prodSchema=new mongoose.Schema({
    
    category:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productModel:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})


mongoose.model("Product",prodSchema)