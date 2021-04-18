const mongoose=require('mongoose')
const bcry=require("bcrypt")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',function(next){
    const user=this
    if(!user.isModified('password')){
        return next()
    }
    bcry.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcry.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err)
            }
            user.password=hash
            return next()
        })
    })

})
userSchema.methods.comparePassword=function(actPass){
    const user=this
    return new Promise((resolve,reject)=>{
        bcry.compare(actPass,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            resolve(true)
        })
    })
    

}
mongoose.model("User",userSchema)