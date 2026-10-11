

import React, { useMemo, useState } from "react";

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

import "./AdminProducts.css";
import { useEffect } from "react";
import axios from "axios";



/* =========================================================
   INITIAL PRODUCTS
========================================================= */

const initialProducts = [
  {
    id: "PRD-001",
    name: "Premium Wireless Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, powerful bass, and up to 30 hours of battery life.",
    category: "Electronics",
    price: 129.99,
    stock: 42,
    sold: 128,
    rating: 4.8,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
  },

  {
    id: "PRD-002",
    name: "Minimal Leather Backpack",
    description:
      "A stylish and durable leather backpack designed for everyday use, travel, and professional environments.",
    category: "Fashion",
    price: 89.99,
    stock: 18,
    sold: 86,
    rating: 4.6,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
  },

  {
    id: "PRD-003",
    name: "Smart Fitness Watch",
    description:
      "Smart fitness watch with health tracking, heart-rate monitoring, activity tracking, and modern notifications.",
    category: "Electronics",
    price: 159.99,
    stock: 7,
    sold: 64,
    rating: 4.7,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
  },

  {
    id: "PRD-004",
    name: "Classic Running Shoes",
    description:
      "Comfortable running shoes with lightweight cushioning and breathable materials for everyday workouts.",
    category: "Fashion",
    price: 74.99,
    stock: 0,
    sold: 143,
    rating: 4.5,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
  },

  {
    id: "PRD-005",
    name: "Modern Desk Lamp",
    description:
      "Modern minimalist desk lamp with adjustable lighting and a compact design suitable for workspaces.",
    category: "Home",
    price: 49.99,
    stock: 31,
    sold: 57,
    rating: 4.4,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300",
  },

  {
    id: "PRD-006",
    name: "Mechanical Keyboard",
    description:
      "Premium mechanical keyboard featuring responsive switches, RGB lighting, and a durable compact design.",
    category: "Electronics",
    price: 109.99,
    stock: 4,
    sold: 91,
    rating: 4.9,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300",
  },

  {
    id: "PRD-007",
    name: "Ceramic Coffee Set",
    description:
      "Elegant ceramic coffee set designed for everyday coffee moments, entertaining guests, and gifting.",
    category: "Home",
    price: 39.99,
    stock: 25,
    sold: 42,
    rating: 4.3,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300",
  },

  {
    id: "PRD-008",
    name: "Premium Sunglasses",
    description:
      "Premium sunglasses with a stylish frame and comfortable fit, perfect for everyday outdoor use.",
    category: "Fashion",
    price: 59.99,
    stock: 12,
    sold: 75,
    rating: 4.6,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300",
  },
];

/* =========================================================
   EMPTY PRODUCT
========================================================= */

