const express=require("express")
const app=express()
const PORT=5000 
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))
require("dotenv").config()

// app.use(express.static("./server/public/"))
 const api=require("./server/routes/ApiRoutes")
app.use("/api", api)
const admin=require("./server/routes/AdminRoutes")
app.use("/admin", admin)
const volunteer=require("./server/routes/VolunteerRoutes")
app.use("/volunteer", volunteer)
const ngo=require("./server/routes/NgoRoutes")
app.use("/ngo", ngo)

const db=require("./server/config/db")
const seed=require("./server/config/seed")
app.listen(process.env.PORT,()=>{
    console.log("SERVER is running at ", process.env.PORT);
})

app.get("/",(req,res)=>{
    res.json({ 
        status:200,
        success:true, 
        message:"Server is running"
    })
})

app.all("**/",(req,res)=>{
    res.status(404).json({
        status:404,
        success:false,
        message:"Not Found!!"
    })
})