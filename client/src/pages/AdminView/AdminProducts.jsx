

// import React, { useMemo, useState } from "react";

// import {
//   Plus,
//   Search,
//   SlidersHorizontal,
//   Package,
//   Boxes,
//   AlertTriangle,
//   Pencil,
//   Trash2,
//   Eye,
//   X,
//   ImagePlus,
//   Upload,
//   Link,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle2,
//   XCircle,
//   DollarSign,
// } from "lucide-react";

// import { motion, AnimatePresence } from "framer-motion";

// import "./AdminProducts.css";
// import { useEffect } from "react";
// import axios from "axios";
// import {useDispatch,useSelector} from 'react-redux'

// import { addProduct, deleteProducts, editProduct } from "../../store/admin/product_slice";
// import { fetchAllProducts } from "../../store/admin/product_slice";

// /* =========================================================
//    EMPTY PRODUCT
// ========================================================= */

// const emptyProduct = {
//   name: "",
//   description: "",
//   category: "Electronics",
//   price: "",
//   stock: "",
//   image: "",
//   badges: "Best Seller",
//   discount: 0,
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// function AdminProducts() {
//   const [Imagefile, setImageFile] = useState("");
//   // const [products, setProducts] = useState(initialProducts);
//    const dispatch = useDispatch();
//  const {products,isloading,error} = useSelector((state)=>state.adminProduct)  

//      useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);



//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [stockFilter, setStockFilter] = useState("All");

//   const [showModal, setShowModal] = useState(false);

//   const [editingProduct, setEditingProduct] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [deleteProduct, setDeleteProduct] = useState(null);

//   const [productForm, setProductForm] = useState(emptyProduct);

//   /* Image states */

//   const [imageMode, setImageMode] = useState("upload");
//   const [imagePreview, setImagePreview] = useState("");

//   const [page, setPage] = useState(1);

//   const productsPerPage = 6;

//   /* =========================================================
//      FILTER PRODUCTS
//   ========================================================= */

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.name.toLowerCase().includes(search.toLowerCase()) ||
//         product._id.toLowerCase().includes(search.toLowerCase());

//       const matchesCategory =
//         category === "All" || product.category === category;

//       let matchesStock = true;

//       if (stockFilter === "In Stock") {
//         matchesStock = product.stock > 0;
//       }

//       if (stockFilter === "Low Stock") {
//         matchesStock = product.stock > 0 && product.stock <= 10;
//       }

//       if (stockFilter === "Out of Stock") {
//         matchesStock = product.stock === 0;
//       }

//       return matchesSearch && matchesCategory && matchesStock;
//     });
//   }, [products, search, category, stockFilter]);

//   /* =========================================================
//      PAGINATION
//   ========================================================= */

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredProducts.length / productsPerPage)
//   );

//   const currentProducts = filteredProducts.slice(
//     (page - 1) * productsPerPage,
//     page * productsPerPage
//   );

//   /* =========================================================
//      STATISTICS
//   ========================================================= */

//   const stats = {
//     total: products.length,

//     active: products.filter((p) => p.status === "Active").length,

//     lowStock: products.filter(
//       (p) => p.stock > 0 && p.stock <= 10
//     ).length,

//     outOfStock: products.filter(
//       (p) => p.stock === 0
//     ).length,
//   };

//   /* =========================================================
//      OPEN ADD MODAL
//   ========================================================= */

//   const openAddModal = () => {
//     setEditingProduct(null);

//     setProductForm({
//       ...emptyProduct,
//     });

//     setImageMode("upload");
//     setImagePreview("");

//     setShowModal(true);
//   };

//   /* =========================================================
//      OPEN EDIT MODAL 
//   ========================================================= */

//   const openEditModal = (product) => {
//     setEditingProduct(product);

//     setProductForm({


//       name: product.name,
//       description: product.description || "",
//       category: product.category,
//       price: product.price,
//       stock: product.stock,
//       image: product.image,
//       badges: product.badges || "best Seller",
//       discount: product.discount || 0,
//     });

//     setImageMode("url");
//     setImagePreview(product.image);

//     setShowModal(true);
//   };

//   /* =========================================================
//      FORM CHANGE
//   ========================================================= */

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     setProductForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================================================
//      IMAGE UPLOAD
//   ========================================================= */

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const allowedTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//     ];

//     /* Check image type */

//     if (!allowedTypes.includes(file.type)) {
//       alert("Please upload a JPG, JPEG, or PNG image.");
//       return;
//     }

//     /* Check file size */

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image size must be less than 5MB.");
//       return;
//     }

//     /* Create temporary preview */
//     console.log("File uploaded:", file);
//     setImageFile(file);



//     const previewUrl = URL.createObjectURL(file);

//     setImagePreview(previewUrl);

//     setProductForm((prev) => ({
//       ...prev,
//       image: previewUrl,
//     }));
//   };





//   const uploadImageCloudinary = async (file) => {
//   try {
//     if (!file) {
//       return;
//     }

//     const formData = new FormData();

//     formData.append("file", file);
//     console.log("Uploading image to Cloudinary:", formData);


//     const response = await axios.post(
//       "http://localhost:5000/api/admin/products/upload-image",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     console.log("Upload response:", response.data);

//      setProductForm((prev) => ({
//       ...prev,
//       image: response.data.imageUrl,
//     }));

//   } catch (error) {
//     console.error("Image upload error:", error);
//   }


 

// };

//  useEffect(() => {
//   if (Imagefile) {
//     uploadImageCloudinary(Imagefile);
//   }
// }, [Imagefile]);







//   /* =========================================================
//      SAVE PRODUCT
//   ========================================================= */

//   const handleSaveProduct = async (e) => {
//     e.preventDefault();
//     console.log("Saving product:", productForm);
   

  


