// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   ShoppingCart,
//   Eye,
//   Star,
//   X,
//   Check,
//   RotateCcw,
//   Package,
//   Zap,
//   ArrowUpDown,
//   Plus,
//   Minus,
// } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import "./Listing.css";

// /* =========================================================
//    PRODUCT DATA
// ========================================================= */

// const products = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     category: "Electronics",
//     price: 129,
//     oldPrice: 169,
//     rating: 4.8,
//     reviews: 248,
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
//     badge: "Best Seller",
//     description:
//       "Premium wireless headphones with active noise cancellation, deep bass and all-day comfort.",
//     colors: ["Black", "White"],
//     stock: 18,
//     isNew: false,
//   },
//   {
//     id: 2,
//     name: "Minimal Smart Watch",
//     category: "Electronics",
//     price: 189,
//     oldPrice: 229,
//     rating: 4.7,
//     reviews: 184,
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
//     badge: "New",
//     description:
//       "A stylish smart watch with health tracking, notifications and a premium minimal design.",
//     colors: ["Black", "Silver"],
//     stock: 12,
//     isNew: true,
//   },
//   {
//     id: 3,
//     name: "Urban Classic Sneakers",
//     category: "Fashion",
//     price: 89,
//     oldPrice: 119,
//     rating: 4.6,
//     reviews: 326,
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
//     badge: "Trending",
//     description:
//       "Comfortable everyday sneakers designed for a clean urban look.",
//     colors: ["Red", "White", "Black"],
//     stock: 24,
//     isNew: false,
//   },
//   {
//     id: 4,
//     name: "Modern Leather Backpack",
//     category: "Fashion",
//     price: 74,
//     oldPrice: 99,
//     rating: 4.5,
//     reviews: 143,
//     image:
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
//     badge: "Popular",
//     description:
//       "Premium backpack with a spacious interior and modern professional styling.",
//     colors: ["Brown", "Black"],
//     stock: 31,
//     isNew: false,
//   },
//   {
//     id: 5,
//     name: "Premium Mechanical Keyboard",
//     category: "Electronics",
//     price: 119,
//     oldPrice: 149,
//     rating: 4.9,
//     reviews: 512,
//     image:
//       "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
//     badge: "Top Rated",
//     description:
//       "Mechanical keyboard with satisfying switches, RGB lighting and premium construction.",
//     colors: ["Black", "White"],
//     stock: 9,
//     isNew: false,
//   },
//   {
//     id: 6,
//     name: "Minimal Ceramic Lamp",
//     category: "Home",
//     price: 59,
//     oldPrice: 79,
//     rating: 4.4,
//     reviews: 87,
//     image:
//       "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900",
//     badge: "New",
//     description:
//       "Elegant ceramic lamp that adds a warm premium atmosphere to your space.",
//     colors: ["White", "Cream"],
//     stock: 16,
//     isNew: true,
//   },
//   {
//     id: 7,
//     name: "Premium Coffee Maker",
//     category: "Home",
//     price: 149,
//     oldPrice: 199,
//     rating: 4.8,
//     reviews: 219,
//     image:
//       "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900",
//     badge: "Best Seller",
//     description:
//       "Modern coffee maker designed for rich and consistent coffee every morning.",
//     colors: ["Black", "Silver"],
//     stock: 14,
//     isNew: false,
//   },
//   {
//     id: 8,
//     name: "Classic Denim Jacket",
//     category: "Fashion",
//     price: 79,
//     oldPrice: 109,
//     rating: 4.5,
//     reviews: 164,
//     image:
//       "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900",
//     badge: "Popular",
//     description:
//       "Classic denim jacket with a modern fit and versatile everyday styling.",
//     colors: ["Blue", "Black"],
//     stock: 28,
//     isNew: false,
//   },
//   {
//     id: 9,
//     name: "Portable Bluetooth Speaker",
//     category: "Electronics",
//     price: 69,
//     oldPrice: 89,
//     rating: 4.6,
//     reviews: 276,
//     image:
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900",
//     badge: "Trending",
//     description:
//       "Portable speaker with powerful sound, deep bass and long battery life.",
//     colors: ["Black", "Blue"],
//     stock: 21,
//     isNew: false,
//   },
//   {
//     id: 10,
//     name: "Luxury Sunglasses",
//     category: "Fashion",
//     price: 64,
//     oldPrice: 89,
//     rating: 4.3,
//     reviews: 98,
//     image:
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900",
//     badge: "Sale",
//     description:
//       "Premium sunglasses with a timeless frame and lightweight construction.",
//     colors: ["Black", "Brown"],
//     stock: 35,
//     isNew: false,
//   },
//   {
//     id: 11,
//     name: "Smart Desk Setup Light",
//     category: "Home",
//     price: 49,
//     oldPrice: 69,
//     rating: 4.5,
//     reviews: 74,
//     image:
//       "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=900",
//     badge: "New",
//     description:
//       "Modern desk lamp with adjustable lighting for work and study setups.",
//     colors: ["White", "Black"],
//     stock: 19,
//     isNew: true,
//   },
//   {
//     id: 12,
//     name: "Wireless Gaming Mouse",
//     category: "Electronics",
//     price: 79,
//     oldPrice: 109,
//     rating: 4.8,
//     reviews: 398,
//     image:
//       "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900",
//     badge: "Best Seller",
//     description:
//       "High precision wireless gaming mouse with ergonomic design and low latency.",
//     colors: ["Black", "White"],
//     stock: 11,
//     isNew: false,
//   },
// ];

