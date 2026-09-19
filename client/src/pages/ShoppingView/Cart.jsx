import React, { useMemo, useState } from "react";
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
import "./Cart.css";

const initialCartItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    oldPrice: 159.99,
    quantity: 1,
    color: "Midnight Black",
    size: "Standard",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
  },
  {
    id: 2,
    name: "Minimal Premium Sneakers",
    category: "Fashion",
    price: 89.99,
    oldPrice: 119.99,
    quantity: 2,
    color: "Cloud White",
    size: "42",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 149.99,
    oldPrice: 189.99,
    quantity: 1,
    color: "Space Gray",
    size: "44mm",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85",
  },
];

const recommendations = [
  {
    id: 101,
    name: "Premium Backpack",
    price: 69.99,
    oldPrice: 89.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=85",
  },
  {
    id: 102,
    name: "Wireless Speaker",
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=85",
  },
  {
    id: 103,
    name: "Classic Sunglasses",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=85",
  },
  {
    id: 104,
    name: "Modern Smart Watch",
    price: 119.99,
    oldPrice: 149.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=85",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const saveForLater = (item) => {
    setSavedItems((items) => [...items, item]);
    setCartItems((items) => items.filter((cartItem) => cartItem.id !== item.id));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NEXORA10") {
      setCouponApplied(true);
    }
  };

  const addRecommended = (product) => {
    setAddedProducts((items) => [...items, product.id]);

    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      updateQuantity(product.id, 1);
    } else {
      setCartItems((items) => [
        ...items,
        {
          ...product,
          category: "Recommended",
          quantity: 1,
          color: "Default",
          size: "Standard",
        },
      ]);
    }

    setTimeout(() => {
      setAddedProducts((items) =>
        items.filter((id) => id !== product.id)
      );
    }, 1500);
  };

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

  const productDiscount = originalTotal - subtotal;
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;

  const shipping = subtotal >= 150 ? 0 : 9.99;

  const total = subtotal - couponDiscount + shipping;

  const freeShippingProgress = Math.min((subtotal / 150) * 100, 100);
  const remainingForFreeShipping = Math.max(150 - subtotal, 0);

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
            Looks like you haven't added anything yet. Discover something
            amazing and start shopping with Nexora.
          </p>

          <button className="continue-shopping-btn">
            Start Shopping
            <ArrowRight size={19} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Background */}
      <div className="cart-background">
        <div className="cart-orb cart-orb-one" />
        <div className="cart-orb cart-orb-two" />
        <div className="cart-orb cart-orb-three" />
      </div>

      <main className="cart-container">

        {/* ================= HEADER ================= */}
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

        {/* ================= FREE SHIPPING ================= */}
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

            <span>
              ${Math.min(subtotal, 150).toFixed(0)} / $150
            </span>
          </div>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="cart-layout">

          {/* ================= LEFT ================= */}
          <section className="cart-products-section">

            <div className="cart-section-heading">
              <div>
                <h2>Cart Items</h2>
                <span>{itemCount} products</span>
              </div>

              <button
                className="continue-link"
                onClick={() => window.history.back()}
              >
                Continue Shopping
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="cart-items-list">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
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
                    {/* Image */}
                    <div className="cart-product-image">
                      <img src={item.image} alt={item.name} />

                      <span className="item-discount">
                        {Math.round(
                          ((item.oldPrice - item.price) /
                            item.oldPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>

                    {/* Details */}
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
                        <button
                          onClick={() => saveForLater(item)}
                        >
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

                    {/* Price + Quantity */}
                    <div className="cart-item-right">
                      <div className="cart-item-price">
                        <strong>
                          ${(item.price * item.quantity).toFixed(2)}
                        </strong>

                        {item.quantity > 1 && (
                          <span>
                            ${item.price.toFixed(2)} each
                          </span>
                        )}

                        <del>
                          ${(item.oldPrice * item.quantity).toFixed(2)}
                        </del>
                      </div>

                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, -1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, 1)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Saved */}
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
                </div>
              </motion.div>
            )}

            {/* Trust cards */}
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

          {/* ================= RIGHT SUMMARY ================= */}
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

              {/* Coupon */}
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
                    onChange={(e) => setCoupon(e.target.value)}
                  />

                  <button onClick={applyCoupon}>
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

                {!couponApplied && (
                  <span className="coupon-hint">
                    Try <strong>NEXORA10</strong> for 10% off
                  </span>
                )}
              </div>

              {/* Pricing */}
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

              <button className="checkout-btn">
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
              <span>Your payment information is encrypted and secure.</span>
            </div>
          </aside>
        </div>

        {/* ================= RECOMMENDATIONS ================= */}
        <section className="recommendations-section">
          <div className="recommendations-heading">
            <div>
              <span className="recommendation-label">
                <Sparkles size={14} />
                CURATED FOR YOU
              </span>

              <h2>You may also like</h2>

              <p>Complete your shopping experience with these picks.</p>
            </div>

            <button>
              View all
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="recommendation-grid">
            {recommendations.map((product, index) => (
              <motion.div
                className="recommendation-card"
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -7 }}
              >
                <div className="recommendation-image">
                  <img src={product.image} alt={product.name} />

                  <button className="recommendation-heart">
                    <Heart size={16} />
                  </button>

                  <span className="recommendation-sale">
                    SALE
                  </span>
                </div>

                <div className="recommendation-info">
                  <span>Premium Collection</span>

                  <h3>{product.name}</h3>

                  <div className="recommendation-rating">
                    ★ <strong>{product.rating}</strong>
                  </div>

                  <div className="recommendation-bottom">
                    <div>
                      <strong>${product.price}</strong>
                      <del>${product.oldPrice}</del>
                    </div>

                    <button
                      className={
                        addedProducts.includes(product.id)
                          ? "product-added"
                          : ""
                      }
                      onClick={() => addRecommended(product)}
                    >
                      {addedProducts.includes(product.id) ? (
                        <Check size={17} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= BOTTOM BENEFITS ================= */}
        <section className="cart-benefits">
          <div>
            <ShieldCheck size={24} />
            <div>
              <strong>Secure payments</strong>
              <span>Protected by industry-standard encryption</span>
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