const emptyProduct = {
  name: "",
  description: "",
  category: "Electronics",
  price: "",
  stock: "",
  image: "",
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function AdminProducts() {
  const [Imagefile, setImageFile] = useState("");
  const [products, setProducts] = useState(initialProducts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const [productForm, setProductForm] = useState(emptyProduct);

  /* Image states */

  const [imageMode, setImageMode] = useState("upload");
  const [imagePreview, setImagePreview] = useState("");

  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      let matchesStock = true;

      if (stockFilter === "In Stock") {
        matchesStock = product.stock > 0;
      }

      if (stockFilter === "Low Stock") {
        matchesStock = product.stock > 0 && product.stock <= 10;
      }

      if (stockFilter === "Out of Stock") {
        matchesStock = product.stock === 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = {
    total: products.length,

    active: products.filter((p) => p.status === "Active").length,

    lowStock: products.filter(
      (p) => p.stock > 0 && p.stock <= 10
    ).length,

    outOfStock: products.filter(
      (p) => p.stock === 0
    ).length,
  };

  /* =========================================================
     OPEN ADD MODAL
  ========================================================= */

  const openAddModal = () => {
    setEditingProduct(null);

    setProductForm({
      ...emptyProduct,
    });

    setImageMode("upload");
    setImagePreview("");

    setShowModal(true);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (product) => {
    setEditingProduct(product);

    setProductForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });

    setImageMode("url");
    setImagePreview(product.image);

    setShowModal(true);
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    /* Check image type */

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    /* Check file size */

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    /* Create temporary preview */
    console.log("File uploaded:", file);
    setImageFile(file);



    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    setProductForm((prev) => ({
      ...prev,
      image: previewUrl,
    }));
  };





  const uploadImageCloudinary = async (file) => {
  try {
    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    console.log("Uploading image to Cloudinary:", formData);


    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("Upload response:", response.data);

  } catch (error) {
    console.error("Image upload error:", error);
  }


 

};

 useEffect(() => {
  if (Imagefile) {
    uploadImageCloudinary(Imagefile);
  }
}, [Imagefile]);







  /* =========================================================
     SAVE PRODUCT
  ========================================================= */

  const handleSaveProduct = (e) => {
    e.preventDefault();
    console.log("Saving product:", productForm);

    if (
      !productForm.name.trim() ||
      !productForm.description.trim() ||
      !productForm.price ||
      productForm.stock === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const stock = Number(productForm.stock);

    let status = "Active";

    if (stock === 0) {
      status = "Out of Stock";
    } else if (stock <= 10) {
      status = "Low Stock";
    }

    /* =====================================================
       EDIT EXISTING PRODUCT
    ===================================================== */

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,

                name: productForm.name,

                description: productForm.description,

                category: productForm.category,

                price: Number(productForm.price),

                stock,

                image:
                  productForm.image ||
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",

                status,
              }
            : product
        )
      );
    }

    /* =====================================================
       ADD NEW PRODUCT
    ===================================================== */

    else {
      const newProduct = {
        id: `PRD-${String(products.length + 1).padStart(
          3,
          "0"
        )}`,

        name: productForm.name,

        description: productForm.description,

        category: productForm.category,

        price: Number(productForm.price),

        stock,

        sold: 0,

        rating: 0,

        status,

        image:
          productForm.image ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      };

      setProducts((prev) => [
        newProduct,
        ...prev,
      ]);
    }

    setShowModal(false);

    setProductForm({
      ...emptyProduct,
    });

    setImagePreview("");
  };

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const handleDelete = () => {
    if (!deleteProduct) return;

    setProducts((prev) =>
      prev.filter(
        (product) => product.id !== deleteProduct.id
      )
    );

    setDeleteProduct(null);
  };

  /* =========================================================
     STOCK CLASS
  ========================================================= */

  const getStockClass = (product) => {
    if (product.stock === 0) {
      return "stock-danger";
    }

    if (product.stock <= 10) {
      return "stock-warning";
    }

    return "stock-good";
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="products-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <motion.div
        className="products-page-header"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
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
          whileHover={{
            y: -2,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={openAddModal}
        >
          <Plus size={19} />

          Add Product
        </motion.button>
      </motion.div>

      {/* =====================================================
          STATS
      ===================================================== */}

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

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <motion.div
        className="products-toolbar"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
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
              <option value="All">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Home">
                Home
              </option>
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
              <option value="All">
                All Stock
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>

          </div>

        </div>

      </motion.div>

      {/* =====================================================
          PRODUCT TABLE
      ===================================================== */}

      <motion.div
        className="products-card"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
        }}
      >

        <div className="products-card-header">

          <div>
            <h2>Product Inventory</h2>

            <p>
              {filteredProducts.length} products found
            </p>
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
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>

            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {currentProducts.map(
                  (product, index) => (

                    <motion.tr
                      key={product.id}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 10,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                    >

                      {/* PRODUCT */}

                      <td>

                        <div className="product-info">

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              {product.id}
                            </span>

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
                          ${product.price.toFixed(2)}
                        </strong>

                      </td>

                      {/* STOCK */}

                      <td>

                        <span
                          className={`stock-number ${getStockClass(
                            product
                          )}`}
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* SOLD */}

                      <td>
                        {product.sold}
                      </td>

                      {/* RATING */}

                      <td>

                        <span className="product-rating">
                          ★ {product.rating || "—"}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${
                            product.status === "Active"
                              ? "status-active"
                              : product.status === "Low Stock"
                              ? "status-low"
                              : "status-out"
                          }`}
                        >
                          {product.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="product-actions">

                          <button
                            title="View"
                            onClick={() =>
                              setSelectedProduct(product)
                            }
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              openEditModal(product)
                            }
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            title="Delete"
                            className="delete-action"
                            onClick={() =>
                              setDeleteProduct(product)
                            }
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </motion.tr>

                  )
                )}

              </AnimatePresence>

            </tbody>

          </table>

          {/* EMPTY STATE */}

          {currentProducts.length === 0 && (

            <div className="empty-products">

              <Package size={42} />

              <h3>
                No products found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>

        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="products-pagination">

          <span>
            Showing {currentProducts.length} of{" "}
            {filteredProducts.length}
          </span>

          <div>

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
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
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </motion.div>

      {/* =====================================================
          ADD / EDIT PRODUCT MODAL
      ===================================================== */}

      <AnimatePresence>

        {showModal && (

          <ModalOverlay
            onClose={() =>
              setShowModal(false)
            }
          >

            <motion.div
              className="product-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
            >

              {/* MODAL HEADER */}

              <div className="modal-header">

                <div>

                  <h2>
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>

                  <p>
                    {editingProduct
                      ? "Update product information."
                      : "Add a new product to your store."}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              {/* FORM */}

              <form onSubmit={handleSaveProduct}>

                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <div className="product-image-section">

                  <label className="image-section-label">
                    Product Image
                  </label>

                  {/* IMAGE METHOD TABS */}

                  <div className="image-method-tabs">

                    <button
                      type="button"
                      className={
                        imageMode === "upload"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setImageMode("upload");
                      }}
                    >
                      <Upload size={17} />

                      Upload Image
                    </button>

                    <button
                      type="button"
                      className={
                        imageMode === "url"
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setImageMode("url");
                      }}
                    >
                      <Link size={17} />

                      Image URL
                    </button>

                  </div>

                  {/* =================================================
                      UPLOAD IMAGE OPTION
                  ================================================= */}

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

                          <span>
                            JPG, JPEG or PNG
                          </span>

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

                    </div>

                  )}

                  {/* =================================================
                      IMAGE URL OPTION
                  ================================================= */}

                  {imageMode === "url" && (

                    <div className="image-url-area">

                      <div className="url-input-wrapper">

                        <Link size={18} />

                        <input
                          name="image"
                          value={productForm.image}
                          onChange={(e) => {

                            handleFormChange(e);

                            setImagePreview(
                              e.target.value
                            );

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
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      )}

                    </div>

                  )}

                </div>

                {/* =================================================
                    PRODUCT NAME
                ================================================= */}

                <div className="form-group">

                  <label>
                    Product Name
                  </label>

                  <input
                    name="name"
                    value={productForm.name}
                    onChange={handleFormChange}
                    placeholder="Enter product name"
                    required
                  />

                </div>

                {/* =================================================
                    PRODUCT DESCRIPTION
                ================================================= */}

                <div className="form-group description-form-group">

                  <div className="description-label-row">

                    <label>
                      Product Description
                    </label>

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

                {/* =================================================
                    CATEGORY + PRICE
                ================================================= */}

                <div className="form-row">

                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Category
                    </label>

                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleFormChange}
                    >

                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Fashion">
                        Fashion
                      </option>

                      <option value="Home">
                        Home
                      </option>

                    </select>

                  </div>

                  {/* PRICE */}

                  <div className="form-group">

                    <label>
                      Price
                    </label>

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

                </div>

                {/* =================================================
                    STOCK
                ================================================= */}

                <div className="form-group">

                  <label>
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={productForm.stock}
                    onChange={handleFormChange}
                    placeholder="0"
                    required
                  />

                </div>

                {/* =================================================
                    SAVE BUTTON
                ================================================= */}

                <motion.button
                  className="save-product-btn"
                  type="submit"
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </motion.button>

              </form>

            </motion.div>

          </ModalOverlay>

        )}

      </AnimatePresence>

      {/* =====================================================
          VIEW PRODUCT MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedProduct && (

          <ModalOverlay
            onClose={() =>
              setSelectedProduct(null)
            }
          >

            <motion.div
              className="product-view-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
            >

              {/* CLOSE BUTTON */}

              <button
                className="modal-close"
                type="button"
                onClick={() =>
                  setSelectedProduct(null)
                }
              >
                <X size={20} />
              </button>

              {/* PRODUCT IMAGE */}

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <div>

                <span className="modal-product-id">
                  {selectedProduct.id}
                </span>

                <h2>
                  {selectedProduct.name}
                </h2>

                <p>
                  {selectedProduct.category}
                </p>

                <div className="view-product-price">
                  ${selectedProduct.price.toFixed(2)}
                </div>

                {/* PRODUCT DESCRIPTION */}

                <div className="view-product-description">

                  <span>
                    Description
                  </span>

                  <p>
                    {selectedProduct.description ||
                      "No description available."}
                  </p>

                </div>

                {/* DETAILS */}

                <div className="product-detail-grid">

                  <div>

                    <span>
                      Stock
                    </span>

                    <strong>
                      {selectedProduct.stock}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Sold
                    </span>

                    <strong>
                      {selectedProduct.sold}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Rating
                    </span>

                    <strong>
                      ★ {selectedProduct.rating || "—"}
                    </strong>

                  </div>

                </div>

              </div>

            </motion.div>

          </ModalOverlay>

        )}

      </AnimatePresence>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AnimatePresence>

        {deleteProduct && (

          <ModalOverlay
            onClose={() =>
              setDeleteProduct(null)
            }
          >

            <motion.div
              className="delete-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
            >

              <div className="delete-icon">

                <Trash2 size={23} />

              </div>

              <h2>
                Delete Product?
              </h2>

              <p>

                Are you sure you want to delete{" "}

                <strong>
                  {deleteProduct.name}
                </strong>
                ?

              </p>

              <div className="delete-buttons">

                <button
                  type="button"
                  onClick={() =>
                    setDeleteProduct(null)
                  }
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

/* =========================================================
   PRODUCT STAT COMPONENT
========================================================= */

function ProductStat({
  icon,
  title,
  value,
  text,
}) {
  return (
    <motion.div
      className="product-stat-card"
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >

      <div className="product-stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {text}
        </small>

      </div>

    </motion.div>
  );
}

/* =========================================================
   MODAL OVERLAY
========================================================= */

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onMouseDown={onClose}
    >

      <div
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        {children}
      </div>

    </motion.div>
  );
}

export default AdminProducts;