//     if (
//       !productForm.name.trim() ||
//       !productForm.description.trim() ||
//       !productForm.price ||
//       productForm.stock === ""||
//       productForm.discount === ""||
//       productForm.badges.trim() === "" 
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const stock = Number(productForm.stock);

//     let status = "Active";

//     if (stock === 0) {
//       status = "Out of Stock";
//     } else if (stock <= 10) {
//       status = "Low Stock";
//     }

//     /* =====================================================
//        EDIT EXISTING PRODUCT
//     ===================================================== */

//     if (editingProduct) {
     
       

// const stock = Number(productForm.stock);
// const status = stock > 0 ? "In Stock" : "Out of Stock";
//         // useDispatch(editProduct({ productId: editingProduct._id, updatedData: { ...productForm, stock, status } }));

//         const result = await dispatch(editProduct({ productId: editingProduct._id, updatedData: { ...productForm, stock, status } })).unwrap();
//         console.log("result in the edited jsx",result);
     
//     }

//     /* =====================================================
//        ADD NEW PRODUCT
//     ===================================================== */

//     else {
//       const stock = Number(productForm.stock);


//         const result = await dispatch(addProduct(productForm)).unwrap();



//     }

  

//     setShowModal(false);

//     setProductForm({
//       ...emptyProduct,
//     });

//     setImagePreview("");
//   };

//   /* =========================================================
//      DELETE PRODUCT
//   ========================================================= */

//   const handleDelete =async () => {
//     if (!deleteProduct) return;

//    const productId = deleteProduct._id;
//   //  console.log("Deleting product with ID:", productId);
//    const result = await dispatch(deleteProducts(productId)).unwrap();
//    console.log("result in the deleted jsx",result);

//     setDeleteProduct(null);
//   };

//   /* =========================================================
//      STOCK CLASS
//   ========================================================= */

//   const getStockClass = (product) => {
//     if (product.stock === 0) {
//       return "stock-danger";
//     }

//     if (product.stock <= 10) {
//       return "stock-warning";
//     }

//     return "stock-good";
//   };

//   /* =========================================================
//      JSX
//   ========================================================= */

//   return (
//     <div className="products-page">

//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <motion.div
//         className="products-page-header"
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <div>
//           <div className="products-title-row">

//             <div className="products-title-icon">
//               <Package size={23} />
//             </div>

//             <div>
//               <h1>Products</h1>

//               <p>
//                 Manage your ecommerce products and inventory.
//               </p>
//             </div>

//           </div>
//         </div>

//         <motion.button
//           className="primary-product-btn"
//           whileHover={{
//             y: -2,
//             scale: 1.02,
//           }}
//           whileTap={{
//             scale: 0.97,
//           }}
//           onClick={openAddModal}
//         >
//           <Plus size={19} />

//           Add Product
//         </motion.button>
//       </motion.div>

//       {/* =====================================================
//           STATS
//       ===================================================== */}

//       <div className="product-stats-grid">

//         <ProductStat
//           icon={<Boxes size={21} />}
//           title="Total Products"
//           value={stats.total}
//           text="Products in catalog"
//         />

//         <ProductStat
//           icon={<CheckCircle2 size={21} />}
//           title="Active Products"
//           value={stats.active}
//           text="Currently available"
//         />

//         <ProductStat
//           icon={<AlertTriangle size={21} />}
//           title="Low Stock"
//           value={stats.lowStock}
//           text="Need attention"
//         />

//         <ProductStat
//           icon={<XCircle size={21} />}
//           title="Out of Stock"
//           value={stats.outOfStock}
//           text="Currently unavailable"
//         />

//       </div>

//       {/* =====================================================
//           TOOLBAR
//       ===================================================== */}

//       <motion.div
//         className="products-toolbar"
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.1,
//         }}
//       >

//         {/* SEARCH */}

//         <div className="products-search">

//           <Search size={19} />

//           <input
//             type="text"
//             placeholder="Search products or ID..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />

//         </div>

//         {/* FILTERS */}

//         <div className="product-filter-group">

//           <div className="filter-control">

//             <SlidersHorizontal size={17} />

//             <select
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="All">
//                 All Categories
//               </option>

//               <option value="Electronics">
//                 Electronics
//               </option>

//               <option value="Fashion">
//                 Fashion
//               </option>

//               <option value="Home">
//                 Home
//               </option>
//             </select>

//           </div>

//           <div className="filter-control">

//             <select
//               value={stockFilter}
//               onChange={(e) => {
//                 setStockFilter(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="All">
//                 All Stock
//               </option>

//               <option value="In Stock">
//                 In Stock
//               </option>

//               <option value="Low Stock">
//                 Low Stock
//               </option>

//               <option value="Out of Stock">
//                 Out of Stock
//               </option>
//             </select>

//           </div>

//         </div>

//       </motion.div>

//       {/* =====================================================
//           PRODUCT TABLE
//       ===================================================== */}

//       <motion.div
//         className="products-card"
//         initial={{
//           opacity: 0,
//           y: 20,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.15,
//         }}
//       >

//         <div className="products-card-header">

//           <div>
//             <h2>Product Inventory</h2>

//             <p>
//               {filteredProducts.length} products found
//             </p>
//           </div>

//           <div className="inventory-label">

//             <span></span>

//             Live Inventory

//           </div>

//         </div>

//         <div className="products-table-wrapper">

//           <table className="products-table">

//             <thead>

//               <tr>
//                 <th>PRODUCT</th>
//                 <th>CATEGORY</th>
//                 <th>PRICE</th>
//                 <th>STOCK</th>
//                 <th>SOLD</th>
//                 <th>RATING</th>
//                  <th>DISCOUNT</th>
//                 <th>BADGES</th>
//                 <th>STATUS</th>
               
//                 <th>ACTION</th>

//               </tr>

//             </thead>

//             <tbody>

//               <AnimatePresence mode="popLayout">

