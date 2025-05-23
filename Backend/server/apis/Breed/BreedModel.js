const mongoose =require("mongoose")

let  BreedSchema=mongoose.Schema({
    autoId:{type:Number,default:1},
    name:{ type:String,default:""},
    petTypeId:{type:mongoose.Schema.Types.ObjectId, ref:"PetTypesModel", default:null},
    status:{type:Boolean,default:true},
    image:{type:String, default:"no-pic.jpg"},
    createdAt:{type:Date,Default:Date.now(),
    
   
    }
})
module.exports=mongoose.model("BreedModel",BreedSchema)
