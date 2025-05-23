const UserModel = require("../User/UserModel")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const SECRET="MyProject@123"
login=(req,res)=>{
    let validation=""
    let formData=req.body
    if(!formData.email){
      validation+="Email is required"
    }
    if(!formData.password){
        validation+=" Password is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        UserModel.findOne({email:formData.email})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"User doesn't exist!"
                })
            }else{
              let result=  bcryptjs.compareSync(formData.password, userData.password)
              if(result){
                let payload={
                    userId:userData._id,
                    email:userData.email,
                    userType:userData.userType,
                    name:userData.name
                }
                let token=jwt.sign(payload, SECRET, {expiresIn:"24h"})
                res.json({
                    status:200,
                    success:true,
                    message:"Login successfully!!",
                    token,
                    data:userData
                })
              }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Invalid credentials"
                })
              }
              
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!!"
            })
        })
    }
}

changePassword=(req,res)=>{
    let formData=req.body 
    let validation=""
    if(!formData.oldPassword){
        validation+="Enter Old Password "
    }
    if(!formData.newPassword){
        validation+="Enter New Password "
    }
    if(!formData.confirmPassword){
        validation+="Enter Confirm Password "
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        if(formData.newPassword===formData.confirmPassword){
            UserModel.findOne({_id:req.decoded.userId})
            .then((userData)=>{
                let result=bcryptjs.compareSync(formData.oldPassword, userData.password)
                if(result){
                    userData.password=bcryptjs.hashSync(formData.newPassword, 10)
                    userData.save()
                    .then((userData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Password changed successfully!!"
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error"
                        })
                    })
                    
                }else{
                    res.json({
                        status:200,
                        success:false,
                        message:"Old Password doesn't match!"
                    })
                }
            })
            .catch((err)=>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error"
                })
            })
        }else{
            res.json({
                status:200,
                success:false,
                message:"New password doesn't match with confirm password"
            })
        }
    }
    
}

module.exports={login,changePassword}