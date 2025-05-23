const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"dnizcmxbn", // Replace with your Cloudinary Cloud Name
    api_key: "524244327891221",       // Replace with your Cloudinary API Key
    api_secret:"E6fHS3xAcoPOHWgkHJTvZEjLTzg"  // Replace with your Cloudinary API Secret
  });

const uploadImg = (fileBuffer, publicId) => {  
    console.log(fileBuffer, publicId);
    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { publicId },
            (error, uploadResult) => {
                if (error) {
                    return reject({ error: "Upload failed", details: error });
                }
                else{
                    resolve(uploadResult.secure_url);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};


module.exports = {
    uploadImg
};