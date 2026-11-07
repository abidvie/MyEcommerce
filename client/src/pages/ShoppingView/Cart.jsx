












import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Lock,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { fetchAllProducts } from "../../store/admin/product_slice";
import "./Cart.css";

const CART_KEY = "nexoraCart";
const SAVED_KEY = "nexoraSavedItems";
const WISHLIST_KEY = "nexoraWishlist";

const readStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Could not read ${key} from localStorage:`, error);
    return [];
  }
};

const getProductId = (product) =>
  String(product?._id || product?.id || product?.productId || "");

const getOriginalPrice = (product) => {
  // Old cart items may already contain price + oldPrice.
  if (product?.oldPrice !== undefined && product?.oldPrice !== null) {
    return Number(product.oldPrice) || 0;
  }

  return Number(product?.price) || 0;
};

const getSellingPrice = (product) => {
  // Preserve the discounted price of older cart items.
  if (product?.oldPrice !== undefined && product?.oldPrice !== null) {
    return Number(product.price) || 0;
  }

  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;

  return price - (price * discount) / 100;
};

const normalizeCartItem = (item) => {
  // Supports both { ...product, quantity } and { product, quantity } formats.
  const product = item?.product || item || {};
  const originalPrice = getOriginalPrice(product);
  const sellingPrice = getSellingPrice(product);

  return {
    ...product,
    id: getProductId(product),
    name: product.name || "Unnamed Product",
    image: product.image || "",
    category: product.category || "General",
    price: sellingPrice,
    oldPrice: originalPrice,
    discount: Number(product.discount) || 0,
    quantity: Math.max(1, Number(item?.quantity) || 1),
    stock:
      product.stock === undefined || product.stock === null
        ? Infinity
        : Math.max(0, Number(product.stock) || 0),
    color: item?.color || product.color || "Default",
    size: item?.size || product.size || "Standard",
  };
};

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(
    (state) => state.adminProduct?.products || []
  );

  const productsLoading = useSelector(
    (state) =>
      state.adminProduct?.productsLoading ||
      state.adminProduct?.isloading ||
      state.adminProduct?.isLoading ||
      false
  );

  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_KEY).map(normalizeCartItem)
  );

  const [savedItems, setSavedItems] = useState(() =>
    readStorage(SAVED_KEY).map(normalizeCartItem)
  );

  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);

  // Fetch real products for the recommendation section.
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  // Keep cart data synchronized with localStorage.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== String(id)) return item;

        const maximum = Number.isFinite(item.stock)
          ? item.stock
          : Infinity;

        return {
          ...item,
          quantity: Math.min(
            maximum,
            Math.max(1, item.quantity + change)
          ),
        };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== String(id))
    );
  };

  const saveForLater = (item) => {
    setSavedItems((items) => {
      const alreadySaved = items.some(
        (saved) => saved.id === item.id
      );

      return alreadySaved ? items : [...items, item];
    });

    removeItem(item.id);
  };

  const restoreSavedItem = (item) => {
    setCartItems((items) => {
      const existing = items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existing) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.min(
                  cartItem.quantity + item.quantity,
                  cartItem.stock
                ),
              }
            : cartItem
        );
      }

      return [...items, item];
    });

    setSavedItems((items) =>
      items.filter((saved) => saved.id !== item.id)
    );
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NEXORA10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code. Please try again.");
    }
  };

  const addRecommended = (product) => {
    const productId = getProductId(product);
    const stock = Number(product.stock) || 0;

    if (!stock) return;

    setCartItems((items) => {
      const existing = items.find(
        (item) => item.id === productId
      );

      if (existing) {
        return items.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item
        );
      }

      return [
        ...items,
        normalizeCartItem({
          ...product,
          quantity: 1,
        }),
      ];
    });

    setAddedProducts((items) => [...items, productId]);

    window.setTimeout(() => {
      setAddedProducts((items) =>
        items.filter((id) => id !== productId)
      );
    }, 1500);
  };

  const toggleWishlist = (product) => {
    const productId = getProductId(product);

    setWishlist((items) => {
      const exists = items.some(
        (item) => String(item._id || item.id) === productId
      );

      if (exists) {
        return items.filter(
          (item) => String(item._id || item.id) !== productId
        );
      }

      return [...items, product];
    });
  };

  // Subtotal uses the actual selling price after product discount.
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const originalTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.oldPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  const productDiscount = Math.max(0, originalTotal - subtotal);
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;

  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = Math.max(0, subtotal - couponDiscount + shipping);

  const freeShippingProgress = Math.min(
    (subtotal / 150) * 100,
    100
  );

  const remainingForFreeShipping = Math.max(150 - subtotal, 0);

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Recommend products from the real backend catalogue.
  const recommendations = useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.id));

    return products
      .filter(
        (product) =>
          !cartIds.has(getProductId(product)) &&
          Number(product.stock) > 0
      )
      .sort(
        (a, b) =>
          (Number(b.sold) || 0) - (Number(a.sold) || 0)
      )
      .slice(0, 4);
  }, [products, cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-background">
          <div className="cart-orb cart-orb-one" />
          <div className="cart-orb cart-orb-two" />
          <div className="cart-orb cart-orb-three" />
        </div>

        <motion.div
          className="empty-cart"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="empty-cart-icon">
            <ShoppingBag size={46} />
          </div>

          <span className="empty-cart-badge">
            <Sparkles size={14} />
            Your cart is waiting
          </span>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything yet. Discover
            something amazing and start shopping with Nexora.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/shop/products")}
          >
            Start Shopping
            <ArrowRight size={19} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-background">
        <div className="cart-orb cart-orb-one" />
        <div className="cart-orb cart-orb-two" />
        <div className="cart-orb cart-orb-three" />
      </div>

      <main className="cart-container">
        {/* HEADER */}
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="cart-breadcrumb">
              Home
              <ChevronRight size={14} />
              Cart
            </div>

            <div className="cart-title-row">
              <div className="cart-title-icon">
                <ShoppingBag size={25} />
              </div>

              <div>
                <h1>Your Shopping Cart</h1>
                <p>
                  {itemCount} {itemCount === 1 ? "item" : "items"} ready
                  for checkout
                </p>
              </div>
            </div>
          </div>

          <div className="secure-cart">
            <ShieldCheck size={19} />
            <div>
              <strong>Secure Shopping</strong>
              <span>Protected checkout</span>
            </div>
          </div>
        </motion.div>

        {/* FREE SHIPPING */}
        <motion.div
          className="shipping-progress-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="shipping-progress-left">
            <div className="shipping-icon">
              <Truck size={21} />
            </div>

            <div>
              {remainingForFreeShipping > 0 ? (
                <>
                  <strong>
                    Add ${remainingForFreeShipping.toFixed(2)} more
                  </strong>
                  <span>to unlock FREE delivery</span>
                </>
              ) : (
                <>
                  <strong>You've unlocked FREE delivery!</strong>
                  <span>Your order qualifies for free shipping.</span>
                </>
              )}
            </div>
          </div>

          <div className="shipping-progress">
            <div className="shipping-progress-track">
              <motion.div
                className="shipping-progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            <span>${Math.min(subtotal, 150).toFixed(0)} / $150</span>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="cart-layout">
          {/* LEFT */}
          <section className="cart-products-section">
            <div className="cart-section-heading">
              <div>
                <h2>Cart Items</h2>
                <span>{itemCount} products</span>
              </div>

              <button
                className="continue-link"
                onClick={() => navigate("/shop/listing")}
              >
                Continue Shopping
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="cart-items-list">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => {
                  const discountPercentage =
                    item.oldPrice > 0
                      ? Math.round(
                          ((item.oldPrice - item.price) /
                            item.oldPrice) *
                            100
                        )
                      : 0;

                  return (
                    <motion.div
                      className="cart-item-card"
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: 60,
                        height: 0,
                        marginBottom: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                    >
                      <div className="cart-product-image">
                        <img src={item.image} alt={item.name} />

                        {discountPercentage > 0 && (
                          <span className="item-discount">
                            {discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      <div className="cart-product-details">
                        <span className="cart-product-category">
                          {item.category}
                        </span>

                        <h3>{item.name}</h3>

                        <div className="product-meta">
                          <span>
                            Color: <strong>{item.color}</strong>
                          </span>

                          <span>
                            Size: <strong>{item.size}</strong>
                          </span>
                        </div>

                        <div className="cart-product-actions">
                          <button onClick={() => saveForLater(item)}>
                            <Heart size={15} />
                            Save for later
                          </button>

                          <button
                            className="remove-item"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={15} />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-right">
                        <div className="cart-item-price">
                          <strong>
                            ${(item.price * item.quantity).toFixed(2)}
                          </strong>

                          {item.quantity > 1 && (
                            <span>${item.price.toFixed(2)} each</span>
                          )}

                          {item.oldPrice > item.price && (
                            <del>
                              $
                              {(item.oldPrice * item.quantity).toFixed(2)}
                            </del>
                          )}
                        </div>

                        <div className="quantity-control">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity === 1}
                          >
                            <Minus size={15} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.stock}
                            title={
                              item.quantity >= item.stock
                                ? "Maximum available stock reached"
                                : "Increase quantity"
                            }
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* SAVED ITEMS */}
            {savedItems.length > 0 && (
              <motion.div
                className="saved-items-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Heart size={18} />

                <div>
                  <strong>
                    {savedItems.length} item
                    {savedItems.length > 1 ? "s" : ""} saved for later
                  </strong>

                  <span>
                    You can move saved items back to your cart anytime.
                  </span>

                  <div className="saved-items-list">
                    {savedItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => restoreSavedItem(item)}
                      >
                        Move {item.name} to cart
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TRUST CARDS */}
            <div className="cart-trust-grid">
              <div className="cart-trust-card">
                <ShieldCheck size={22} />
                <div>
                  <strong>Secure Payment</strong>
                  <span>100% protected checkout</span>
                </div>
              </div>

              <div className="cart-trust-card">
                <Truck size={22} />
                <div>
                  <strong>Fast Delivery</strong>
                  <span>Quick & reliable shipping</span>
                </div>
              </div>

              <div className="cart-trust-card">
                <RotateCcw size={22} />
                <div>
                  <strong>Easy Returns</strong>
                  <span>Hassle-free returns</span>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SUMMARY */}
          <aside className="cart-summary-wrapper">
            <motion.div
              className="cart-summary"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="summary-heading">
                <div>
                  <h2>Order Summary</h2>
                  <span>Review your order</span>
                </div>

                <div className="summary-bag">
                  <ShoppingBag size={19} />
                </div>
              </div>

              {/* COUPON */}
              <div className="coupon-section">
                <label>
                  <Tag size={16} />
                  Have a promo code?
                </label>

                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponError("");
                    }}
                    disabled={couponApplied}
                  />

                  <button
                    onClick={applyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? (
                      <>
                        <Check size={15} />
                        Applied
                      </>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>

                {couponApplied && (
                  <motion.div
                    className="coupon-success"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Check size={14} />
                    NEXORA10 applied — 10% discount
                  </motion.div>
                )}

                {couponError && (
                  <span className="coupon-hint">{couponError}</span>
                )}

                {!couponApplied && !couponError && (
                  <span className="coupon-hint">
                    Try <strong>NEXORA10</strong> for 10% off
                  </span>
                )}
              </div>

              {/* PRICING */}
              <div className="summary-pricing">
                <div>
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <div>
                  <span>Product discount</span>
                  <strong className="discount-text">
                    -${productDiscount.toFixed(2)}
                  </strong>
                </div>

                {couponApplied && (
                  <div>
                    <span>Coupon discount</span>
                    <strong className="discount-text">
                      -${couponDiscount.toFixed(2)}
                    </strong>
                  </div>
                )}

                <div>
                  <span>Shipping</span>

                  {shipping === 0 ? (
                    <strong className="free-text">FREE</strong>
                  ) : (
                    <strong>${shipping.toFixed(2)}</strong>
                  )}
                </div>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <div>
                  <strong>Total</strong>
                  <span>Including taxes</span>
                </div>

                <strong>${total.toFixed(2)}</strong>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/shop/checkout")}
              >
                <Lock size={17} />
                Secure Checkout
                <ArrowRight size={19} />
              </button>

              <div className="delivery-estimate">
                <Truck size={20} />

                <div>
                  <strong>Estimated delivery</strong>
                  <span>3–5 business days</span>
                </div>
              </div>

              <div className="payment-methods">
                <span>We accept</span>

                <div className="payment-icons">
                  <div>VISA</div>
                  <div>MC</div>
                  <div>AMEX</div>
                  <div>Pay</div>
                </div>
              </div>
            </motion.div>

            <div className="secure-note">
              <ShieldCheck size={16} />
              <span>
                Your payment information is encrypted and secure.
              </span>
            </div>
          </aside>
        </div>

        {/* RECOMMENDATIONS */}
        <section className="recommendations-section">
          <div className="recommendations-heading">
            <div>
              <span className="recommendation-label">
                <Sparkles size={14} />
                CURATED FOR YOU
              </span>

              <h2>You may also like</h2>

              <p>
                Complete your shopping experience with these picks.
              </p>
            </div>

            <button onClick={() => navigate("/shop/products")}>
              View all
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="recommendation-grid">
            {productsLoading && recommendations.length === 0 ? (
              <p>Loading recommendations...</p>
            ) : recommendations.length === 0 ? (
              <p>No recommendations available right now.</p>
            ) : (
              recommendations.map((product, index) => {
                const productId = getProductId(product);
                const originalPrice = Number(product.price) || 0;
                const discount = Number(product.discount) || 0;
                const sellingPrice =
                  originalPrice - (originalPrice * discount) / 100;

                const isInWishlist = wishlist.some(
                  (item) =>
                    String(item._id || item.id) === productId
                );

                return (
                  <motion.div
                    className="recommendation-card"
                    key={productId}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -7 }}
                  >
                    <div className="recommendation-image">
                      <img src={product.image} alt={product.name} />

                      <button
                        className="recommendation-heart"
                        onClick={() => toggleWishlist(product)}
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          size={16}
                          fill={isInWishlist ? "currentColor" : "none"}
                        />
                      </button>

                      {discount > 0 && (
                        <span className="recommendation-sale">
                          SALE
                        </span>
                      )}
                    </div>

                    <div className="recommendation-info">
                      <span>{product.category || "Collection"}</span>

                      <h3>{product.name}</h3>

                      <div className="recommendation-rating">
                        ★ <strong>{product.rating || "New"}</strong>
                      </div>

                      <div className="recommendation-bottom">
                        <div>
                          <strong>${sellingPrice.toFixed(2)}</strong>

                          {discount > 0 && (
                            <del>${originalPrice.toFixed(2)}</del>
                          )}
                        </div>

                        <button
                          className={
                            addedProducts.includes(productId)
                              ? "product-added"
                              : ""
                          }
                          onClick={() => addRecommended(product)}
                          disabled={
                            addedProducts.includes(productId) ||
                            Number(product.stock) <= 0
                          }
                          aria-label="Add product to cart"
                        >
                          {addedProducts.includes(productId) ? (
                            <Check size={17} />
                          ) : (
                            <Plus size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* BOTTOM BENEFITS */}
        <section className="cart-benefits">
          <div>
            <ShieldCheck size={24} />
            <div>
              <strong>Secure payments</strong>
              <span>
                Protected by industry-standard encryption
              </span>
            </div>
          </div>

          <div>
            <Truck size={24} />
            <div>
              <strong>Fast & reliable delivery</strong>
              <span>Track your order from dispatch to doorstep</span>
            </div>
          </div>

          <div>
            <RotateCcw size={24} />
            <div>
              <strong>30-day returns</strong>
              <span>Shop confidently with easy returns</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cart;