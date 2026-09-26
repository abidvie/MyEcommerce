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
  Plus,
  Minus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./Listing.css";

/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 169,
    rating: 4.8,
    reviews: 248,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    badge: "Best Seller",
    description:
      "Premium wireless headphones with active noise cancellation, deep bass and all-day comfort.",
    colors: ["Black", "White"],
    stock: 18,
    isNew: false,
  },
  {
    id: 2,
    name: "Minimal Smart Watch",
    category: "Electronics",
    price: 189,
    oldPrice: 229,
    rating: 4.7,
    reviews: 184,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    badge: "New",
    description:
      "A stylish smart watch with health tracking, notifications and a premium minimal design.",
    colors: ["Black", "Silver"],
    stock: 12,
    isNew: true,
  },
  {
    id: 3,
    name: "Urban Classic Sneakers",
    category: "Fashion",
    price: 89,
    oldPrice: 119,
    rating: 4.6,
    reviews: 326,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    badge: "Trending",
    description:
      "Comfortable everyday sneakers designed for a clean urban look.",
    colors: ["Red", "White", "Black"],
    stock: 24,
    isNew: false,
  },
  {
    id: 4,
    name: "Modern Leather Backpack",
    category: "Fashion",
    price: 74,
    oldPrice: 99,
    rating: 4.5,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
    badge: "Popular",
    description:
      "Premium backpack with a spacious interior and modern professional styling.",
    colors: ["Brown", "Black"],
    stock: 31,
    isNew: false,
  },
  {
    id: 5,
    name: "Premium Mechanical Keyboard",
    category: "Electronics",
    price: 119,
    oldPrice: 149,
    rating: 4.9,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
    badge: "Top Rated",
    description:
      "Mechanical keyboard with satisfying switches, RGB lighting and premium construction.",
    colors: ["Black", "White"],
    stock: 9,
    isNew: false,
  },
  {
    id: 6,
    name: "Minimal Ceramic Lamp",
    category: "Home",
    price: 59,
    oldPrice: 79,
    rating: 4.4,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900",
    badge: "New",
    description:
      "Elegant ceramic lamp that adds a warm premium atmosphere to your space.",
    colors: ["White", "Cream"],
    stock: 16,
    isNew: true,
  },
  {
    id: 7,
    name: "Premium Coffee Maker",
    category: "Home",
    price: 149,
    oldPrice: 199,
    rating: 4.8,
    reviews: 219,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900",
    badge: "Best Seller",
    description:
      "Modern coffee maker designed for rich and consistent coffee every morning.",
    colors: ["Black", "Silver"],
    stock: 14,
    isNew: false,
  },
  {
    id: 8,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 79,
    oldPrice: 109,
    rating: 4.5,
    reviews: 164,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900",
    badge: "Popular",
    description:
      "Classic denim jacket with a modern fit and versatile everyday styling.",
    colors: ["Blue", "Black"],
    stock: 28,
    isNew: false,
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 69,
    oldPrice: 89,
    rating: 4.6,
    reviews: 276,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900",
    badge: "Trending",
    description:
      "Portable speaker with powerful sound, deep bass and long battery life.",
    colors: ["Black", "Blue"],
    stock: 21,
    isNew: false,
  },
  {
    id: 10,
    name: "Luxury Sunglasses",
    category: "Fashion",
    price: 64,
    oldPrice: 89,
    rating: 4.3,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900",
    badge: "Sale",
    description:
      "Premium sunglasses with a timeless frame and lightweight construction.",
    colors: ["Black", "Brown"],
    stock: 35,
    isNew: false,
  },
  {
    id: 11,
    name: "Smart Desk Setup Light",
    category: "Home",
    price: 49,
    oldPrice: 69,
    rating: 4.5,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=900",
    badge: "New",
    description:
      "Modern desk lamp with adjustable lighting for work and study setups.",
    colors: ["White", "Black"],
    stock: 19,
    isNew: true,
  },
  {
    id: 12,
    name: "Wireless Gaming Mouse",
    category: "Electronics",
    price: 79,
    oldPrice: 109,
    rating: 4.8,
    reviews: 398,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900",
    badge: "Best Seller",
    description:
      "High precision wireless gaming mouse with ergonomic design and low latency.",
    colors: ["Black", "White"],
    stock: 11,
    isNew: false,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function Listing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);

  const [sortBy, setSortBy] = useState("featured");

  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexoraWishlist")) || [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexoraCart")) || [];
    } catch {
      return [];
    }
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [cartMessage, setCartMessage] = useState("");

  const productsPerPage = 8;

  /* =========================================================
     SAVE LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem("nexoraWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("nexoraCart", JSON.stringify(cart));
  }, [cart]);

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword)
      );
    }

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    result = result.filter((product) => product.price <= maxPrice);

    if (minRating > 0) {
      result = result.filter((product) => product.rating >= minRating);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;

      default:
        break;
    }

    return result;
  }, [search, category, maxPrice, minRating, sortBy]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, category, maxPrice, minRating, sortBy]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  /* =========================================================
     CART
  ========================================================= */

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartMessage(`${product.name} added to cart`);

    setTimeout(() => {
      setCartMessage("");
    }, 2200);
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(250);
    setMinRating(0);
    setSortBy("featured");
    setPage(1);
  };

  const hasActiveFilters =
    search ||
    category !== "All" ||
    maxPrice !== 250 ||
    minRating !== 0;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="listing-page">
      {/* =====================================================
          TOP HERO
      ===================================================== */}

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
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>4.8</strong>
              <span>Average Rating</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

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
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="listing-search-clear"
              onClick={() => setSearch("")}
            >
              <X size={17} />
            </button>
          )}

          <button className="listing-search-button">
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
          {/* =================================================
              SIDEBAR
          ================================================= */}

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

              <button onClick={() => setMobileFilterOpen(false)}>
                <X />
              </button>
            </div>

            {/* CATEGORY */}

            <div className="filter-section">
              <div className="filter-heading">
                <h3>Categories</h3>
              </div>

              <div className="category-list">
                {["All", "Electronics", "Fashion", "Home"].map((item) => (
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
                        ? products.length
                        : products.filter((p) => p.category === item).length}
                    </small>
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}

            <div className="filter-section">
              <div className="filter-heading">
                <h3>Price Range</h3>
                <span>${maxPrice}</span>
              </div>

              <input
                className="price-slider"
                type="range"
                min="0"
                max="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />

              <div className="price-labels">
                <span>$0</span>
                <span>$250+</span>
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
                          fill={index < Math.floor(rating) ? "currentColor" : "none"}
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
              <button className="clear-filter-button" onClick={clearFilters}>
                <RotateCcw size={16} />
                Clear all filters
              </button>
            )}
          </aside>

          {/* =================================================
              PRODUCTS AREA
          ================================================= */}

          <main className="listing-products-area">
            {/* TOOLBAR */}

            <div className="listing-toolbar">
              <div>
                <h2>All Products</h2>

                <p>
                  Showing{" "}
                  <strong>{filteredProducts.length}</strong> products
                </p>
              </div>

              <div className="listing-toolbar-actions">
                <div className="sort-wrapper">
                  <ArrowUpDown size={16} />

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
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

                {maxPrice !== 250 && (
                  <button onClick={() => setMaxPrice(250)}>
                    Under ${maxPrice}
                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* PRODUCT GRID */}

            {currentProducts.length > 0 ? (
              <motion.div
                className="listing-product-grid"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {currentProducts.map((product, index) => {
                    const isWishlisted = wishlist.includes(product.id);

                    return (
                      <motion.article
                        className="listing-product-card"
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.04,
                        }}
                      >
                        {/* IMAGE */}

                        <div className="listing-product-image">
                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div className="product-image-gradient"></div>

                          <span className="product-badge">
                            {product.badge}
                          </span>

                          <button
                            className={`wishlist-button ${
                              isWishlisted ? "wishlisted" : ""
                            }`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart
                              size={18}
                              fill={
                                isWishlisted ? "currentColor" : "none"
                              }
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
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                            </span>

                            <strong>{product.rating}</strong>

                            <span>({product.reviews})</span>
                          </div>

                          <div className="product-card-bottom">
                            <div className="product-price">
                              <strong>${product.price}</strong>

                              <del>${product.oldPrice}</del>
                            </div>

                            <button
                              className="add-cart-button"
                              onClick={() => addToCart(product)}
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

            {totalPages > 1 && (
              <div className="listing-pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={
                        page === pageNumber ? "active" : ""
                      }
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER OVERLAY
      ===================================================== */}

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

      {/* =====================================================
          CART SUCCESS MESSAGE
      ===================================================== */}

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

      {/* =====================================================
          QUICK VIEW MODAL
      ===================================================== */}

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
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="quick-view-close"
                onClick={() => setQuickViewProduct(null)}
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
                    <strong>{quickViewProduct.rating}</strong>
                  </div>

                  <span>
                    {quickViewProduct.reviews} customer reviews
                  </span>
                </div>

                <div className="quick-view-price">
                  <strong>${quickViewProduct.price}</strong>
                  <del>${quickViewProduct.oldPrice}</del>

                  <span>
                    Save $
                    {quickViewProduct.oldPrice -
                      quickViewProduct.price}
                  </span>
                </div>

                <p>{quickViewProduct.description}</p>

                <div className="quick-view-colors">
                  <strong>Available colors</strong>

                  <div>
                    {quickViewProduct.colors.map((color) => (
                      <span key={color}>{color}</span>
                    ))}
                  </div>
                </div>

                <div className="quick-view-stock">
                  <Package size={17} />

                  <span>
                    Only{" "}
                    <strong>{quickViewProduct.stock}</strong>{" "}
                    left in stock
                  </span>
                </div>

                <button
                  className="quick-view-cart"
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