// /* =========================================================
//    COMPONENT
// ========================================================= */

// function Listing() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [maxPrice, setMaxPrice] = useState(250);
//   const [minRating, setMinRating] = useState(0);

//   const [sortBy, setSortBy] = useState("featured");

//   const [page, setPage] = useState(1);
//   const [wishlist, setWishlist] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("nexoraWishlist")) || [];
//     } catch {
//       return [];
//     }
//   });

//   const [cart, setCart] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("nexoraCart")) || [];
//     } catch {
//       return [];
//     }
//   });

//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const [cartMessage, setCartMessage] = useState("");

//   const productsPerPage = 8;

//   /* =========================================================
//      SAVE LOCAL STORAGE
//   ========================================================= */

//   useEffect(() => {
//     localStorage.setItem("nexoraWishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   useEffect(() => {
//     localStorage.setItem("nexoraCart", JSON.stringify(cart));
//   }, [cart]);

//   /* =========================================================
//      FILTER + SORT
//   ========================================================= */

//   const filteredProducts = useMemo(() => {
//     let result = [...products];

//     if (search.trim()) {
//       const keyword = search.toLowerCase();

//       result = result.filter(
//         (product) =>
//           product.name.toLowerCase().includes(keyword) ||
//           product.category.toLowerCase().includes(keyword)
//       );
//     }

//     if (category !== "All") {
//       result = result.filter((product) => product.category === category);
//     }

//     result = result.filter((product) => product.price <= maxPrice);

//     if (minRating > 0) {
//       result = result.filter((product) => product.rating >= minRating);
//     }

//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;

//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;

//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;

//       case "name":
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;

//       case "newest":
//         result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
//         break;

//       default:
//         break;
//     }

//     return result;
//   }, [search, category, maxPrice, minRating, sortBy]);

//   /* =========================================================
//      PAGINATION
//   ========================================================= */

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const currentProducts = filteredProducts.slice(
//     (page - 1) * productsPerPage,
//     page * productsPerPage
//   );

//   useEffect(() => {
//     setPage(1);
//   }, [search, category, maxPrice, minRating, sortBy]);

//   /* =========================================================
//      WISHLIST
//   ========================================================= */

//   const toggleWishlist = (productId) => {
//     setWishlist((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   /* =========================================================
//      CART
//   ========================================================= */

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);

//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           ...product,
//           quantity: 1,
//         },
//       ];
//     });

//     setCartMessage(`${product.name} added to cart`);

//     setTimeout(() => {
//       setCartMessage("");
//     }, 2200);
//   };

//   /* =========================================================
//      RESET FILTERS
//   ========================================================= */

//   const clearFilters = () => {
//     setSearch("");
//     setCategory("All");
//     setMaxPrice(250);
//     setMinRating(0);
//     setSortBy("featured");
//     setPage(1);
//   };

//   const hasActiveFilters =
//     search ||
//     category !== "All" ||
//     maxPrice !== 250 ||
//     minRating !== 0;

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div className="listing-page">
//       {/* =====================================================
//           TOP HERO
//       ===================================================== */}

//       <section className="listing-hero">
//         <div className="listing-hero-glow listing-glow-one"></div>
//         <div className="listing-hero-glow listing-glow-two"></div>

//         <div className="listing-hero-content">
//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="listing-eyebrow">
//               <Zap size={15} />
//               Explore Nexora
//             </span>

//             <h1>
//               Find something
//               <span> you'll love.</span>
//             </h1>

//             <p>
//               Discover premium products carefully selected for your lifestyle.
//               Shop smarter, faster and better with Nexora.
//             </p>
//           </motion.div>

//           <motion.div
//             className="listing-hero-stats"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <div>
//               <strong>500+</strong>
//               <span>Products</span>
//             </div>

//             <div>
//               <strong>4.8</strong>
//               <span>Average Rating</span>
//             </div>

