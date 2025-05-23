const AdoptionRequestModel=require("./AdoptionRequestModel")
const { uploadImg } = require("../../utilities/Helper")
const nodemailer=require("nodemailer")
const PetListingModel = require("../PetListing/PetListingModel")

add = async (req, res) => {
    let validation = "";
    let formData = req.body;
    if (!formData.petId) {
        validation += " petId is required.";
      }
    if (!req.files?.idProof) {
      validation += " idProof is required.";
    }
    if (!req.files?.incomeCertificate) {
      validation += " incomeCertificate is required.";
    }
    if (!req.files?.bankStatement) {
      validation += " bankStatement is required.";
    }
    if (!req.files?.addressProof) {
      validation += " addressProof is required.";
    }
  
    if (validation.trim()) {
      return res.json({
        status: 422,
        success: false,
        message: validation.trim(),
      });
    }
  
    let total = await AdoptionRequestModel.countDocuments().exec();
    let AdoptionRequestObj = new AdoptionRequestModel();
    AdoptionRequestObj.petId = formData.petId;
    AdoptionRequestObj.addedById = req.decoded.userId;
    try {
      let idProof = await uploadImg(req.files.idProof[0].buffer);
      let incomeCertificate = await uploadImg(req.files.incomeCertificate[0].buffer);
      let bankStatement = await uploadImg(req.files.bankStatement[0].buffer);
      let addressProof = await uploadImg(req.files.addressProof[0].buffer);
  
      
      AdoptionRequestObj.idProof = idProof;
      AdoptionRequestObj.incomeCertificate = incomeCertificate;
      AdoptionRequestObj.bankStatement = bankStatement;
      AdoptionRequestObj.addressProof = addressProof;
     
      // optional: set autoId
      AdoptionRequestObj.autoId = total + 1;
  
      const savedData = await AdoptionRequestObj.save();

      // mail notification
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: '"NgoName" <bhawnakalsi4@gmail.com>',
        to: req.decoded.email, // must exist on decoded token
        subject: "Adoption Request Submitted ✔",
        text: "Dear User, your adoption request has been successfully submitted. We will contact you shortly!",
        html: `
            <p>Dear User,</p>
            <p><b>Your adoption request has been successfully submitted.</b></p>
            <p>We will contact you shortly!</p>
            <p>If you have any questions, feel free to contact us.</p>
            <br/>
            <p>Thanks,<br/>Starytostay</p>
        `,
    });
  
      return res.json({
        status: 200,
        success: true,
        message: "AdoptionRequest added successfully!",
        data: savedData,
      });
    } catch (err) {
      console.error("Upload or DB error:", err);
      return res.json({
        status: 500,
        success: false,
        message: "Error while uploading or saving data.",
        error: err.message || err,
      });
    }
  };
  

all = async (req, res) => {
    let formData = req.body;
    let limit = formData.limit;
    let currentPage = formData.currentPage;
    const ngoId = formData.ngoId;

    delete formData.limit;
    delete formData.currentPage;
    delete formData.ngoId;

    let query = { ...formData };

    try {
        // If ngoId is passed (NGO panel), filter pets added by this NGO
        if (ngoId) {
            // First get all pet IDs added by this NGO
            const petsAddedByNgo = await PetListingModel.find({ addedById: ngoId }, '_id');
            const petIds = petsAddedByNgo.map(pet => pet._id);

            // Now only get adoption requests for those pets
            query.petId = { $in: petIds };
        }

        const AdoptionRequestData = await AdoptionRequestModel.find(query)
            .limit(limit)
            .skip((currentPage - 1) * limit)
            .populate([
                { path: "addedById", select: "name email" },
                { path: "petId", select: "petName image" }, // ✅ Fetching petName and image
            ]);

        if (AdoptionRequestData.length > 0) {
            const total = await AdoptionRequestModel.countDocuments(query).exec();
            return res.json({
                status: 200,
                success: true,
                message: "Adoption Request loaded",
                total,
                data: AdoptionRequestData
            });
        } else {
            return res.json({
                status: 404,
                success: false,
                message: "No AdoptionRequest Found!!",
                data: []
            });
        }
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err
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
        AdoptionRequestModel.findOne({_id:formData._id})
   .populate("petId", "petName") 
   .populate("addedById", "name email")
        .then((AdoptionRequestData)=>{
            if(!AdoptionRequestData){
                res.json({
                    status:404,
                    success:false,
                    message:"No AdoptionRequest found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"AdoptionRequest exists",
                    data:AdoptionRequestData
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

update = async (req, res) => {
    let formData = req.body;
    let validation = "";
  
    if (!formData._id) {
      validation += "_id is required";
    }
  
    if (!!validation.trim()) {
      return res.json({
        status: 422,
        success: false,
        message: validation,
      });
    }
  
    try {
      const AdoptionRequestData = await AdoptionRequestModel.findOne({ _id: formData._id });
  
      if (!AdoptionRequestData) {
        return res.json({
          status: 404,
          success: false,
          message: "No AdoptionRequest found!",
        });
      }
  
      // Upload images only if they exist in request
      if (req.files?.idProof?.[0]) {
        const idProof = await uploadImg(req.files.idProof[0].buffer);
        AdoptionRequestData.idProof = idProof;
      }
      if (req.files?.incomeCertificate?.[0]) {
        const incomeCertificate = await uploadImg(req.files.incomeCertificate[0].buffer);
        AdoptionRequestData.incomeCertificate = incomeCertificate;
      }
      if (req.files?.bankStatement?.[0]) {
        const bankStatement = await uploadImg(req.files.bankStatement[0].buffer);
        AdoptionRequestData.bankStatement = bankStatement;
      }
      if (req.files?.addressProof?.[0]) {
        const addressProof = await uploadImg(req.files.addressProof[0].buffer);
        AdoptionRequestData.addressProof = addressProof;
      }
  
      // You can also update other fields from formData here if needed:
      // AdoptionRequestData.someField = formData.someField;
  
      const savedData = await AdoptionRequestData.save();
  
      return res.json({
        status: 200,
        success: true,
        message: "AdoptionRequest updated successfully!",
        data: AdoptionRequestData,
      });
  
    } catch (err) {
      console.error("Update error:", err);
      return res.json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err.message || err,
      });
    }
  };
  
changeStatus=(req,res)=>{
    let validation=""
    let formData=req.body 
    if(!formData._id){
        validation+="_id is required"
    }
    if(!formData.status){
        validation+="Status is required"
    }
    
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        AdoptionRequestModel.findOne({_id:formData._id})
        .then((AdoptionRequestData)=>{
            if(!AdoptionRequestData){
                res.json({
                    status:404,
                    success:false,
                    message:"No AdoptionRequest found!!"
                })
            }else{
                if(!!formData.status){
                    AdoptionRequestData.status=formData.status 
                }
                AdoptionRequestData.save()
               .then(( AdoptionRequestData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated successfully",
                        data: AdoptionRequestData
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
module.exports={add,update,single,all,changeStatus}