//                 {currentProducts.map(
//                   (product, index) => (

//                     <motion.tr
//                       key={product._id}
//                       initial={{
//                         opacity: 0,
//                         x: -10,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         x: 0,
//                       }}
//                       exit={{
//                         opacity: 0,
//                         x: 10,
//                       }}
//                       transition={{
//                         delay: index * 0.04,
//                       }}
//                     >

//                       {/* PRODUCT */}

//                       <td>

//                         <div className="product-info">

//                           <img
//                             src={product.image}
//                             alt={product.name}
//                           />

//                           <div>

//                             <strong>
//                               {product.name}
//                             </strong>

//                             <span>
//                               {product.id}
//                             </span>

//                           </div>

//                         </div>

//                       </td>

//                       {/* CATEGORY */}

//                       <td>

//                         <span className="category-badge">
//                           {product.category}
//                         </span>

//                       </td>

//                       {/* PRICE */}

//                       <td>

//                         <strong className="product-price">
//                           ${product.price.toFixed(2)}
//                         </strong>

//                       </td>

//                       {/* STOCK */}

//                       <td>

//                         <span
//                           className={`stock-number ${getStockClass(
//                             product
//                           )}`}
//                         >
//                           {product.stock}
//                         </span>

//                       </td>

//                       {/* SOLD */}

//                       <td>
//                         {product.sold}
//                       </td>

//                       {/* RATING */}

//                       <td>

//                         <span className="product-rating">
//                           ★ {product.rating || "—"}
//                         </span>

//                       </td>


//                           {/*Discount*/}

//                       <td>

//                         <strong className="product-price">
//                           %{product.discount.toFixed(2)}
//                         </strong>

//                       </td>




//                         {/* Badges */}

//                       <td>

//                         <span className="category-badge">
//                           {product.badges}
//                         </span>

//                       </td>

//                       {/* STATUS */}

//                       <td>

//                         <span
//                           className={`status-badge ${
//                             product.status === "Active"
//                               ? "status-active"
//                               : product.status === "Low Stock"
//                               ? "status-low"
//                               : "status-out"
//                           }`}
//                         >
//                           {product.status}
//                         </span>

//                       </td>

//                       {/* ACTIONS */}

//                       <td>

//                         <div className="product-actions">

//                           <button
//                             title="View"
//                             onClick={() =>
//                               setSelectedProduct(product)
//                             }
//                           >
//                             <Eye size={16} />
//                           </button>

//                           <button
//                             title="Edit"
//                             onClick={() =>
//                               openEditModal(product)
//                             }
//                           >
//                             <Pencil size={16} />
//                           </button>

//                           <button
//                             title="Delete"
//                             className="delete-action"
//                             onClick={() =>
//                               setDeleteProduct(product)
//                             }
//                           >
//                             <Trash2 size={16} />
//                           </button>

//                         </div>

//                       </td>

//                     </motion.tr>

//                   )
//                 )}

//               </AnimatePresence>

//             </tbody>

//           </table>

//           {/* EMPTY STATE */}

//           {currentProducts.length === 0 && (

//             <div className="empty-products">

//               <Package size={42} />

//               <h3>
//                 No products found
//               </h3>

//               <p>
//                 Try changing your search or filters.
//               </p>

//             </div>

//           )}

//         </div>

//         {/* ===================================================
//             PAGINATION
//         =================================================== */}

//         <div className="products-pagination">

//           <span>
//             Showing {currentProducts.length} of{" "}
//             {filteredProducts.length}
//           </span>

//           <div>

//             <button
//               disabled={page === 1}
//               onClick={() =>
//                 setPage((p) =>
//                   Math.max(1, p - 1)
//                 )
//               }
//             >
//               <ChevronLeft size={17} />
//             </button>

//             <span className="page-number">
//               {page} / {totalPages}
//             </span>

//             <button
//               disabled={page === totalPages}
//               onClick={() =>
//                 setPage((p) =>
//                   Math.min(
//                     totalPages,
//                     p + 1
//                   )
//                 )
//               }
//             >
//               <ChevronRight size={17} />
//             </button>

//           </div>

//         </div>

//       </motion.div>

//       {/* =====================================================
//           ADD / EDIT PRODUCT MODAL
//       ===================================================== */}

//       <AnimatePresence>

//         {showModal && (

//           <ModalOverlay
//             onClose={() =>
//               setShowModal(false)
//             }
//           >

//             <motion.div
//               className="product-modal"
//               initial={{
//                 opacity: 0,
//                 scale: 0.94,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.94,
//                 y: 20,
//               }}
//             >

//               {/* MODAL HEADER */}

//               <div className="modal-header">

//                 <div>

//                   <h2>
//                     {editingProduct
//                       ? "Edit Product"
//                       : "Add Product"}
//                   </h2>

//                   <p>
//                     {editingProduct
//                       ? "Update product information."
//                       : "Add a new product to your store."}
//                   </p>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowModal(false)
//                   }
//                 >
//                   <X size={20} />
//                 </button>

//               </div>

//               {/* FORM */}

//               <form onSubmit={handleSaveProduct}>

//                 {/* =================================================
//                     PRODUCT IMAGE
//                 ================================================= */}

//                 <div className="product-image-section">

//                   <label className="image-section-label">
//                     Product Image
//                   </label>

//                   {/* IMAGE METHOD TABS */}

//                   <div className="image-method-tabs">

//                     <button
//                       type="button"
//                       className={
//                         imageMode === "upload"
//                           ? "active"
//                           : ""
//                       }
//                       onClick={() => {
//                         setImageMode("upload");
//                       }}
//                     >
//                       <Upload size={17} />

//                       Upload Image
//                     </button>

//                     <button
//                       type="button"
//                       className={
//                         imageMode === "url"
//                           ? "active"
//                           : ""
//                       }
//                       onClick={() => {
//                         setImageMode("url");
//                       }}
//                     >
//                       <Link size={17} />

