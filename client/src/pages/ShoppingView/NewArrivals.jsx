import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Eye,
  Star,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Clock3,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  SlidersHorizontal,
  Package,
  RotateCcw,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./NewArrivals.css";

const initialProducts = [
  {
    id: 101,
    name: "Sonic Pro Wireless Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 169,
    rating: 4.9,
    reviews: 128,
    badge: "Just Arrived",
    date: 8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    description:
      "Experience immersive sound, deep bass and all-day comfort with a refined wireless design.",
    colors: ["Black", "White"],
  },
  {
    id: 102,
    name: "Aero Minimal Watch",
    category: "Electronics",
    price: 179,
    oldPrice: 219,
    rating: 4.8,
    reviews: 96,
    badge: "Trending",
    date: 7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    description:
      "A timeless everyday watch with a clean silhouette and a sophisticated finish.",
    colors: ["Silver", "Black"],
  },
  {
    id: 103,
    name: "Retro Street Sneakers",
    category: "Fashion",
    price: 89,
    oldPrice: 115,
    rating: 4.7,
    reviews: 84,
    badge: "Bestseller",
    date: 6,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    description:
      "A versatile streetwear essential that combines everyday comfort with bold style.",
    colors: ["Red", "White", "Black"],
  },
  {
    id: 104,
    name: "Everyday Premium Backpack",
    category: "Fashion",
    price: 74,
    oldPrice: 95,
    rating: 4.6,
    reviews: 73,
    badge: "New Drop",
    date: 5,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
    description:
      "Carry your essentials in a spacious, lightweight bag designed for work and travel.",
    colors: ["Black", "Brown"],
  },
  {
    id: 105,
    name: "Studio Mechanical Keyboard",
    category: "Electronics",
    price: 119,
    oldPrice: 149,
    rating: 4.9,
    reviews: 151,
    badge: "Staff Pick",
    date: 4,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
    description:
      "A satisfying typing experience with a sleek profile and a premium desktop aesthetic.",
    colors: ["Black", "White"],
  },
  {
    id: 106,
    name: "Aura Ceramic Table Lamp",
    category: "Home",
    price: 59,
    oldPrice: 79,
    rating: 4.5,
    reviews: 42,
    badge: "Just Arrived",
    date: 3,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900",
    description:
      "Bring a warm, inviting atmosphere to your room with this elegant statement lamp.",
    colors: ["Cream", "White"],
  },
  {
    id: 107,
    name: "Signature Everyday Sunglasses",
    category: "Fashion",
    price: 64,
    oldPrice: 84,
    rating: 4.6,
    reviews: 67,
    badge: "Limited Drop",
    date: 2,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900",
    description:
      "A modern frame with timeless appeal for sunny days and effortless outfits.",
    colors: ["Black", "Brown"],
  },
  {
    id: 108,
    name: "Pulse Portable Speaker",
    category: "Electronics",
    price: 69,
    oldPrice: 89,
    rating: 4.7,
    reviews: 109,
    badge: "Trending",
    date: 1,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900",
    description:
      "Take your music anywhere with a compact speaker built for rich, room-filling sound.",
    colors: ["Black", "Blue"],
  },
];

