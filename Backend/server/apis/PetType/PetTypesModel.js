const mongoose =require("mongoose")

let PetTypesSchema=mongoose.Schema({
    autoId:{type:Number,default:1},
    status:{type:Boolean,default:true},
    petType:{type:String,default:""},
    description:{type:String,default:""},
    image:{type:String, default:"no-pic.jpg"},
    createdAt:{type:Date,Default:Date.now(),
     


    }
})

module.exports=mongoose.model("PetTypes",PetTypesSchema)
