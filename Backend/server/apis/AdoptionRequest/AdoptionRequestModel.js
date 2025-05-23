const mongoose =require("mongoose")

let AdoptionRequestSchema=mongoose.Schema({
    
    autoId:{type:Number,default:1},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    petId:{type:mongoose.Schema.Types.ObjectId, ref:"PetListing", default:null},
    idProof:{type:String, default:"no-pic.jpg"},
    incomeCertificate:{type:String, default:"no-pic.jpg"},
    bankStatement:{type:String,default:"no-pic.jpg"},
    addressProof:{type:String,default:"no-pic.jpg"},
    status:{type:Number,default:1},
    createdAt:{type:Date,default:Date.now(),
    }
})

module.exports=mongoose.model("AdoptionRequestModel",AdoptionRequestSchema)
