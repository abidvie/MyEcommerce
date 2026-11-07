
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  X,
  ZoomIn,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllProducts } from "../../store/admin/product_slice";
import "./ProductDetails.css";

const WISHLIST_KEY = "nexoraWishlist";
const CART_KEY = "nexoraCart";

const readLocalArray = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const getProductId = (product) =>
  String(product?._id || product?.id || "");

const getPrice = (product) => {
  const price = Number(product?.price || 0);
  const discount = Number(product?.discount || 0);

  return Math.max(0, price - (price * discount) / 100);
};

const money = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const getImage = (product) =>
  product?.image ||
  "https://placehold.co/800x800?text=Product";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.adminProduct || {});
  const products = productState.products || [];
  const loading =
    productState.isloading ??
    productState.productsLoading ??
    productState.isLoading ??
    false;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });
  const [wishlist, setWishlist] = useState(() =>
    readLocalArray(WISHLIST_KEY)
  );
  const [cart, setCart] = useState(() =>
    readLocalArray(CART_KEY)
  );
  const [toast, setToast] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
    setZoomOpen(false);
  }, [id]);

  const product = useMemo(
    () => products.find((item) => getProductId(item) === String(id)),
    [products, id]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (item) =>
          getProductId(item) !== getProductId(product) &&
          item.category === product.category
      )
      .slice(0, 4);
  }, [products, product]);

  const isWishlisted = product
    ? wishlist.some(
        (item) => getProductId(item) === getProductId(product)
      )
    : false;

  const stock = Number(product?.stock || 0);
  const price = product ? getPrice(product) : 0;
  const discount = Number(product?.discount || 0);
  const hasDiscount = discount > 0;

  const rating = Number(product?.rating || 0);
  const reviews = Number(
    product?.reviewCount || product?.reviews || 0
  );

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const toggleWishlist = () => {
    if (!product) return;

    const productId = getProductId(product);

    setWishlist((previous) =>
      previous.some((item) => getProductId(item) === productId)
        ? previous.filter(
            (item) => getProductId(item) !== productId
          )
        : [...previous, product]
    );

    showToast(
      isWishlisted
        ? "Removed from your wishlist"
        : "Added to your wishlist"
    );
  };

  const addToCart = (buyNow = false) => {
    if (!product || stock <= 0) return;

    const productId = getProductId(product);

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
                  Number(item.quantity || 1) + quantity,
                  stock
                ),
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          id: productId,
          quantity,
        },
      ];
    });

    setAdded(true);
    showToast(`${product.name} added to cart`);

    if (buyNow) {
      navigate("/shop/cart");
    }
  };

  const handleImageMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  if (loading && !products.length) {
    return (
      <div className="pd-loading">
        <div className="pd-loader" />
        <h3>Loading product...</h3>
        <p>Getting everything ready for you.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-not-found">
        <div className="pd-not-found-icon">
          <Package size={35} />
        </div>
        <h2>Product not found</h2>
        <p>This product may have been removed or is unavailable.</p>
        <button onClick={() => navigate("/shop/products")}>
          <ArrowLeft size={17} />
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="pd-page">
      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        <button onClick={() => navigate("/shop/home")}>Home</button>
        <ChevronRight size={14} />
        <button onClick={() => navigate("/shop/products")}>
          Products
        </button>
        <ChevronRight size={14} />
        <button
          onClick={() =>
            navigate(
              `/shop/products?category=${encodeURIComponent(
                product.category || ""
              )}`
            )
          }
        >
          {product.category}
        </button>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      {/* PRODUCT SECTION */}
      <section className="pd-main">
        {/* IMAGE */}
        <motion.div
          className="pd-gallery"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div
            className="pd-main-image"
            onMouseMove={handleImageMove}
            onMouseLeave={() =>
              setZoomPosition({ x: 50, y: 50 })
            }
            onClick={() => setZoomOpen(true)}
          >
            <img
              src={getImage(product)}
              alt={product.name}
              style={{
                transform: "scale(1)",
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
              onError={(event) => {
                event.currentTarget.src =
                  "https://placehold.co/800x800?text=Product";
              }}
            />

            {hasDiscount && (
              <span className="pd-sale-badge">
                -{discount}% OFF
              </span>
            )}

            {Number(product.stock) <= 0 && (
              <span className="pd-out-badge">Out of Stock</span>
            )}

            <button
              className="pd-zoom-button"
              onClick={(event) => {
                event.stopPropagation();
                setZoomOpen(true);
              }}
              aria-label="Zoom product image"
            >
              <ZoomIn size={19} />
            </button>

            <div className="pd-image-hint">
              <ZoomIn size={14} />
              Click image to zoom
            </div>
          </div>

          <div className="pd-gallery-caption">
            <Sparkles size={15} />
            Product image preview
          </div>
        </motion.div>

        {/* DETAILS */}
        <motion.div
          className="pd-info"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="pd-brand-label">
            <span>{product.category || "Nexora Collection"}</span>
            <span className="pd-product-code">
              SKU: {getProductId(product).slice(-8).toUpperCase()}
            </span>
          </div>

          <h1>{product.name}</h1>

          <div className="pd-rating-row">
            <div className="pd-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={
                    index < Math.round(rating)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>

            <strong>{rating > 0 ? rating.toFixed(1) : "New"}</strong>
            <span>{reviews} reviews</span>
            <span className="pd-rating-divider">|</span>
            <span className="pd-rating-verified">
              <CheckCircle size={14} />
              Genuine product
            </span>
          </div>

          <div className="pd-price-section">
            <div className="pd-price-line">
              <strong>{money(price)}</strong>

              {hasDiscount && (
                <del>{money(product.price)}</del>
              )}

              {hasDiscount && (
                <span className="pd-save-label">
                  Save {money(Number(product.price) - price)}
                </span>
              )}
            </div>

            <p>Inclusive of all applicable taxes</p>
          </div>

          <div className="pd-short-description">
            {product.description ||
              "Discover premium quality, carefully designed for your everyday lifestyle."}
          </div>

          <div className="pd-stock-status">
            <span className={stock > 0 ? "pd-stock-dot" : "pd-stock-dot pd-stock-dot-out"} />
            {stock > 0 ? (
              stock <= 10 ? (
                <strong>Only {stock} left in stock</strong>
              ) : (
                <strong>In stock and ready to ship</strong>
              )
            ) : (
              <strong>Currently unavailable</strong>
            )}
          </div>

          <div className="pd-divider" />

          {/* QUANTITY */}
          <div className="pd-quantity-row">
            <span>Quantity</span>

            <div className="pd-quantity-control">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(stock, q + 1))
                }
                disabled={quantity >= stock || stock <= 0}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pd-actions">
            <button
              className="pd-add-cart"
              disabled={stock <= 0}
              onClick={() => addToCart(false)}
            >
              {added ? <Check size={19} /> : <ShoppingCart size={19} />}
              {stock <= 0
                ? "Out of Stock"
                : added
                  ? "Add Again"
                  : "Add to Cart"}
            </button>

            <button
              className="pd-buy-now"
              disabled={stock <= 0}
              onClick={() => addToCart(true)}
            >
              Buy Now
              <ArrowRight size={18} />
            </button>

            <button
              className={`pd-wishlist ${isWishlisted ? "active" : ""}`}
              onClick={toggleWishlist}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={20}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* TRUST BENEFITS */}
          <div className="pd-trust-box">
            <div>
              <Truck size={20} />
              <span>
                <strong>Fast Delivery</strong>
                <small>Reliable shipping</small>
              </span>
            </div>

            <div>
              <RotateCcw size={20} />
              <span>
                <strong>Easy Returns</strong>
                <small>30-day return policy</small>
              </span>
            </div>

            <div>
              <ShieldCheck size={20} />
              <span>
                <strong>Secure Checkout</strong>
                <small>Protected payments</small>
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCT TABS */}
      <section className="pd-tabs-section">
        <div className="pd-tabs">
          {[
            ["description", "Description"],
            ["specifications", "Specifications"],
            ["reviews", "Reviews"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="pd-tab-content"
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "description" && (
              <>
                <h3>About this product</h3>
                <p>
                  {product.description ||
                    "This product is part of the Nexora collection. Designed with attention to quality, usability and modern style."}
                </p>
                <div className="pd-feature-list">
                  <div><Check size={17} /> Premium quality product</div>
                  <div><Check size={17} /> Carefully selected design</div>
                  <div><Check size={17} /> Reliable everyday performance</div>
                  <div><Check size={17} /> Customer-focused experience</div>
                </div>
              </>
            )}

            {activeTab === "specifications" && (
              <>
                <h3>Product specifications</h3>
                <div className="pd-spec-table">
                  <div><span>Product name</span><strong>{product.name}</strong></div>
                  <div><span>Category</span><strong>{product.category || "Other"}</strong></div>
                  <div><span>SKU</span><strong>{getProductId(product)}</strong></div>
                  <div><span>Availability</span><strong>{stock > 0 ? "In stock" : "Out of stock"}</strong></div>
                  <div><span>Price</span><strong>{money(price)}</strong></div>
                  <div><span>Discount</span><strong>{discount}%</strong></div>
                </div>
              </>
            )}

            {activeTab === "reviews" && (
              <>
                <h3>Customer reviews</h3>
                <div className="pd-review-summary">
                  <strong>{rating > 0 ? rating.toFixed(1) : "—"}</strong>
                  <div>
                    <div className="pd-stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          fill={index < Math.round(rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span>{reviews} customer reviews</span>
                  </div>
                </div>
                <p className="pd-review-note">
                  Customer review submission can be connected to your review API.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="pd-related-heading">
            <div>
              <span>YOU MAY ALSO LIKE</span>
              <h2>Related products</h2>
            </div>

            <button onClick={() => navigate("/shop/products")}>
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="pd-related-grid">
            {relatedProducts.map((item) => (
              <motion.article
                key={getProductId(item)}
                className="pd-related-card"
                whileHover={{ y: -5 }}
                onClick={() =>
                  navigate(`/shop/product/${getProductId(item)}`)
                }
              >
                <div className="pd-related-image">
                  <img src={getImage(item)} alt={item.name} loading="lazy" />
                </div>
                <div className="pd-related-info">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>{money(getPrice(item))}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* IMAGE ZOOM MODAL */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="pd-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              className="pd-zoom-modal"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="pd-zoom-close"
                onClick={() => setZoomOpen(false)}
                aria-label="Close image zoom"
              >
                <X size={23} />
              </button>

              <img src={getImage(product)} alt={product.name} />

              <span>{product.name}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="pd-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div><Check size={17} /></div>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductDetails;
