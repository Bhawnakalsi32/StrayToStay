const UserModel = require("../User/UserModel")
const NgoModel=require("./NgoModel")
const bcryptjs=require("bcryptjs")
const { uploadImg } = require("../../utilities/Helper")

register=(req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData.ngoName){
        validation+="NgoName is required"
    }
    if(!formData.email){
        validation+=" email is required"
    }
    if(!formData.password){
        validation+=" password is required"
    }
    if(!formData.description){
        validation+=" description is required"
    }
    if(!formData.address){
        validation+=" address is required"
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
                userObj.userType=3
                userObj.save()
                .then(async (userData)=>{
                    // insert into Ngo model 
                    let NgoTotal=await NgoModel.countDocuments().exec()
                    let NgoObj=new NgoModel() 
                    NgoObj.autoId=NgoTotal+1 
                    NgoObj.description=formData.description
                    NgoObj.ngoName=formData.ngoName
                    NgoObj.address=formData.address
                    try{
            let url= await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
            NgoObj.logo=url
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
                    NgoObj.userId=userData._id 
                    NgoObj.save()
                    .then((NgoData)=>{
                        res.json({
                            status:201,//created
                            success:true,
                            message:"Ngo registered Successfully!",
                            NgoData,
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
                    message:"Ngo already exist",
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

all=(req,res)=>{
    let formData=req.body
    let limit=formData.limit  
    let currentPage=formData.currentPage 
    delete formData.limit 
    delete formData.currentPage
    //skip, sort, limit
    NgoModel.find(formData)
    .populate({
        path: "userId",
        select: "name email" // Adjust fields based on your UserModel
    })
   .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (NgoData)=>{
        if(NgoData.length>0){
            let total=await NgoModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Ngo loaded",
                total:total,
                data:NgoData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"No Ngo Found!!",
                data:NgoData
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

single = (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json({
            status: 422,
            success: false,
            message: "userId is required",
        });
    }

    NgoModel.findOne({ userId })
        .populate({
            path: "userId",
            select: "name email",
        })
        .then((NgoData) => {
            if (!NgoData) {
                return res.json({
                    status: 404,
                    success: false,
                    message: "No Ngo found!!",
                });
            }

            return res.json({
                status: 200,
                success: true,
                message: "Ngo exists",
                data: NgoData,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err,
            });
        });
};



update = (req, res) => {
  let formData = req.body;
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

  NgoModel.findOne({ userId: formData.userId })
    .then(async (NgoData) => {
      if (!NgoData) {
        return res.json({
          status: 404,
          success: false,
          message: "No NGO found!!",
        });
      }

      // Update NGO fields
      if (!!formData.ngoName) {
        NgoData.ngoName = formData.ngoName;
      }
      if (!!formData.description) {
        NgoData.description = formData.description;
      }
      if (!!formData.address) {
        NgoData.address = formData.address;
      }
       if(!!req.file){
                          try{
                              let url=await uploadImg(req.file.buffer) //we will only send buffer object to the cloudinary upload
                              NgoData.logo=url
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

      // Save NGO first
      await NgoData.save();

      // Update email in User model
      if (!!formData.email) {
        await UserModel.findByIdAndUpdate(NgoData.userId, {
          email: formData.email,
        });
      }

      // Fetch updated NGO profile with populated user info
      const updatedNgo = await NgoModel.findOne({ userId: formData.userId })
        .populate({
          path: "userId",
          select: "name email",
        });

      return res.json({
        status: 200,
        success: true,
        message: "NGO updated successfully!!",
        data: updatedNgo,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    });
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
        NgoModel.findOne({userId:formData.userId})
        .then((NgoData)=>{
            if(!NgoData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Ngo found!!"
                })
            }else{
            NgoData.status=!NgoData.status 
               NgoData.save()
               .then((NgoData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data:NgoData
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
simpleList = (req, res) => {
    NgoModel.find({ status: true }) // Only active NGOs
        .select("ngoName userId")  // minimal fields
        .populate({
            path: "userId",
            select: "name email"
        })
        .then((data) => {
            res.json({
                status: 200,
                success: true,
                message: "NGO list loaded",
                data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err,
            });
        });
};


module.exports={register,all,single,update,changeStatus,simpleList}