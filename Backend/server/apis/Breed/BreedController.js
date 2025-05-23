const BreedModel=require("./BreedModel")
const { uploadImg } = require("../../utilities/Helper")

add=async (req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData.petTypeId){
        validation+=" PetTypeId is required"
    }
    if(!formData.name){
        validation+=" name is required"
    }
    // if(!formData.BreedId){
    //     validation+=" BreedId is required"
    // }
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
        let total = await BreedModel.countDocuments().exec()
        let BreedObj=new BreedModel()
        BreedObj.petTypeId=formData.petTypeId
        // BreedObj.BreedId=formData.BreedId
        BreedObj.name=formData.name
//         try{
//             let url= await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
//             BreedObj.image=url
//         }
//         catch(err){
            
            
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"error while uploading image!!",
//                 err:err.message
//             })
//         }
        BreedObj.autoId=total+1 
        BreedObj.save()
        .then((BreedData)=>{
            res.json({
                status:200,
                success:true,
                message:"Breed added",
                data:BreedData
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


all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit  
    let currentPage=formData.currentPage 
    delete formData.limit 
    delete formData.currentPage

    //skip, sort, limit
    BreedModel.find(formData)
    
   .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})

    
    .then(async (BreedData)=>{
        if(BreedData.length>0){
            let total=await BreedModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Breed loaded",
                total:total,
                data:BreedData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No Breed Found!!",
                data:BreedData
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
        BreedModel.findOne({_id:formData._id})
        .then((BreedData)=>{
            if(!BreedData){
                res.json({
                    status:404,
                    success:false,
                    message:"No breed found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Breed exists",
                    data:BreedData
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
        BreedModel.findOne({_id:formData._id})
        .then(async(BreedData)=>{
            if(!BreedData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Breed found!!"
                })
            }else{
                if(!!formData.BreedName){
                    BreedData.BreedName=formData.BreedName 
                }
                if(!!req.file){
                    try{
                        let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                        BreedData.image=url
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
               BreedData.save()
               .then((BreedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Breed updated successfully!!",
                        data:BreedData
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
        BreedModel.findOne({_id:formData._id})
        .then((BreedData)=>{
            if(!BreedData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Breed found!!"
                })
            }else{
            BreedData.status=!BreedData.status 
               BreedData.save()
               .then((BreedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data:BreedData
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


module.exports={all,single,update,changeStatus,add}