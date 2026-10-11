const express = require("express");
const router = express.Router();

const { handleImageUpload } = require("../../controllers/admin/Products_controller");
const { upload } = require("../../helpers/Cloudinary");


router.post("/upload-image", upload.single("file"), handleImageUpload);

module.exports = router;
