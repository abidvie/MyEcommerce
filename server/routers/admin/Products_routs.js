const express = require("express");
const router = express.Router();

const { handleImageUpload,addproduct,fatchAllProduct,deleteProduct,editProduct } = require("../../controllers/admin/Products_controller");
const { upload } = require("../../helpers/Cloudinary");



router.post("/upload-image", upload.single("file"), handleImageUpload);
router.post("/add", addproduct);
router.get("/fetch", fatchAllProduct);
router.put("/edit/:productId", editProduct);
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
