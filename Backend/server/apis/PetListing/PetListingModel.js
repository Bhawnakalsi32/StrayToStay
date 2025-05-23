const mongoose =require("mongoose")

let PetListingSchema=mongoose.Schema({
    autoId:{type:Number,default:1},
    petName:{ type:String,default:""},
    description:{type:String,default:""},
    image:{type:String, default:"no-pic.jpg"},
    breedId:{type:mongoose.Schema.Types.ObjectId, ref:"BreedModel", default:null},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    status:{type:Boolean,default:true},
    petType:{type:String,default:"1"},
    createdAt:{type:Date,Default:Date.now(),
   
    }
})

module.exports=mongoose.model("PetListing",PetListingSchema)
