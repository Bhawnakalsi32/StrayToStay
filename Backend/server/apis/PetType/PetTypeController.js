const { uploadImg } = require("../../utilities/Helper")
const PetTypesModel = require("./PetTypesModel")

add=(req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData.petType){
        validation+=" Pet Type is required"
    }
     if(!formData.description){
        validation+=" Description is required"
    }
    if(!req.file){
        validation+=" image is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //duplicacy 
        PetTypesModel.findOne({petType:formData.petType})
        .then(async (PetTypeData)=>{
            if(!PetTypeData){
                let petTypeObj=  new PetTypesModel()
                let total=await PetTypesModel.countDocuments().exec()
                petTypeObj.petType=formData.petType
                                petTypeObj.description=formData.description

                 try{
                            let url= await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                            petTypeObj.image=url
                        }
                        catch(err){
                            res.json({
                                status:500,
                                success:false,
                                message:"error while uploading image!!",
                                err:err.message
                            })
                        }
                                petTypeObj.autoId=total+1 

                petTypeObj.save()
                .then((PetTypeData)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Pet Type added!!",
                        data:PetTypeData
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
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Pet Type already exists",
                    data:PetTypeData
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
all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit  
    let currentPage=formData.currentPage 
    delete formData.limit 
    delete formData.currentPage
    //skip, sort, limit
    PetTypesModel.find(formData)
   .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (PetTypeData)=>{
        if(PetTypeData.length>0){
            let total=await PetTypesModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"PetTypes loaded",
                total:total,
                data:PetTypeData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No Type Found!!",
                data:PetTypeData
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
        PetTypesModel.findOne({_id:formData._id})
        .then((PetTypeData)=>{
            if(!PetTypeData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Type found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Type exists",
                    data:PetTypeData
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
        PetTypesModel.findOne({_id:formData._id})
        .then(async(PetTypeData)=>{
            if(!PetTypeData){
                res.json({
                    status:404,
                    success:false,
                    message:"No post found!!"
                })
            }else{
                
                if(!!formData.petType){
                    PetTypeData.petType=formData.petType 
                }
                if(!!formData.description){
                    PetTypeData.description=formData.description 
                }
                if(!!req.file){
                    try{
                        let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                        PetTypeData.image=url
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
               PetTypeData.save()
               .then((PetTypeData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"post updated successfully!!",
                        data:PetTypeData
                    })
               })
               .catch((err)=>{
                conole.log(err)
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
            console.log(err)
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            })
        })
    }

    // find given _id 
    //update

}




module.exports={all,single,add,update}