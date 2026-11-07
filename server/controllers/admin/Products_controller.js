// const { ImageUploadUtils } = require("../../helpers/Cloudinary");
// const Product = require("../../model/products");

// const handleImageUpload= async (req,res)=>{
//     try{
//         const base64Image=req.file.buffer.toString('base64');
//         const dataUrl=`data:${req.file.mimetype};base64,${base64Image}`;
//         const result=await ImageUploadUtils(dataUrl);
//         res.status(200).json({ message: "Image uploaded successfully", imageUrl: result.secure_url });
       

//     } catch(error){
//         console.error("Error handling image upload:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }



// const addproduct = async (req, res) => {
//     try {   
//         const { name, description, price, category, image, stock, discount, badges } = req.body;

//         const newProduct = new Product({
//             name,
//             description,
//             price: Number(price),
//             category,
//             image,
//             stock: Number(stock),
//             discount: Number(discount),
//             badges
//         });

//         await newProduct.save();

//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     }catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// const fatchAllProduct = async (req, res) => {
//     try {

      
//         const products = await Product.find({});
//         res.status(200).json({
//             message: "Products fetched successfully",
//             products: products,
//         });
    
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// const editProduct = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const { name, description, price, category, image, stock, discount, badges } = req.body;

//         const updatedProduct = await Product.findByIdAndUpdate(productId, {
//             name,
//             description,
//             price,
//             category,
//             image,
//             stock,
//             discount,
//             badges
//         }, { returnDocument: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (error) {
//         console.error("Error editing product:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }

// }


// const deleteProduct = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const deletedProduct = await Product.findByIdAndDelete(productId);
   
//         if (!deletedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }
//         res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
//     } catch (error) {
//         console.error("Error deleting product:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }   

// }
        
        



// module.exports = { handleImageUpload, addproduct, fatchAllProduct, editProduct, deleteProduct }; 











const { ImageUploadUtils } = require("../../helpers/Cloudinary");
const Product = require("../../model/products");

// Calculate product status based on stock quantity
const getProductStatus = (stock) => {
    const quantity = Number(stock);

    if (quantity === 0) return "Out of Stock";
    if (quantity <= 10) return "Low Stock";

    return "Active";
};


// Upload product image
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please select an image",
            });
        }

        const base64Image = req.file.buffer.toString("base64");
        const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

        const result = await ImageUploadUtils(dataUrl);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.error("Error handling image upload:", error);

        res.status(500).json({
            message: "Image upload failed",
        });
    }
};


// Add a new product
const addproduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image,
            stock,
            discount,
            badges,
        } = req.body;

        const numericStock = Number(stock);

        const newProduct = new Product({
            name,
            description,
            price: Number(price),
            category,
            image,
            stock: numericStock,
            discount: Number(discount || 0),
            badges: badges || null,
            status: getProductStatus(numericStock),
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
        });

    } catch (error) {
        console.error("Error adding product:", error);

        res.status(400).json({
            message: "Error adding product",
            error: error.message,
        });
    }
};


// Fetch all products
const fatchAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            message: "Products fetched successfully",
            products,
        });

    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Error fetching products",
        });
    }
};


// Edit product
const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const {
            name,
            description,
            price,
            category,
            image,
            stock,
            discount,
            badges,
        } = req.body;

        // Build update object
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = Number(price);
        if (category !== undefined) updateData.category = category;
        if (image !== undefined) updateData.image = image;
        if (discount !== undefined) updateData.discount = Number(discount);
        if (badges !== undefined) updateData.badges = badges || null;

        // Update stock and automatically calculate status
        if (stock !== undefined) {
            const numericStock = Number(stock);

            updateData.stock = numericStock;
            updateData.status = getProductStatus(numericStock);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateData },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        console.error("Error editing product:", error);

        res.status(400).json({
            message: "Error updating product",
            error: error.message,
        });
    }
};


// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });

    } catch (error) {
        console.error("Error deleting product:", error);

        res.status(500).json({
            message: "Error deleting product",
        });
    }
};


module.exports = {
    handleImageUpload,
    addproduct,
    fatchAllProduct,
    editProduct,
    deleteProduct,
};