const categories = ["All", "Electronics", "Fashion", "Home"];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function NewArrivals() {
  const [products] = useState(initialProducts);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const [wishlist, setWishlist] = useState(() =>
    readStorage("nexoraWishlist", [])
  );
  const [cart, setCart] = useState(() =>
    readStorage("nexoraCart", [])
  );

  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const productsPerPage = 8;

  // Countdown to the next local midnight.
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      const remaining = Math.max(0, midnight.getTime() - now.getTime());
      const totalSeconds = Math.floor(remaining / 1000);

      setTimeLeft({
        hours: String(Math.floor(totalSeconds / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(
          2,
          "0"
        ),
        seconds: String(totalSeconds % 60).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("nexoraWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("nexoraCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setPage(1);
  }, [category, search, sort]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.date - a.date);
    }

    return result;
  }, [products, category, search, sort]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const visibleProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const toggleWishlist = (product) => {
    const alreadySaved = wishlist.includes(product.id);

    setWishlist((previous) =>
      alreadySaved
        ? previous.filter((id) => id !== product.id)
        : [...previous, product.id]
    );

    showToast(
      alreadySaved
        ? "Removed from your wishlist"
        : "Added to your wishlist"
    );
  };

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    showToast(`${product.name} added to cart`);
  };

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => setToast(""), 2400);
  }

  const clearFilters = () => {
    setCategory("All");
    setSearch("");
    setSort("newest");
  };

  return (
    <div className="na-page">
      {/* Hero */}
      <section className="na-hero">
        <div className="na-orb na-orb-one" />
        <div className="na-orb na-orb-two" />

        <div className="na-hero-inner">
          <motion.div
            className="na-hero-copy"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="na-eyebrow">
              <Sparkles size={15} />
              FRESH FINDS. NEW FEELINGS.
            </div>

            <h1>
              Meet your
              <br />
              <span>next favorite.</span>
            </h1>

            <p>
              Discover the latest arrivals, thoughtfully selected to bring
              something extraordinary to your everyday.
            </p>

            <a href="#na-products" className="na-primary-button">
              Explore new arrivals
              <ArrowRight size={18} />
            </a>

            <div className="na-hero-note">
              <span className="na-note-dot" />
              Fresh styles. New possibilities.
            </div>
          </motion.div>

          <motion.div
            className="na-hero-visual"
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="na-hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000"
                alt="Featured new sneaker collection"
              />
              <div className="na-hero-image-shade" />

              <div className="na-floating-label">
                <span className="na-floating-icon">
                  <Sparkles size={17} />
                </span>
                <div>
                  <strong>The new edit</strong>
                  <span>Curated for you</span>
                </div>
              </div>

              <div className="na-floating-number">
                <span>01</span>
                <span>NEW DROP</span>
              </div>
            </div>

            <div className="na-hero-orbit" />
          </motion.div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="na-promo-wrap">
        <div className="na-promo">
          <div className="na-promo-icon">
            <Zap size={22} />
          </div>

          <div className="na-promo-copy">
            <span>THE DAILY EDIT</span>
            <strong>A little something special, every day.</strong>
          </div>

          <div className="na-countdown">
            <Clock3 size={17} />
            <div className="na-time-unit">
              <strong>{timeLeft.hours}</strong>
              <span>HRS</span>
            </div>
            <b>:</b>
            <div className="na-time-unit">
              <strong>{timeLeft.minutes}</strong>
              <span>MIN</span>
            </div>
            <b>:</b>
            <div className="na-time-unit">
              <strong>{timeLeft.seconds}</strong>
              <span>SEC</span>
            </div>
          </div>
        </div>
        <p className="na-promo-disclaimer">
          Countdown resets at local midnight. It is a visual daily feature,
          not a claim that prices or offers expire.
        </p>
      </section>

      {/* Product section */}
      <section className="na-products-section" id="na-products">
        <div className="na-section-heading">
          <div>
            <div className="na-section-kicker">
              <span />
              JUST LANDED
            </div>
            <h2>New, and noteworthy.</h2>
            <p>Meet the pieces everyone will be talking about.</p>
          </div>

          <div className="na-heading-side">
            <span className="na-live-dot" />
            {products.length} curated arrivals
          </div>
        </div>

        {/* Category tabs */}
        <div className="na-toolbar">
          <div className="na-category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
                {category === item && (
                  <motion.span
                    className="na-tab-indicator"
                    layoutId="na-tab-indicator"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="na-toolbar-right">
            <label className="na-search">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find your next favorite..."
                aria-label="Search new arrivals"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <label className="na-sort">
              <SlidersHorizontal size={16} />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <div className="na-result-count">
          Showing <strong>{visibleProducts.length}</strong> of{" "}
          <strong>{filteredProducts.length}</strong> products
          {(category !== "All" || search) && (
            <button onClick={clearFilters}>Clear filters <X size={13} /></button>
          )}
        </div>

        {/* Product cards */}
        {visibleProducts.length ? (
          <motion.div className="na-grid" layout>
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => {
                const saved = wishlist.includes(product.id);

                return (
                  <motion.article
                    className="na-card"
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.035,
                    }}
                  >
                    <div className="na-card-image">
                      <img src={product.image} alt={product.name} />

                      <span className="na-product-badge">
                        <Sparkles size={11} />
                        {product.badge}
                      </span>

                      <button
                        className={`na-wishlist ${saved ? "saved" : ""}`}
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                          saved ? "Remove from wishlist" : "Add to wishlist"
                        }
                      >
                        <Heart
                          size={18}
                          fill={saved ? "currentColor" : "none"}
                        />
                      </button>

                      <button
                        className="na-quick-view"
                        onClick={() => setQuickView(product)}
                      >
                        <Eye size={16} />
                        Quick view
                      </button>
                    </div>

                    <div className="na-card-content">
                      <div className="na-card-category">
                        {product.category}
                        <span>NEW</span>
                      </div>

                      <h3>{product.name}</h3>

                      <div className="na-rating">
                        <Star size={14} fill="currentColor" />
                        <strong>{product.rating}</strong>
                        <span>({product.reviews} reviews)</span>
                      </div>

                      <div className="na-card-footer">
                        <div className="na-price">
                          <strong>${product.price}</strong>
                          <del>${product.oldPrice}</del>
                        </div>

                        <button
                          className="na-add-cart"
                          onClick={() => addToCart(product)}
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
          <div className="na-empty">
            <div><Search size={27} /></div>
            <h3>No new arrivals found</h3>
            <p>Try another search or choose a different category.</p>
            <button onClick={clearFilters}>Show all arrivals</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="na-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={page === pageNumber ? "active" : ""}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Brand promise */}
      <section className="na-benefits">
        <div className="na-benefit">
          <span><Package size={21} /></span>
          <div>
            <strong>Thoughtfully selected</strong>
            <p>Products picked with care.</p>
          </div>
        </div>

        <div className="na-benefit">
          <span><RotateCcw size={21} /></span>
          <div>
            <strong>Easy returns</strong>
            <p>Shop with more confidence.</p>
          </div>
        </div>

        <div className="na-benefit">
          <span><Check size={21} /></span>
          <div>
            <strong>Secure shopping</strong>
            <p>A smoother shopping experience.</p>
          </div>
        </div>
      </section>

      {/* Quick view modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            className="na-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
          >
            <motion.div
              className="na-modal"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="na-modal-close"
                onClick={() => setQuickView(null)}
                aria-label="Close product details"
              >
                <X size={20} />
              </button>

              <div className="na-modal-image">
                <img src={quickView.image} alt={quickView.name} />
              </div>

              <div className="na-modal-content">
                <span className="na-modal-category">
                  {quickView.category} / New arrival
                </span>
                <h2>{quickView.name}</h2>

                <div className="na-modal-rating">
                  <Star size={16} fill="currentColor" />
                  <strong>{quickView.rating}</strong>
                  <span>{quickView.reviews} reviews</span>
                </div>

                <div className="na-modal-price">
                  <strong>${quickView.price}</strong>
                  <del>${quickView.oldPrice}</del>
                </div>

                <p>{quickView.description}</p>

                <div className="na-modal-colors">
                  <strong>Available colors</strong>
                  <div>
                    {quickView.colors.map((color) => (
                      <span key={color}>{color}</span>
                    ))}
                  </div>
                </div>

                <button
                  className="na-modal-cart"
                  onClick={() => {
                    addToCart(quickView);
                    setQuickView(null);
                  }}
                >
                  <ShoppingCart size={18} />
                  Add to cart
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="na-toast"
            initial={{ opacity: 0, y: 15, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span><Check size={17} /></span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewArrivals;