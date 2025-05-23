const PostModel=require("./PostModel")
const { uploadImg } = require("../../utilities/Helper")

add=async (req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData.title){
        validation+=" title is required"
    }

    if(!formData.description){
        validation+=" description  is required"
    }

    if(!req.file){
        validation+=" image is required"
    }
    if(!formData.dob){
        validation+=" dob is required"
    }
    if(!formData.location){
        validation+=" location is required"
    }

    
   
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        let total = await PostModel.countDocuments().exec()
        let PostObj=new PostModel()
        PostObj.title=formData.title
        PostObj.description=formData.description
        PostObj.dob=formData.dob
        PostObj.location=formData.location
        try{
            let url= await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
            PostObj.image=url
        }
        catch(err){
            console.log(err)
            res.json({
                status:500,
                success:false,
                message:"error while uploading image!!",
                err:err.message
            })
        }
        PostObj.addedById = req.decoded.userId;
        PostObj.autoId=total+1 
        PostObj.save()
        .then((PostData)=>{
            res.json({
                status:200,
                success:true,
                message:" Post updated Sucessfully!",
                data: PostData
            })
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:err
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
    PostModel.find(formData)
   .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({path:"addedById" , select: "name email" })
    // .sort({createdAt:-1})
    .then(async (postData)=>{
        if(postData.length>0){
            let total=await PostModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Post loaded",
                total:total,
                data:postData        
                })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No Post Found!!",
                data:postData
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
        PostModel.findOne({_id:formData._id})
        .populate({
            path: "addedById",  // Assuming there's a reference field 'addedById'
            select: "name email"  // Modify according to the fields you want to populate
        })
        .then((PostData)=>{
            if(!PostData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Post found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Post  exists",
                    data:PostData
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
        PostModel.findOne({_id:formData._id})
        .then(async(postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"No post found!!"
                })
            }else{
                
                if(!!formData.title){
                    postData.title=formData.title 
                }
                if(!!formData.description){
                    postData.description=formData.description 
                }
                 if(!!formData.location){
                    postData.location=formData.location 
                }
                 if(!!formData.dob){
                    postData.dob=formData.dob 
                }
                if(!!req.file){
                    try{
                        let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                        postData.image=url
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
               postData.save()
               .then((postData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"post updated successfully!!",
                        data:postData
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
        PostModel.findOne({_id:formData._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"No post found!!"
                })
            }else{
            postData.status=!postData.status 
               postData.save()
               .then((postData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data:postData
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


const Like = (req, res) => {
    
    const postId = req.body.postId; // Get postId from request body
    const userId = req.decoded.userId; // Get userId from decoded JWT (middleware)
  
    
    if (!postId) {
      return res.status(400).json({ success: false, message: 'Post ID is required' });
    }
  
    PostModel.findById(postId)
      .then(post => {
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
  
        const isLiked = post.likes.includes(userId);
  
        if (isLiked) {
          post.likes.pull(userId); // Unlike the post
        } else {
          post.likes.push(userId); // Like the post
        }
  
        // Optional: Assign the user who liked the post (addedById or other fields)
        post.addedById = userId; // You can store the user who liked the post (or any other field)
  
        post.save()
          .then(updated => {
            res.status(200).json({
                success: true,
                message: isLiked ? 'Post unliked' : 'Post liked',
                totalLikes: updated.likes.length,
                liked: !isLiked,
                data: updated
              });
            })
            .catch(err => {
              res.status(500).json({ success: false, message: err.message });
            });
        })
        .catch(err => {
          res.status(500).json({ success: false, message: err.message });
        });
    };


module.exports={add,all,single,update,changeStatus,Like}