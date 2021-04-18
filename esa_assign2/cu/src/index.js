require('./models/user')
require('./models/cart')
require('./models/product')
const reqAuth=require('./middlewares/requireauth')
const express=require('express')
const mongose=require('mongoose')
const authRoutes=require('./routes/authroutes')
const authRoutes2=require('./routes/authroutes2')
const app=express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(authRoutes)
app.use(authRoutes2)


const mongoUri='mongodb+srv://Axle:passwoo3@cluster0.urzpd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
})
mongose.connection.on("connected",()=>{
    console.log("Connected to Mongo")
})
mongose.connection.on('error',(err)=>{
    console.error("Error connecting to Mongo",err)
})
app.listen(3000,()=>{
    console.log("listening:3000")
})