//                       Image URL
//                     </button>

//                   </div>

//                   {/* =================================================
//                       UPLOAD IMAGE OPTION
//                   ================================================= */}

//                   {imageMode === "upload" && (

//                     <div className="upload-image-area">

//                       {!imagePreview ? (

//                         <label className="upload-dropzone">

//                           <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png,image/jpeg,image/png"
//                             onChange={handleImageUpload}
//                             hidden
//                           />
                             
//                           <div className="upload-icon">

//                             <ImagePlus size={32} />

//                           </div>

//                           <strong>
//                             Click to upload product image
//                           </strong>

//                           <span>
//                             JPG, JPEG or PNG
//                           </span>

//                           <small>
//                             Maximum file size: 5MB
//                           </small>

//                         </label>

//                       ) : (

//                         <div className="image-preview-wrapper">

//                           <img
//                             src={imagePreview}
//                             alt="Product preview"
//                             className="product-image-preview"
//                           />

//                           <label className="change-image-btn">

//                             <input
//                               type="file"
//                               accept=".jpg,.jpeg,.png,image/jpeg,image/png"
//                               onChange={handleImageUpload}
//                               hidden
//                             />

//                             <Upload size={16} />

//                             Change Image

//                           </label>

//                         </div>

//                       )}

//                     </div>

//                   )}

//                   {/* =================================================
//                       IMAGE URL OPTION
//                   ================================================= */}

//                   {imageMode === "url" && (

//                     <div className="image-url-area">

//                       <div className="url-input-wrapper">

//                         <Link size={18} />

//                         <input
//                           name="image"
//                           value={productForm.image}
//                           onChange={(e) => {

//                             handleFormChange(e);

//                             setImagePreview(
//                               e.target.value
//                             );

//                           }}
//                           placeholder="https://example.com/product.jpg"
//                         />

//                       </div>

//                       {productForm.image && (

//                         <img
//                           src={productForm.image}
//                           alt="Product preview"
//                           className="url-image-preview"
//                           onError={(e) => {
//                             e.currentTarget.style.display =
//                               "none";
//                           }}
//                         />

//                       )}

//                     </div>

//                   )}

//                 </div>

//                 {/* =================================================
//                     PRODUCT NAME
//                 ================================================= */}

//                 <div className="form-group">

//                   <label>
//                     Product Name
//                   </label>

//                   <input
//                     name="name"
//                     value={productForm.name}
//                     onChange={handleFormChange}
//                     placeholder="Enter product name"
//                     required
//                   />

//                 </div>

//                 {/* =================================================
//                     PRODUCT DESCRIPTION
//                 ================================================= */}

//                 <div className="form-group description-form-group">

//                   <div className="description-label-row">

//                     <label>
//                       Product Description
//                     </label>

//                     <span>
//                       {productForm.description?.length || 0}/1000
//                     </span>

//                   </div>

//                   <textarea
//                     name="description"
//                     value={productForm.description}
//                     onChange={handleFormChange}
//                     placeholder="Describe your product, features, materials, benefits, specifications, etc."
//                     rows={5}
//                     maxLength={1000}
//                     required
//                   />

//                   <small className="description-helper">
//                     Give customers a clear description of the product.
//                   </small>

//                 </div>

//                 {/* =================================================
//                     CATEGORY + PRICE
//                 ================================================= */}

//                 <div className="form-row">

//                   {/* CATEGORY */}

//                   <div className="form-group">

//                     <label>
//                       Category
//                     </label>

//                     <select
//                       name="category"
//                       value={productForm.category}
//                       onChange={handleFormChange}
//                     >

//                       <option value="Electronics">
//                         Electronics
//                       </option>

//                       <option value="Fashion">
//                         Fashion
//                       </option>

//                       <option value="Home">
//                         Home
//                       </option>

//                     </select>

//                   </div>





//                   {/* Badges */}


//                <div className="form-group">

//                     <label>
//                 Badges
//                     </label>

//                     <select
//                       name="badges"
//                       value={productForm.badges}
//                       onChange={handleFormChange}
//                     >

//                       <option value="Best Seller">
//                         Best Seller
//                       </option>

//                       <option value="Limited Edition">
//                         Limited Edition
//                       </option>

//                       <option value="Exclusive">
//                         Exclusive
//                       </option>
//                       <option value="New Arrival">
//                         New Arrival
//                       </option>

//                     </select>

//                   </div>





//                   {/* PRICE */}

//                   <div className="form-group">

//                     <label>
//                       Price
//                     </label>

//                     <div className="input-with-icon">

//                       <DollarSign size={16} />

//                       <input
//                         type="number"
//                         name="price"
//                         min="0"
//                         step="0.01"
//                         value={productForm.price}
//                         onChange={handleFormChange}
//                         placeholder="0.00"
//                         required
//                       />

//                     </div>

//                   </div>



//                   {/* Discount */}


//                   <div className="form-group">

//                     <label>
//                       Discount (%)
//                     </label>

//                     <div className="input-with-icon">

//                       <DollarSign size={16} />

//                       <input
//                         type="number"
//                         name="discount"
//                         min="0"
//                         step="0.01"
//                         value={productForm.discount}
//                         onChange={handleFormChange}
//                         placeholder="0.00"
//                         required
//                       />

//                     </div>

//                   </div>

//                 </div>












//                 {/* =================================================
//                     STOCK
//                 ================================================= */}

//                 <div className="form-group">

//                   <label>
//                     Stock Quantity
//                   </label>

//                   <input
//                     type="number"
//                     name="stock"
//                     min="0"
//                     value={productForm.stock}
//                     onChange={handleFormChange}
//                     placeholder="0"
//                     required
//                   />

//                 </div>

//                 {/* =================================================
//                     SAVE BUTTON
//                 ================================================= */}

