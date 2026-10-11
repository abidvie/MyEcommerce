const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dw7lddpyb",
  api_key: "826327612959425",
  api_secret: "hgSaA65UVi49amPa6Iisn7iJB10",
});

const storage=multer.memoryStorage();


async function ImageUploadUtils(file) {
  try {
    const result = await cloudinary.uploader.upload(file,
      { resource_type: "auto"},
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw error;
        }
        return result;
      }
    );

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }  
}
  

const upload = multer({ storage });

module.exports = { ImageUploadUtils, upload };