//             <div>
//               <strong>24/7</strong>
//               <span>Support</span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <section className="listing-container">
//         {/* SEARCH BAR */}

//         <motion.div
//           className="listing-search-wrapper"
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <Search size={20} />

//           <input
//             type="text"
//             placeholder="Search products, categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           {search && (
//             <button
//               className="listing-search-clear"
//               onClick={() => setSearch("")}
//             >
//               <X size={17} />
//             </button>
//           )}

//           <button className="listing-search-button">
//             Search
//           </button>
//         </motion.div>

//         {/* MOBILE FILTER BUTTON */}

//         <button
//           className="mobile-filter-button"
//           onClick={() => setMobileFilterOpen(true)}
//         >
//           <SlidersHorizontal size={18} />
//           Filters
//           {hasActiveFilters && <span></span>}
//         </button>

//         <div className="listing-layout">
//           {/* =================================================
//               SIDEBAR
//           ================================================= */}

//           <aside
//             className={`listing-sidebar ${
//               mobileFilterOpen ? "listing-sidebar-open" : ""
//             }`}
//           >
//             <div className="mobile-filter-header">
//               <div>
//                 <h3>Filters</h3>
//                 <span>Refine your search</span>
//               </div>

//               <button onClick={() => setMobileFilterOpen(false)}>
//                 <X />
//               </button>
//             </div>

//             {/* CATEGORY */}

//             <div className="filter-section">
//               <div className="filter-heading">
//                 <h3>Categories</h3>
//               </div>

//               <div className="category-list">
//                 {["All", "Electronics", "Fashion", "Home"].map((item) => (
//                   <button
//                     key={item}
//                     className={category === item ? "active" : ""}
//                     onClick={() => {
//                       setCategory(item);
//                       setMobileFilterOpen(false);
//                     }}
//                   >
//                     <span>{item}</span>

//                     <small>
//                       {item === "All"
//                         ? products.length
//                         : products.filter((p) => p.category === item).length}
//                     </small>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* PRICE */}

//             <div className="filter-section">
//               <div className="filter-heading">
//                 <h3>Price Range</h3>
//                 <span>${maxPrice}</span>
//               </div>

//               <input
//                 className="price-slider"
//                 type="range"
//                 min="0"
//                 max="250"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(Number(e.target.value))}
//               />

//               <div className="price-labels">
//                 <span>$0</span>
//                 <span>$250+</span>
//               </div>
//             </div>

//             {/* RATING */}

//             <div className="filter-section">
//               <div className="filter-heading">
//                 <h3>Rating</h3>
//               </div>

//               <div className="rating-filter">
//                 {[4.5, 4, 3.5, 3].map((rating) => (
//                   <button
//                     key={rating}
//                     className={minRating === rating ? "active" : ""}
//                     onClick={() =>
//                       setMinRating(minRating === rating ? 0 : rating)
//                     }
//                   >
//                     <span className="rating-stars">
//                       {Array.from({ length: 5 }).map((_, index) => (
//                         <Star
//                           key={index}
//                           size={14}
//                           fill={index < Math.floor(rating) ? "currentColor" : "none"}
//                         />
//                       ))}
//                     </span>

//                     <span>{rating}+</span>

//                     {minRating === rating && <Check size={15} />}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* BENEFITS */}

//             <div className="filter-benefits">
//               <div>
//                 <Package size={18} />
//                 <div>
//                   <strong>Free Shipping</strong>
//                   <span>On orders over $100</span>
//                 </div>
//               </div>

//               <div>
//                 <RotateCcw size={18} />
//                 <div>
//                   <strong>Easy Returns</strong>
//                   <span>30-day returns</span>
//                 </div>
//               </div>
//             </div>

//             {hasActiveFilters && (
//               <button className="clear-filter-button" onClick={clearFilters}>
//                 <RotateCcw size={16} />
//                 Clear all filters
//               </button>
//             )}
//           </aside>

//           {/* =================================================
//               PRODUCTS AREA
//           ================================================= */}

//           <main className="listing-products-area">
//             {/* TOOLBAR */}

//             <div className="listing-toolbar">
//               <div>
//                 <h2>All Products</h2>

//                 <p>
//                   Showing{" "}
//                   <strong>{filteredProducts.length}</strong> products
//                 </p>
//               </div>

//               <div className="listing-toolbar-actions">
//                 <div className="sort-wrapper">
//                   <ArrowUpDown size={16} />

//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                   >
//                     <option value="featured">Featured</option>
//                     <option value="newest">Newest</option>
//                     <option value="price-low">Price: Low to High</option>
//                     <option value="price-high">Price: High to Low</option>
//                     <option value="rating">Highest Rated</option>
//                     <option value="name">Name: A-Z</option>
//                   </select>