//                 <motion.button
//                   className="save-product-btn"
//                   type="submit"
//                   whileHover={{
//                     y: -1,
//                   }}
//                   whileTap={{
//                     scale: 0.98,
//                   }}
//                 >
//                   {editingProduct
//                     ? "Update Product"
//                     : "Add Product"}
//                 </motion.button>

//               </form>

//             </motion.div>

//           </ModalOverlay>

//         )}

//       </AnimatePresence>

//       {/* =====================================================
//           VIEW PRODUCT MODAL
//       ===================================================== */}

//       <AnimatePresence>

//         {selectedProduct && (

//           <ModalOverlay
//             onClose={() =>
//               setSelectedProduct(null)
//             }
//           >

//             <motion.div
//               className="product-view-modal"
//               initial={{
//                 opacity: 0,
//                 scale: 0.94,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.94,
//               }}
//             >

//               {/* CLOSE BUTTON */}

//               <button
//                 className="modal-close"
//                 type="button"
//                 onClick={() =>
//                   setSelectedProduct(null)
//                 }
//               >
//                 <X size={20} />
//               </button>

//               {/* PRODUCT IMAGE */}

//               <img
//                 src={selectedProduct.image}
//                 alt={selectedProduct.name}
//               />

//               <div>

//                 <span className="modal-product-id">
//                   {selectedProduct.id}
//                 </span>

//                 <h2>
//                   {selectedProduct.name}
//                 </h2>

//                 <p>
//                   {selectedProduct.category}
//                 </p>

//                 <div className="view-product-price">
//                   ${selectedProduct.price.toFixed(2)}
//                 </div>

//                 {/* PRODUCT DESCRIPTION */}

//                 <div className="view-product-description">

//                   <span>
//                     Description
//                   </span>

//                   <p>
//                     {selectedProduct.description ||
//                       "No description available."}
//                   </p>

//                 </div>

//                 {/* DETAILS */}

//                 <div className="product-detail-grid">

//                   <div>

//                     <span>
//                       Stock
//                     </span>

//                     <strong>
//                       {selectedProduct.stock}
//                     </strong>

//                   </div>

//                   <div>

//                     <span>
//                       Sold
//                     </span>

//                     <strong>
//                       {selectedProduct.sold}
//                     </strong>

//                   </div>

//                   <div>

//                     <span>
//                       Rating
//                     </span>

//                     <strong>
//                       ★ {selectedProduct.rating || "—"}
//                     </strong>

//                   </div>

//                 </div>

//               </div>

//             </motion.div>

//           </ModalOverlay>

//         )}

//       </AnimatePresence>

//       {/* =====================================================
//           DELETE MODAL
//       ===================================================== */}

//       <AnimatePresence>

//         {deleteProduct && (

//           <ModalOverlay
//             onClose={() =>
//               setDeleteProduct(null)
//             }
//           >

//             <motion.div
//               className="delete-modal"
//               initial={{
//                 opacity: 0,
//                 scale: 0.94,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0.94,
//               }}
//             >

//               <div className="delete-icon">

//                 <Trash2 size={23} />

//               </div>

//               <h2>
//                 Delete Product?
//               </h2>

//               <p>

//                 Are you sure you want to delete{" "}

//                 <strong>
//                   {deleteProduct.name}
//                 </strong>
//                 ?

//               </p>

//               <div className="delete-buttons">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setDeleteProduct(null)
//                   }
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>

//               </div>

//             </motion.div>

//           </ModalOverlay>

//         )}

//       </AnimatePresence>

//     </div>

  
//   );
// }

// /* =========================================================
//    PRODUCT STAT COMPONENT
// ========================================================= */

// function ProductStat({
//   icon,
//   title,
//   value,
//   text,
// }) {
//   return (
//     <motion.div
//       className="product-stat-card"
//       whileHover={{
//         y: -4,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 300,
//       }}
//     >

//       <div className="product-stat-icon">
//         {icon}
//       </div>

//       <div>

//         <span>
//           {title}
//         </span>

//         <strong>
//           {value}
//         </strong>

//         <small>
//           {text}
//         </small>

//       </div>

//     </motion.div>
//   );
// }

// /* =========================================================
//    MODAL OVERLAY
// ========================================================= */

