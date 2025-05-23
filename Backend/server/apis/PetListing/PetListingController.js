const PetListingModel=require("./PetListingModel")
const { uploadImg } = require("../../utilities/Helper")


add=async (req,res)=>{
   let validation=""
   let formData=req.body 
   if(!formData.breedId){
    validation+="Breed Id is required"
   }
   if(!formData.petName){
    validation+="petName is required"
   }
   if(!req.file){
    validation+="Image is required"
   }
   if(!formData.description){
    validation+="description is required"
   }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
    
                let PetListingObj=new PetListingModel()
                let total=await PetListingModel.countDocuments().exec()
                PetListingObj.breedId=formData.breedId 
                PetListingObj.petName=formData.petName
                PetListingObj.description=formData.description
                PetListingObj.addedById=req.decoded.userId
                PetListingObj.autoId=total+1

                try{
                    let url= await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                    PetListingObj.image=url
                }
                catch(err){
                    console.log(err);
                    
                    res.json({
                        status:500,
                        success:false,
                        message:"error while uploading image!!"
                    })
                }
                PetListingObj.save()
                .then((PetListingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Added to PetListing successfully",
                        data:PetListingData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
                })
         
       
    }
}
// all=(req,res)=>{
//     PetListingModel.find({addedById:req.decoded.userId})
//     // .populate("BreedId")
//     .populate({
//         path:"BreedId",
//         populate:"BreedId"
//     })
//     .then((PetListingData)=>{
//         if(PetListingData.length>0){
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"PetListing loaded",
//                 data:PetListingData
//             })
//         }else{
//             res.json({
//                 status:404,
//                 success:false,
//                 message:"No data in PetListing"
//             })
//         }
//     })
// }

all = async (req, res) => {
  let formData = req.body;
  let limit = formData.limit;
  let currentPage = formData.currentPage;

  delete formData.limit;
  delete formData.currentPage;

  let filter = { ...formData }; // Default: use provided filter (e.g. addedById from frontend)

  try {
    const petListingData = await PetListingModel.find(filter)
      .limit(limit)
      .skip((currentPage - 1) * limit)
      .populate([
        { path: "addedById", select: "name email" },
        { path: "breedId", select: "name" },
      ]);

    if (petListingData.length > 0) {
      const total = await PetListingModel.countDocuments(filter).exec();
      res.json({
        status: 200,
        success: true,
        message: "Pet loaded",
        total: total,
        data: petListingData,
      });
    } else {
      res.json({
        status: 404,
        success: false,
        message: "No Pet Found!!",
        data: [],
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};


single=(req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData._id){
        validation+="_id is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        PetListingModel.findOne({_id:formData._id})
        .populate({
            path: "breedId",
            select: "name" // adjust as needed based on BreedModel fields
        })
        .populate({
            path: "addedById",
            select: "name email" // adjust as needed based on UserModel fields
        })
        .then((PetListingData)=>{
            if(!PetListingData){
                res.json({
                    status:404,
                    success:false,
                    message:"No PetListing found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"PetListing exists",
                    data:PetListingData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
}

update=(req,res)=>{
    let formData=req.body 
    let validation=""
    if(!formData._id){
        validation+="_id is required"
    }

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        PetListingModel.findOne({_id:formData._id})
        .then(async(PetListingData)=>{
            if(!PetListingData){
                res.json({
                    status:404,
                    success:false,
                    message:"No PetListing found!!"
                })
            }else{
                if(!!formData.petName){
                    PetListingData.petName=formData.petName 
                }
                 if(!!formData.description){
                    PetListingData.description=formData.description 
                }
                if(!!req.file){
                    try{
                        let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                        PetListingData.image=url
                    }
                    catch(err){
                        console.log(err)
                        res.json({
                            status:500,
                            success:false,
                            message:"error while uploading image!!"
                        })
                    }
                }
               PetListingData.save()
               .then((PetListingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"PetListing updated successfully!!",
                        data:PetListingData
                    })
               })
               .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err
                    })
               }) 
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }

 
}

changeStatus=(req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData._id){
        validation+="_id is required"
    }
    
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        PetListingModel.findOne({_id:formData._id})
        .then((PetListingData)=>{
            if(!PetListingData){
                res.json({
                    status:404,
                    success:false,
                    message:"No PetListing found!!"
                })
            }else{
            PetListingData.status=!PetListingData.status 
               PetListingData.save()
               .then((PetListingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data:PetListingData
                    })
               })
               .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err
                    })
            })

            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }
}
module.exports={add, all,single,changeStatus,update}