//                   <ChevronDown size={15} />
//                 </div>
//               </div>
//             </div>

//             {/* ACTIVE FILTERS */}

//             {hasActiveFilters && (
//               <div className="active-filters">
//                 <span>Active filters:</span>

//                 {search && (
//                   <button onClick={() => setSearch("")}>
//                     Search: {search}
//                     <X size={13} />
//                   </button>
//                 )}

//                 {category !== "All" && (
//                   <button onClick={() => setCategory("All")}>
//                     {category}
//                     <X size={13} />
//                   </button>
//                 )}

//                 {minRating > 0 && (
//                   <button onClick={() => setMinRating(0)}>
//                     {minRating}+ rating
//                     <X size={13} />
//                   </button>
//                 )}

//                 {maxPrice !== 250 && (
//                   <button onClick={() => setMaxPrice(250)}>
//                     Under ${maxPrice}
//                     <X size={13} />
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* PRODUCT GRID */}

//             {currentProducts.length > 0 ? (
//               <motion.div
//                 className="listing-product-grid"
//                 layout
//               >
//                 <AnimatePresence mode="popLayout">
//                   {currentProducts.map((product, index) => {
//                     const isWishlisted = wishlist.includes(product.id);

//                     return (
//                       <motion.article
//                         className="listing-product-card"
//                         key={product.id}
//                         layout
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.96 }}
//                         transition={{
//                           duration: 0.35,
//                           delay: index * 0.04,
//                         }}
//                       >
//                         {/* IMAGE */}

//                         <div className="listing-product-image">
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                           />

//                           <div className="product-image-gradient"></div>

//                           <span className="product-badge">
//                             {product.badge}
//                           </span>

//                           <button
//                             className={`wishlist-button ${
//                               isWishlisted ? "wishlisted" : ""
//                             }`}
//                             onClick={() => toggleWishlist(product.id)}
//                           >
//                             <Heart
//                               size={18}
//                               fill={
//                                 isWishlisted ? "currentColor" : "none"
//                               }
//                             />
//                           </button>

//                           <button
//                             className="quick-view-button"
//                             onClick={() => setQuickViewProduct(product)}
//                           >
//                             <Eye size={17} />
//                             Quick View
//                           </button>
//                         </div>

//                         {/* PRODUCT INFO */}

//                         <div className="listing-product-info">
//                           <span className="listing-product-category">
//                             {product.category}
//                           </span>

//                           <h3>{product.name}</h3>

//                           <div className="product-rating">
//                             <span className="rating-stars">
//                               <Star size={14} fill="currentColor" />
//                               <Star size={14} fill="currentColor" />
//                               <Star size={14} fill="currentColor" />
//                               <Star size={14} fill="currentColor" />
//                               <Star size={14} fill="currentColor" />
//                             </span>

//                             <strong>{product.rating}</strong>

//                             <span>({product.reviews})</span>
//                           </div>

//                           <div className="product-card-bottom">
//                             <div className="product-price">
//                               <strong>${product.price}</strong>

//                               <del>${product.oldPrice}</del>
//                             </div>

//                             <button
//                               className="add-cart-button"
//                               onClick={() => addToCart(product)}
//                             >
//                               <ShoppingCart size={17} />
//                               <span>Add</span>
//                             </button>
//                           </div>
//                         </div>
//                       </motion.article>
//                     );
//                   })}
//                 </AnimatePresence>
//               </motion.div>
//             ) : (
//               /* EMPTY STATE */

//               <motion.div
//                 className="listing-empty-state"
//                 initial={{ opacity: 0, scale: 0.96 }}
//                 animate={{ opacity: 1, scale: 1 }}
//               >
//                 <div className="empty-icon">
//                   <Search size={32} />
//                 </div>

//                 <h3>No products found</h3>

//                 <p>
//                   We couldn't find any products matching your filters.
//                 </p>

//                 <button onClick={clearFilters}>
//                   <RotateCcw size={16} />
//                   Clear Filters
//                 </button>
//               </motion.div>
//             )}

//             {/* PAGINATION */}

//             {totalPages > 1 && (
//               <div className="listing-pagination">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((prev) => prev - 1)}
//                 >
//                   <ChevronLeft size={18} />
//                 </button>

//                 {Array.from({ length: totalPages }).map((_, index) => {
//                   const pageNumber = index + 1;

//                   return (
//                     <button
//                       key={pageNumber}
//                       className={
//                         page === pageNumber ? "active" : ""
//                       }
//                       onClick={() => setPage(pageNumber)}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 })}

//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((prev) => prev + 1)}
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </section>

//       {/* =====================================================
//           MOBILE FILTER OVERLAY
//       ===================================================== */}