// function ModalOverlay({
//   children,
//   onClose,
// }) {
//   return (
//     <motion.div
//       className="modal-overlay"
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       exit={{
//         opacity: 0,
//       }}
//       onMouseDown={onClose}
//     >

//       <div
//         onMouseDown={(e) =>
//           e.stopPropagation()
//         }
//       >
//         {children}
//       </div>

//     </motion.div>
//   );
// }

// export default AdminProducts;






import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Package,
  Boxes,
  AlertTriangle,
  Pencil,
  Trash2,
  Eye,
  X,
  ImagePlus,
  Upload,
  Link,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  DollarSign,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  addProduct,
  deleteProducts,
  editProduct,
  fetchAllProducts,
} from "../../store/admin/product_slice";

import "./AdminProducts.css";

// ======================================================
// EMPTY PRODUCT
// ======================================================

const emptyProduct = {
  name: "",
  description: "",
  category: "Electronics",
  price: "",
  stock: "",
  image: "",
  badges: "",
  discount: 0,
};

// ======================================================
// STOCK STATUS HELPER
// ======================================================

const getProductStatus = (stock) => {
  const quantity = Number(stock);

  if (quantity === 0) return "Out of Stock";
  if (quantity <= 10) return "Low Stock";

  return "Active";
};

// ======================================================
// MAIN COMPONENT
// ======================================================

function AdminProducts() {
  const dispatch = useDispatch();

  const { products = [], isloading, error } = useSelector(
    (state) => state.adminProduct
  );

  // Fetch products
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ======================================================
  // STATES
  // ======================================================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [productForm, setProductForm] = useState(emptyProduct);

  const [imageMode, setImageMode] = useState("upload");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  // ======================================================
  // FILTER PRODUCTS
  // ======================================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const stock = Number(product.stock);

      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product._id?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      let matchesStock = true;

      if (stockFilter === "In Stock") {
        matchesStock = stock > 10;
      }

      if (stockFilter === "Low Stock") {
        matchesStock = stock > 0 && stock <= 10;
      }

      if (stockFilter === "Out of Stock") {
        matchesStock = stock === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // ======================================================
  // STATISTICS
  // ======================================================

  const stats = {
    total: products.length,

    active: products.filter(
      (p) => Number(p.stock) > 10
    ).length,

    lowStock: products.filter(
      (p) => Number(p.stock) > 0 && Number(p.stock) <= 10
    ).length,

    outOfStock: products.filter(
      (p) => Number(p.stock) === 0
    ).length,
  };

  // ======================================================
  // OPEN ADD MODAL
  // ======================================================

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({ ...emptyProduct });

    setImageMode("upload");
    setImagePreview("");
    setImageFile(null);

    setShowModal(true);
  };

  // ======================================================
  // OPEN EDIT MODAL
  // ======================================================

  const openEditModal = (product) => {
    setEditingProduct(product);

    setProductForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      badges: product.badges || "",
      discount: product.discount ?? 0,
    });

    setImageMode("url");
    setImagePreview(product.image || "");
    setImageFile(null);

    setShowModal(true);
  };

  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // IMAGE UPLOAD
  // ======================================================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);

    setProductForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // ======================================================
  // UPLOAD IMAGE TO CLOUDINARY
  // ======================================================

  useEffect(() => {
    const uploadImageCloudinary = async () => {
      if (!imageFile) return;

      try {
        setImageUploading(true);

        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          formData,
          {
            withCredentials: true,
          }
        );

        setProductForm((prev) => ({
          ...prev,
          image: response.data.imageUrl,
        }));

      } catch (error) {
        console.error("Image upload error:", error);
        alert("Image upload failed. Please try again.");
      } finally {
        setImageUploading(false);
      }
    };

    uploadImageCloudinary();
  }, [imageFile]);

  // ======================================================
  // SAVE PRODUCT (ADD + EDIT)
  // ======================================================

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (
      !productForm.name.trim() ||
      !productForm.description.trim() ||
      productForm.price === "" ||
      productForm.stock === "" ||
      !productForm.image
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (imageUploading) {
      alert("Please wait until the image upload finishes.");
      return;
    }

    const price = Number(productForm.price);
    const stock = Number(productForm.stock);
    const discount = Number(productForm.discount);

    if (
      !Number.isFinite(price) ||
      !Number.isInteger(stock) ||
      !Number.isFinite(discount) ||
      price < 0 ||
      stock < 0 ||
      discount < 0 ||
      discount > 100
    ) {
      alert("Please enter valid price, stock and discount values.");
      return;
    }

    // Calculate status using the same stock rule
    const status = getProductStatus(stock);

    const productData = {
      ...productForm,
      price,
      stock,
      discount,
      badges: productForm.badges || null,
      status,
    };

    try {
      if (editingProduct) {
        // UPDATE EXISTING PRODUCT

        const result = await dispatch(
          editProduct({
            productId: editingProduct._id,
            updatedData: productData,
          })
        ).unwrap();

        console.log("Product updated successfully:", result);

      } else {
        // ADD NEW PRODUCT

        const result = await dispatch(
          addProduct(productData)
        ).unwrap();

        console.log("Product added successfully:", result);
      }

      setShowModal(false);
      setEditingProduct(null);

      setProductForm({ ...emptyProduct });

      setImagePreview("");
      setImageFile(null);

    } catch (error) {
      console.error("Product save error:", error);

      alert(
        error?.message ||
        error ||
        "Something went wrong while saving the product."
      );
    }
  };

  // ======================================================
  // DELETE PRODUCT
  // ======================================================

  const handleDelete = async () => {
    if (!deleteProduct) return;

    try {
      const result = await dispatch(
        deleteProducts(deleteProduct._id)
      ).unwrap();

      console.log("Product deleted successfully:", result);

      setDeleteProduct(null);

    } catch (error) {
      console.error("Delete product error:", error);
      alert("Failed to delete product.");
    }
  };

  // ======================================================
  // STOCK CLASS
  // ======================================================

  const getStockClass = (product) => {
    const stock = Number(product.stock);

    if (stock === 0) {
      return "stock-danger";
    }

    if (stock <= 10) {
      return "stock-warning";
    }

    return "stock-good";
  };

  // ======================================================
  // STATUS CLASS
  // ======================================================

  const getStatusClass = (status) => {
    if (status === "Active") return "status-active";
    if (status === "Low Stock") return "status-low";

    return "status-out";
  };

  // ======================================================
  // JSX
  // ======================================================

  return (
    <div className="products-page">

      {/* PAGE HEADER */}

      <motion.div
        className="products-page-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="products-title-row">
            <div className="products-title-icon">
              <Package size={23} />
            </div>

            <div>
              <h1>Products</h1>
              <p>
                Manage your ecommerce products and inventory.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          className="primary-product-btn"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={openAddModal}
        >
          <Plus size={19} />
          Add Product
        </motion.button>
      </motion.div>

      {/* STATISTICS */}

      <div className="product-stats-grid">

        <ProductStat
          icon={<Boxes size={21} />}
          title="Total Products"
          value={stats.total}
          text="Products in catalog"
        />

        <ProductStat
          icon={<CheckCircle2 size={21} />}
          title="Active Products"
          value={stats.active}
          text="Currently available"
        />

        <ProductStat
          icon={<AlertTriangle size={21} />}
          title="Low Stock"
          value={stats.lowStock}
          text="Need attention"
        />

        <ProductStat
          icon={<XCircle size={21} />}
          title="Out of Stock"
          value={stats.outOfStock}
          text="Currently unavailable"
        />

      </div>

      {/* LOADING AND ERROR */}

      {isloading && (
        <p>Loading products...</p>
      )}

      {error && (
        <p className="error-message">
          {typeof error === "string"
            ? error
            : "Failed to load products."}
        </p>
      )}

      {/* TOOLBAR */}

      <motion.div
        className="products-toolbar"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >

        {/* SEARCH */}

        <div className="products-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search products or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* FILTERS */}

        <div className="product-filter-group">

          <div className="filter-control">
            <SlidersHorizontal size={17} />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Beauty">Beauty</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="filter-control">
            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

        </div>
      </motion.div>

      {/* PRODUCT TABLE */}

      <motion.div
        className="products-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >

        <div className="products-card-header">
          <div>
            <h2>Product Inventory</h2>
            <p>{filteredProducts.length} products found</p>
          </div>

          <div className="inventory-label">
            <span></span>
            Live Inventory
          </div>
        </div>

        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>SOLD</th>
                <th>RATING</th>
                <th>DISCOUNT</th>
                <th>BADGES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {currentProducts.map((product, index) => {
                  // Always derive status from current stock
                  const status = getProductStatus(product.stock);

                  return (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.04 }}
                    >

                      {/* PRODUCT */}

                      <td>
                        <div className="product-info">
                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div>
                            <strong>{product.name}</strong>
                            <span>{product._id}</span>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}

                      <td>
                        <span className="category-badge">
                          {product.category}
                        </span>
                      </td>

                      {/* PRICE */}

                      <td>
                        <strong className="product-price">
                          ${Number(product.price).toFixed(2)}
                        </strong>
                      </td>

                      {/* STOCK */}

                      <td>
                        <span
                          className={`stock-number ${getStockClass(product)}`}
                        >
                          {Number(product.stock)}
                        </span>
                      </td>

                      {/* SOLD */}

                      <td>{product.sold ?? 0}</td>

                      {/* RATING */}

                      <td>
                        <span className="product-rating">
                          ★ {product.rating || "—"}
                        </span>
                      </td>

                      {/* DISCOUNT */}

                      <td>
                        <strong className="product-price">
                          {Number(product.discount || 0).toFixed(2)}%
                        </strong>
                      </td>

                      {/* BADGES */}

                      <td>
                        {product.badges ? (
                          <span className="category-badge">
                            {product.badges}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`status-badge ${getStatusClass(status)}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td>
                        <div className="product-actions">

                          <button
                            type="button"
                            title="View"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            onClick={() => openEditModal(product)}
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            className="delete-action"
                            onClick={() => setDeleteProduct(product)}
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </motion.tr>
                  );
                })}

              </AnimatePresence>

            </tbody>

          </table>

          {/* EMPTY STATE */}

          {!isloading && currentProducts.length === 0 && (
            <div className="empty-products">
              <Package size={42} />

              <h3>No products found</h3>

              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>

        {/* PAGINATION */}

        <div className="products-pagination">

          <span>
            Showing {currentProducts.length} of{" "}
            {filteredProducts.length}
          </span>

          <div>

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) => Math.max(1, p - 1))
              }
            >
              <ChevronLeft size={17} />
            </button>

            <span className="page-number">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
            >
              <ChevronRight size={17} />
            </button>

          </div>
        </div>

      </motion.div>

      {/* ==================================================
          ADD / EDIT PRODUCT MODAL
      ================================================== */}

      <AnimatePresence>

        {showModal && (
          <ModalOverlay onClose={() => setShowModal(false)}>

            <motion.div
              className="product-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
            >

              <div className="modal-header">
                <div>
                  <h2>
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h2>

                  <p>
                    {editingProduct
                      ? "Update product information."
                      : "Add a new product to your store."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct}>

                {/* PRODUCT IMAGE */}

                <div className="product-image-section">

                  <label className="image-section-label">
                    Product Image
                  </label>

                  <div className="image-method-tabs">

                    <button
                      type="button"
                      className={imageMode === "upload" ? "active" : ""}
                      onClick={() => setImageMode("upload")}
                    >
                      <Upload size={17} />
                      Upload Image
                    </button>

                    <button
                      type="button"
                      className={imageMode === "url" ? "active" : ""}
                      onClick={() => setImageMode("url")}
                    >
                      <Link size={17} />
                      Image URL
                    </button>

                  </div>

                  {/* UPLOAD OPTION */}

                  {imageMode === "upload" && (
                    <div className="upload-image-area">

                      {!imagePreview ? (

                        <label className="upload-dropzone">

                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                            onChange={handleImageUpload}
                            hidden
                          />

                          <div className="upload-icon">
                            <ImagePlus size={32} />
                          </div>

                          <strong>
                            Click to upload product image
                          </strong>

                          <span>JPG, JPEG or PNG</span>

                          <small>
                            Maximum file size: 5MB
                          </small>

                        </label>

                      ) : (

                        <div className="image-preview-wrapper">

                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="product-image-preview"
                          />

                          <label className="change-image-btn">

                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                              onChange={handleImageUpload}
                              hidden
                            />

                            <Upload size={16} />
                            Change Image

                          </label>

                        </div>
                      )}

                      {imageUploading && (
                        <p>Uploading image...</p>
                      )}

                    </div>
                  )}

                  {/* URL OPTION */}

                  {imageMode === "url" && (
                    <div className="image-url-area">

                      <div className="url-input-wrapper">

                        <Link size={18} />

                        <input
                          name="image"
                          value={productForm.image}
                          onChange={(e) => {
                            handleFormChange(e);
                            setImagePreview(e.target.value);
                          }}
                          placeholder="https://example.com/product.jpg"
                        />

                      </div>

                      {productForm.image && (
                        <img
                          src={productForm.image}
                          alt="Product preview"
                          className="url-image-preview"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                    </div>
                  )}

                </div>

                {/* PRODUCT NAME */}

                <div className="form-group">

                  <label>Product Name</label>

                  <input
                    name="name"
                    value={productForm.name}
                    onChange={handleFormChange}
                    placeholder="Enter product name"
                    required
                  />

                </div>

                {/* DESCRIPTION */}

                <div className="form-group description-form-group">

                  <div className="description-label-row">
                    <label>Product Description</label>

                    <span>
                      {productForm.description?.length || 0}/1000
                    </span>
                  </div>

                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleFormChange}
                    placeholder="Describe your product, features, materials, benefits, specifications, etc."
                    rows={5}
                    maxLength={1000}
                    required
                  />

                  <small className="description-helper">
                    Give customers a clear description of the product.
                  </small>

                </div>

                {/* CATEGORY */}

                <div className="form-row">

                  <div className="form-group">

                    <label>Category</label>

                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleFormChange}
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Sports">Sports</option>
                      <option value="Books">Books</option>
                      <option value="Other">Other</option>
                    </select>

                  </div>

                  {/* BADGES */}

                  <div className="form-group">

                    <label>Badges (Optional)</label>

                    <select
                      name="badges"
                      value={productForm.badges}
                      onChange={handleFormChange}
                    >
                      <option value="">No Badge</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Limited Edition">Limited Edition</option>
                      <option value="Exclusive">Exclusive</option>
                      <option value="New Arrival">New Arrival</option>
                    </select>

                  </div>

                  {/* PRICE */}

                  <div className="form-group">

                    <label>Price</label>

                    <div className="input-with-icon">
                      <DollarSign size={16} />

                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={productForm.price}
                        onChange={handleFormChange}
                        placeholder="0.00"
                        required
                      />
                    </div>

                  </div>

                  {/* DISCOUNT */}

                  <div className="form-group">

                    <label>Discount (%)</label>

                    <div className="input-with-icon">
                      <DollarSign size={16} />

                      <input
                        type="number"
                        name="discount"
                        min="0"
                        max="100"
                        step="0.01"
                        value={productForm.discount}
                        onChange={handleFormChange}
                        placeholder="0"
                      />
                    </div>

                  </div>

                </div>

                {/* STOCK */}

                <div className="form-group">

                  <label>Stock Quantity</label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    step="1"
                    value={productForm.stock}
                    onChange={handleFormChange}
                    placeholder="0"
                    required
                  />

                  <small>
                    {productForm.stock !== ""
                      ? `Status: ${getProductStatus(productForm.stock)}`
                      : "Enter product stock quantity."}
                  </small>

                </div>

                {/* SAVE BUTTON */}

                <motion.button
                  className="save-product-btn"
                  type="submit"
                  disabled={imageUploading}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {imageUploading
                    ? "Uploading Image..."
                    : editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </motion.button>

              </form>

            </motion.div>

          </ModalOverlay>
        )}

      </AnimatePresence>

      {/* ==================================================
          VIEW PRODUCT MODAL
      ================================================== */}

      <AnimatePresence>

        {selectedProduct && (
          <ModalOverlay onClose={() => setSelectedProduct(null)}>

            <motion.div
              className="product-view-modal"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
            >

              <button
                className="modal-close"
                type="button"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={20} />
              </button>

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <div>

                <span className="modal-product-id">
                  {selectedProduct._id}
                </span>

                <h2>{selectedProduct.name}</h2>

                <p>{selectedProduct.category}</p>

                <div className="view-product-price">
                  ${Number(selectedProduct.price).toFixed(2)}
                </div>

                <div className="view-product-description">

                  <span>Description</span>

                  <p>
                    {selectedProduct.description ||
                      "No description available."}
                  </p>

                </div>

                <div className="product-detail-grid">

                  <div>
                    <span>Stock</span>
                    <strong>{selectedProduct.stock}</strong>
                  </div>

                  <div>
                    <span>Sold</span>
                    <strong>{selectedProduct.sold ?? 0}</strong>
                  </div>

                  <div>
                    <span>Rating</span>
                    <strong>★ {selectedProduct.rating || "—"}</strong>
                  </div>

                </div>

                <div className="product-detail-grid">

                  <div>
                    <span>Status</span>
                    <strong>
                      {getProductStatus(selectedProduct.stock)}
                    </strong>
                  </div>

                  <div>
                    <span>Badge</span>
                    <strong>{selectedProduct.badges || "None"}</strong>
                  </div>

                  <div>
                    <span>Discount</span>
                    <strong>
                      {Number(selectedProduct.discount || 0)}%
                    </strong>
                  </div>

                </div>

              </div>

            </motion.div>

          </ModalOverlay>
        )}

      </AnimatePresence>

      {/* ==================================================
          DELETE MODAL
      ================================================== */}

      <AnimatePresence>

        {deleteProduct && (
          <ModalOverlay onClose={() => setDeleteProduct(null)}>

            <motion.div
              className="delete-modal"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
            >

              <div className="delete-icon">
                <Trash2 size={23} />
              </div>

              <h2>Delete Product?</h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteProduct.name}</strong>?
              </p>

              <div className="delete-buttons">

                <button
                  type="button"
                  onClick={() => setDeleteProduct(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>

              </div>

            </motion.div>

          </ModalOverlay>
        )}

      </AnimatePresence>

    </div>
  );
}

// ======================================================
// PRODUCT STAT COMPONENT
// ======================================================

function ProductStat({ icon, title, value, text }) {
  return (
    <motion.div
      className="product-stat-card"
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      <div className="product-stat-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{text}</small>
      </div>

    </motion.div>
  );
}

// ======================================================
// MODAL OVERLAY
// ======================================================

function ModalOverlay({ children, onClose }) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default AdminProducts;
