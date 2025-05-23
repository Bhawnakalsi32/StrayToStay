const { uploadImg } = require("../../utilities/Helper")
const VolunteerModel = require("./VolunteerModel")
const UserModel=require("../User/UserModel")
const bcryptjs=require("bcryptjs")

// REGISTER

register=(req,res)=>{
   
    let validation=""
    let formData=req.body 
    if(!formData.name){
        validation+="Name is required"
    }
    
    if(!formData.contact){
        validation+=" contact is required"
    }
    // if(!formData.userId){
    //     validation+=" user_id is required"
    // }
   
    
   
   
    if(!formData.password){
        validation+=" password is required"
    }
    if(!formData.email){
        validation+=" email is required"
    }
    // if(!req.file){
    //     validation+="Image is required"
    // }
   

    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        UserModel.findOne({email:formData.email})
        .then(async (userData)=>{
            if(!userData){
                //insert in userModel first 
                let userTotal=await UserModel.countDocuments().exec()
                let userObj=new UserModel()
                userObj.autoId=userTotal+1
                userObj.name=formData.name 
                userObj.email=formData.email 
                userObj.password=bcryptjs.hashSync(formData.password,10) 
                userObj.userType=2
                userObj.save()
                .then(async (userData)=>{
                    // insert into customer model 
                    let volunteerTotal=await VolunteerModel.countDocuments().exec()
                    let volunteerObj=new VolunteerModel() 
                    volunteerObj.autoId=volunteerTotal+1 
                    volunteerObj.contact=formData.contact
                    volunteerObj.userId=userData._id 
                     
                    // try{
                    //     let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                    //     volunteerObj.image=url
                    // }
                    // catch(err){
                    //     res.json({
                    //         status:500,
                    //         success:false,
                    //         message:"error while uploading image!!"
                    //     })
                    // }
                    volunteerObj.save()
                    .then((volunteerData)=>{
                        res.json({
                            status:201,//created
                            success:true,
                            message:"Volunteer registered Successfully!",
                            volunteerData,
                            userData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error!!"
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Volunteer already exist",
                    data:userData
                })
            }
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



//     VolunteerModel.find({addedById:req.decoded.userId})
    
//     .then((VolunteerData)=>{
//         if(VolunteerData.length>0){
//             res.json({
//                 status:200,
//                 success:true,
//                 message:"Volunteer Data loaded",
//                 data:VolunteerData
//             })
//         }else{
//             res.json({
//                 status:404,
//                 success:false,
//                 message:"Volunteer in PetListing"
//             })
//         }
//     })
// }

all=(req,res)=>{ 
    let formData=req.body
    let limit=formData.limit  
    let currentPage=formData.currentPage 
    delete formData.limit 
    delete formData.currentPage
    //skip, sort, limit
    VolunteerModel.find(formData)
   .limit(limit)
    .skip((currentPage-1)*limit)
    .populate({
        path:"userId",
        select: "name email" 
    })
    // .sort({createdAt:-1})
    .then(async (volunteerData)=>{
        if(volunteerData.length>0){
            let total=await VolunteerModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Volunteer loaded",
                total:total,
                data:volunteerData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No Volunteer Found!!",
                data:volunteerData
            })
        }
        
    }) 
    .catch((err)=>{
        console.error("Error in 'all' API:", err);
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
        })
    })   
}


single = (req, res) => {
    let validation = "";
    let formData = req.body;

    if (!formData.userId) {
        validation += "userId is required";
    }

    if (!!validation.trim()) {
        res.json({
            status: 422,
            success: false,
            message: validation,
        });
    } else {
        VolunteerModel.findOne({ userId: formData.userId })
            .populate({
                path: "userId",
                select: "name email",
            })
            .then((VolunteerData) => {
                if (!VolunteerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Volunteer not found!!",
                    });
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Volunteer exists",
                        data: VolunteerData,
                    });
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    error: err,
                });
            });
    }
};


update = async (req, res) => {
  const formData = req.body;
  let validation = "";

  if (!formData.userId) {
    validation += "userId is required";
  }

  if (!!validation.trim()) {
    return res.json({
      status: 422,
      success: false,
      message: validation,
    });
  }

  try {
    const volunteer = await VolunteerModel.findOne({ userId: formData.userId });
    if (!volunteer) {
      return res.json({
        status: 404,
        success: false,
        message: "No Volunteer found!!",
      });
    }

    // ✅ Update Volunteer model fields
    if (formData.contact) {
      volunteer.contact = formData.contact;
    }
    await volunteer.save();

    // ✅ Update User model fields
    const user = await UserModel.findOne({ _id: formData.userId });
    if (user) {
      if (formData.name) {
        user.name = formData.name;
      }
      if (formData.email) {
        user.email = formData.email;
      }
      await user.save();
    }

    return res.json({
      status: 200,
      success: true,
      message: "Volunteer and user updated successfully!",
      data: { volunteer, user },
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};


changeStatus=(req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData.userId){
        validation+="userId is required"
    }
    
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        VolunteerModel.findOne({userId:formData.userId})
        .then(( VolunteerData)=>{
            if(! VolunteerData){
                res.json({
                    status:404,
                    success:false,
                    message:"No  Volunteer found!!"
                })
            }else{
                VolunteerData.status=! VolunteerData.status 
                VolunteerData.save()
               .then(( VolunteerData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data: VolunteerData
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
 module.exports={ register, all, single, update, changeStatus}