//       <AnimatePresence>
//         {mobileFilterOpen && (
//           <motion.div
//             className="mobile-filter-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setMobileFilterOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* =====================================================
//           CART SUCCESS MESSAGE
//       ===================================================== */}

//       <AnimatePresence>
//         {cartMessage && (
//           <motion.div
//             className="cart-toast"
//             initial={{ opacity: 0, y: 20, x: 20 }}
//             animate={{ opacity: 1, y: 0, x: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//           >
//             <div className="toast-icon">
//               <Check size={18} />
//             </div>

//             <div>
//               <strong>Added to cart</strong>
//               <span>{cartMessage}</span>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* =====================================================
//           QUICK VIEW MODAL
//       ===================================================== */}

//       <AnimatePresence>
//         {quickViewProduct && (
//           <motion.div
//             className="quick-view-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setQuickViewProduct(null)}
//           >
//             <motion.div
//               className="quick-view-modal"
//               initial={{ opacity: 0, y: 30, scale: 0.96 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.97 }}
//               transition={{ duration: 0.25 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="quick-view-close"
//                 onClick={() => setQuickViewProduct(null)}
//               >
//                 <X size={20} />
//               </button>

//               <div className="quick-view-image">
//                 <img
//                   src={quickViewProduct.image}
//                   alt={quickViewProduct.name}
//                 />
//               </div>

//               <div className="quick-view-content">
//                 <span>{quickViewProduct.category}</span>

//                 <h2>{quickViewProduct.name}</h2>

//                 <div className="quick-view-rating">
//                   <div>
//                     <Star size={17} fill="currentColor" />
//                     <strong>{quickViewProduct.rating}</strong>
//                   </div>

//                   <span>
//                     {quickViewProduct.reviews} customer reviews
//                   </span>
//                 </div>

//                 <div className="quick-view-price">
//                   <strong>${quickViewProduct.price}</strong>
//                   <del>${quickViewProduct.oldPrice}</del>

//                   <span>
//                     Save $
//                     {quickViewProduct.oldPrice -
//                       quickViewProduct.price}
//                   </span>
//                 </div>

//                 <p>{quickViewProduct.description}</p>

//                 <div className="quick-view-colors">
//                   <strong>Available colors</strong>

//                   <div>
//                     {quickViewProduct.colors.map((color) => (
//                       <span key={color}>{color}</span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="quick-view-stock">
//                   <Package size={17} />

//                   <span>
//                     Only{" "}
//                     <strong>{quickViewProduct.stock}</strong>{" "}
//                     left in stock
//                   </span>
//                 </div>

//                 <button
//                   className="quick-view-cart"
//                   onClick={() => {
//                     addToCart(quickViewProduct);
//                     setQuickViewProduct(null);
//                   }}
//                 >
//                   <ShoppingCart size={19} />
//                   Add to Cart
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Listing;


























import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Eye,
  Star,
  X,
  Check,
  RotateCcw,
  Package,
  Zap,
  ArrowUpDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../store/admin/product_slice";
import "./Listing.css";
import { useNavigate } from "react-router-dom";
const WISHLIST_KEY = "nexoraWishlist";
const CART_KEY = "nexoraCart";
const PRODUCTS_PER_PAGE = 8;

const readLocalArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const getProductId = (product) => String(product?._id || product?.id || "");

const getDiscountedPrice = (product) => {
  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);
  return Math.max(0, price - (price * discount) / 100);
};

const formatPrice = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatRating = (rating) => {
  const value = Number(rating || 0);
  return value > 0 ? value.toFixed(1) : "New";
};

