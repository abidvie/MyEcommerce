const { ImageUploadUtils } = require("../../helpers/Cloudinary");


const handleImageUpload= async (req,res)=>{
    try{
        const base64Image=req.file.buffer.toString('base64');
        const dataUrl=`data:${req.file.mimetype};base64,${base64Image}`;
        const result=await ImageUploadUtils(dataUrl);
        res.status(200).json({ message: "Image uploaded successfully", imageUrl: result.secure_url });
       

    } catch(error){
        console.error("Error handling image upload:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleImageUpload }; 