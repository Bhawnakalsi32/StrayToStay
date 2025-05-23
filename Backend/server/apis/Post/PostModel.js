const mongoose =require("mongoose")

let PostSchema=mongoose.Schema({
    
    autoId:{type:Number,default:1},
    title:{type:String,default:""},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    image:{type:String, default:"no-pic.jpg"},
    description:{type:String,defualt:""},
    location:{type:String,defualt:""},
    likes: [ { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],
    dob:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,Default:Date.now(),

    }
})

module.exports=mongoose.model("PostModel",PostSchema)