function Listing() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
const navigate = useNavigate();
  const adminProductState = useSelector(
    (state) => state.adminProduct || {}
  );
  const products = adminProductState.products || [];
  const isLoading =
    adminProductState.isloading ??
    adminProductState.productsLoading ??
    adminProductState.isLoading ??
    false;
  const error = adminProductState.error ?? null;

  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(() =>
    readLocalArray(WISHLIST_KEY)
  );
  const [cart, setCart] = useState(() => readLocalArray(CART_KEY));
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Keep a category selected from a homepage category link.
  useEffect(() => {
    const queryCategory = searchParams.get("category");
    setCategory(queryCategory || "All");
  }, [searchParams]);

  // Keep out-of-stock products visible in the catalog; cart actions are disabled for them.
  const availableProducts = useMemo(
    () =>
      Array.isArray(products)
        ? products.filter((product) => product && getProductId(product))
        : [],
    [products]
  );

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        availableProducts
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [availableProducts]);

  const maxPriceLimit = useMemo(() => {
    const highestPrice = availableProducts.reduce(
      (highest, product) =>
        Math.max(highest, getDiscountedPrice(product)),
      0
    );
    return Math.max(250, Math.ceil(highestPrice));
  }, [availableProducts]);

  const selectedMaxPrice = maxPrice ?? maxPriceLimit;

  const filteredProducts = useMemo(() => {
    let result = [...availableProducts];

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter((product) => {
        const name = String(product.name || "").toLowerCase();
        const productCategory = String(product.category || "").toLowerCase();
        const description = String(product.description || "").toLowerCase();

        return (
          name.includes(keyword) ||
          productCategory.includes(keyword) ||
          description.includes(keyword)
        );
      });
    }

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    result = result.filter(
      (product) => getDiscountedPrice(product) <= selectedMaxPrice
    );

    if (minRating > 0) {
      result = result.filter(
        (product) => Number(product.rating || 0) >= minRating
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => getDiscountedPrice(a) - getDiscountedPrice(b)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => getDiscountedPrice(b) - getDiscountedPrice(a)
        );
        break;
      case "rating":
        result.sort(
          (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
        );
        break;
      case "name":
        result.sort((a, b) =>
          String(a.name || "").localeCompare(String(b.name || ""))
        );
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      default:
        // Featured: best-selling products first, then highest rated.
        result.sort(
          (a, b) =>
            Number(b.sold || 0) - Number(a.sold || 0) ||
            Number(b.rating || 0) - Number(a.rating || 0)
        );
        break;
    }

    return result;
  }, [
    availableProducts,
    search,
    category,
    selectedMaxPrice,
    minRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, category, maxPrice, minRating, sortBy]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const categoryCounts = useMemo(() => {
    return availableProducts.reduce((counts, product) => {
      const name = product.category || "Other";
      counts[name] = (counts[name] || 0) + 1;
      return counts;
    }, {});
  }, [availableProducts]);

  const isWishlisted = (product) =>
    wishlist.some(
      (item) => getProductId(item) === getProductId(product)
    );

  const toggleWishlist = (product) => {
    const productId = getProductId(product);

    setWishlist((previous) =>
      previous.some((item) => getProductId(item) === productId)
        ? previous.filter((item) => getProductId(item) !== productId)
        : [...previous, product]
    );
  };

  const addToCart = (product) => {
    const productId = getProductId(product);

    if (!productId || Number(product.stock) <= 0) return;

    setCart((previous) => {
      const existing = previous.find(
        (item) => getProductId(item) === productId
      );

      if (existing) {
        return previous.map((item) =>
          getProductId(item) === productId
            ? {
                ...item,
                quantity: Math.min(
                  Number(item.quantity || 1) + 1,
                  Number(product.stock)
                ),
              }
            : item
        );
      }

      return [...previous, { ...product, id: productId, quantity: 1 }];
    });

    setCartMessage(`${product.name} added to cart`);
    window.setTimeout(() => setCartMessage(""), 2200);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(null);
    setMinRating(0);
    setSortBy("featured");
    setPage(1);
  };

  const hasActiveFilters =
    Boolean(search.trim()) ||
    category !== "All" ||
    maxPrice !== null ||
    minRating !== 0;

  const averageRating = useMemo(() => {
    const rated = availableProducts.filter(
      (product) => Number(product.rating || 0) > 0
    );
    if (!rated.length) return "—";

    const average =
      rated.reduce(
        (total, product) => total + Number(product.rating || 0),
        0
      ) / rated.length;

    return average.toFixed(1);
  }, [availableProducts]);

  return (
    <div className="listing-page">
      {/* TOP HERO */}
      <section className="listing-hero">
        <div className="listing-hero-glow listing-glow-one"></div>
        <div className="listing-hero-glow listing-glow-two"></div>

        <div className="listing-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="listing-eyebrow">
              <Zap size={15} />
              Explore Nexora
            </span>

            <h1>
              Find something
              <span> you'll love.</span>
            </h1>

            <p>
              Discover premium products carefully selected for your lifestyle.
              Shop smarter, faster and better with Nexora.
            </p>
          </motion.div>

          <motion.div
            className="listing-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <strong>{availableProducts.length}</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>{averageRating}</strong>
              <span>Average Rating</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="listing-container">
        {/* SEARCH BAR */}
        <motion.div
          className="listing-search-wrapper"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search size={20} />

          <input
            type="text"
            placeholder="Search products, categories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              className="listing-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}

          <button
            className="listing-search-button"
            onClick={() => setPage(1)}
          >
            Search
          </button>
        </motion.div>

        {/* MOBILE FILTER BUTTON */}
        <button
          className="mobile-filter-button"
          onClick={() => setMobileFilterOpen(true)}
        >
          <SlidersHorizontal size={18} />
          Filters
          {hasActiveFilters && <span></span>}
        </button>

        <div className="listing-layout">
          {/* SIDEBAR */}
          <aside
            className={`listing-sidebar ${
              mobileFilterOpen ? "listing-sidebar-open" : ""
            }`}
          >
            <div className="mobile-filter-header">
              <div>
                <h3>Filters</h3>
                <span>Refine your search</span>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X />
              </button>
            </div>

            {/* CATEGORY */}
            <div className="filter-section">
              <div className="filter-heading">
                <h3>Categories</h3>
              </div>

              <div className="category-list">
                {["All", ...categories].map((item) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    onClick={() => {
                      setCategory(item);
                      setMobileFilterOpen(false);
                    }}
                  >
                    <span>{item}</span>
                    <small>
                      {item === "All"
                        ? availableProducts.length
                        : categoryCounts[item] || 0}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="filter-section">
              <div className="filter-heading">
                <h3>Price Range</h3>
                <span>{formatPrice(selectedMaxPrice)}</span>
              </div>

              <input
                className="price-slider"
                type="range"
                min="0"
                max={maxPriceLimit}
                value={selectedMaxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
              />

              <div className="price-labels">
                <span>$0</span>
                <span>{formatPrice(maxPriceLimit)}+</span>
              </div>
            </div>

            {/* RATING */}
            <div className="filter-section">
              <div className="filter-heading">
                <h3>Rating</h3>
              </div>

              <div className="rating-filter">
                {[4.5, 4, 3.5, 3].map((rating) => (
                  <button
                    key={rating}
                    className={minRating === rating ? "active" : ""}
                    onClick={() =>
                      setMinRating(minRating === rating ? 0 : rating)
                    }
                  >
                    <span className="rating-stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          fill={
                            index < Math.floor(rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </span>

                    <span>{rating}+</span>
                    {minRating === rating && <Check size={15} />}
                  </button>
                ))}
              </div>
            </div>

            {/* BENEFITS */}
            <div className="filter-benefits">
              <div>
                <Package size={18} />
                <div>
                  <strong>Free Shipping</strong>
                  <span>On orders over $100</span>
                </div>
              </div>

              <div>
                <RotateCcw size={18} />
                <div>
                  <strong>Easy Returns</strong>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                className="clear-filter-button"
                onClick={clearFilters}
              >
                <RotateCcw size={16} />
                Clear all filters
              </button>
            )}
          </aside>

          {/* PRODUCTS AREA */}
          <main className="listing-products-area">
            {/* TOOLBAR */}
            <div className="listing-toolbar">
              <div>
                <h2>All Products</h2>
                <p>
                  Showing <strong>{filteredProducts.length}</strong> products
                </p>
              </div>

              <div className="listing-toolbar-actions">
                <div className="sort-wrapper">
                  <ArrowUpDown size={16} />
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>
            </div>

            {/* ACTIVE FILTERS */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span>Active filters:</span>

                {search && (
                  <button onClick={() => setSearch("")}>
                    Search: {search}
                    <X size={13} />
                  </button>
                )}

                {category !== "All" && (
                  <button onClick={() => setCategory("All")}>
                    {category}
                    <X size={13} />
                  </button>
                )}

                {minRating > 0 && (
                  <button onClick={() => setMinRating(0)}>
                    {minRating}+ rating
                    <X size={13} />
                  </button>
                )}

                {maxPrice !== null && (
                  <button onClick={() => setMaxPrice(null)}>
                    Under {formatPrice(maxPrice)}
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* LOADING / ERROR / PRODUCT GRID */}
            {isLoading ? (
              <div className="listing-empty-state">
                <div className="empty-icon">
                  <Package size={32} />
                </div>
                <h3>Loading products...</h3>
                <p>Please wait while we load the latest products.</p>
              </div>
            ) : error ? (
              <div className="listing-empty-state">
                <div className="empty-icon">
                  <X size={32} />
                </div>
                <h3>Unable to load products</h3>
                <p>
                  {typeof error === "string"
                    ? error
                    : "Something went wrong while fetching products."}
                </p>
                <button onClick={() => dispatch(fetchAllProducts())}>
                  Try again
                </button>
              </div>
            ) : currentProducts.length > 0 ? (
              <motion.div className="listing-product-grid" layout>
                <AnimatePresence mode="popLayout">
                  {currentProducts.map((product, index) => {
                    const productId = getProductId(product);
                    const wishlisted = isWishlisted(product);
                    const price = getDiscountedPrice(product);
                    const hasDiscount = Number(product.discount || 0) > 0;

                    return (
                      <motion.article
                        className="listing-product-card"
                        key={productId}
                        layout
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.04,
                        }}
                       onClick={() => navigate(`/shop/product/${product._id}`)}

                      >
                        {/* IMAGE */}
                        <div className="listing-product-image">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://placehold.co/600x600?text=Product";
                            }}
                          />

                          <div className="product-image-gradient"></div>

                          {(product.badges || Number(product.stock) <= 0) && (
                            <span className="product-badge">
                              {Number(product.stock) <= 0
                                ? "Out of Stock"
                                : product.badges}
                            </span>
                          )}

                          {hasDiscount && (
                            <span className="product-discount-badge">
                              {Number(product.discount)}% OFF
                            </span>
                          )}

                          <button
                            className={`wishlist-button ${
                              wishlisted ? "wishlisted" : ""
                            }`}
                            onClick={() => toggleWishlist(product)}
                            aria-label={
                              wishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <Heart
                              size={18}
                              fill={wishlisted ? "currentColor" : "none"}
                            />
                          </button>

                          <button
                            className="quick-view-button"
                            onClick={() => setQuickViewProduct(product)}
                          >
                            <Eye size={17} />
                            Quick View
                          </button>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="listing-product-info">
                          <span className="listing-product-category">
                            {product.category}
                          </span>

                          <h3>{product.name}</h3>

                          <div className="product-rating">
                            <span className="rating-stars">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  size={14}
                                  fill={
                                    starIndex < Math.round(
                                      Number(product.rating || 0)
                                    )
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </span>

                            <strong>{formatRating(product.rating)}</strong>
                            <span>
                              ({Number(product.reviewCount || product.reviews || 0)})
                            </span>
                          </div>

                          <div className="product-card-bottom">
                            <div className="product-price">
                              <strong>{formatPrice(price)}</strong>
                              {hasDiscount && (
                                <del>{formatPrice(product.price)}</del>
                              )}
                            </div>

                            <button
                              className="add-cart-button"
                              onClick={() => addToCart(product)}
                              disabled={Number(product.stock) <= 0}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <ShoppingCart size={17} />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* EMPTY STATE */
              <motion.div
                className="listing-empty-state"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="empty-icon">
                  <Search size={32} />
                </div>
                <h3>No products found</h3>
                <p>
                  We couldn't find any products matching your filters.
                </p>
                <button onClick={clearFilters}>
                  <RotateCcw size={16} />
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* PAGINATION */}
            {!isLoading && !error && totalPages > 1 && (
              <div className="listing-pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((previous) => previous - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={page === pageNumber ? "active" : ""}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((previous) => previous + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* MOBILE FILTER OVERLAY */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            className="mobile-filter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFilterOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* CART SUCCESS MESSAGE */}
      <AnimatePresence>
        {cartMessage && (
          <motion.div
            className="cart-toast"
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="toast-icon">
              <Check size={18} />
            </div>
            <div>
              <strong>Added to cart</strong>
              <span>{cartMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            className="quick-view-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              className="quick-view-modal"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="quick-view-close"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close quick view"
              >
                <X size={20} />
              </button>

              <div className="quick-view-image">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                />
              </div>

              <div className="quick-view-content">
                <span>{quickViewProduct.category}</span>
                <h2>{quickViewProduct.name}</h2>

                <div className="quick-view-rating">
                  <div>
                    <Star size={17} fill="currentColor" />
                    <strong>{formatRating(quickViewProduct.rating)}</strong>
                  </div>
                  <span>
                    {Number(
                      quickViewProduct.reviewCount ||
                        quickViewProduct.reviews ||
                        0
                    )}{" "}
                    customer reviews
                  </span>
                </div>

                <div className="quick-view-price">
                  <strong>
                    {formatPrice(getDiscountedPrice(quickViewProduct))}
                  </strong>

                  {Number(quickViewProduct.discount || 0) > 0 && (
                    <>
                      <del>{formatPrice(quickViewProduct.price)}</del>
                      <span>
                        Save{" "}
                        {formatPrice(
                          Number(quickViewProduct.price || 0) -
                            getDiscountedPrice(quickViewProduct)
                        )}
                      </span>
                    </>
                  )}
                </div>

                <p>
                  {quickViewProduct.description ||
                    "Discover this product from the Nexora collection."}
                </p>

                <div className="quick-view-stock">
                  <Package size={17} />
                  <span>
                    {Number(quickViewProduct.stock) <= 0
                      ? "Currently out of stock"
                      : Number(quickViewProduct.stock) <= 10
                        ? `Only ${Number(quickViewProduct.stock)} left in stock`
                        : `${Number(quickViewProduct.stock)} available in stock`}
                  </span>
                </div>

                <button
                  className="quick-view-cart"
                  disabled={Number(quickViewProduct.stock) <= 0}
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  <ShoppingCart size={19} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Listing;
