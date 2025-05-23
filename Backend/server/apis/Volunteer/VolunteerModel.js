const mongoose=require("mongoose")
const VolunteerSchema=mongoose.Schema({
    autoId:{type:Number, default:1},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel",default:null},
    image:{type:String, default:"no-pic.jpg"},
    contact:{type:String,default:1},
    status:{type:Boolean, default:true},
    userType:{type:Number,default:2}, 
    createdAt:{type:Date, default:Date.now()},
})

module.exports=mongoose.model("VolunteerModel", VolunteerSchema)