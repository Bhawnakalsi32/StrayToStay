const mongoose =require("mongoose")

let  NgoSchema=mongoose.Schema({
    autoId:{type:Number,default:1},
    ngoName:{ type:String,default:""},
    description:{type:String,default:""},
        address:{type:String,default:""},

    status:{type:Boolean,default:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel", default:null},
    logo:{type:String, default:"no-pic.jpg"},
    userType:{type:Number,default:3},
    createdAt:{type:Date,Default:Date.now(),
   
    }
})

module.exports=mongoose.model("NgoModel",NgoSchema)