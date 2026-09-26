import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Edit3,
  Lock,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Trash2,
  Truck,
  User,
  WalletCards,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./Checkout.css";

const initialItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    oldPrice: 159.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=85",
  },
  {
    id: 2,
    name: "Minimal Premium Sneakers",
    category: "Fashion",
    price: 89.99,
    oldPrice: 119.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=85",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 149.99,
    oldPrice: 189.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=85",
  },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Bangladesh",
};

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "3–5 business days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "1–2 business days",
    price: 14.99,
    icon: Package,
  },
];

function Checkout() {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  const productDiscount = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + (item.oldPrice - item.price) * item.quantity,
      0
    );
  }, [items]);

  const selectedShipping = shippingMethods.find(
    (method) => method.id === shippingMethod
  );

  const shippingCost = selectedShipping?.price || 0;

  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;

  const tax = (subtotal - couponDiscount) * 0.05;

  const total = subtotal - couponDiscount + shippingCost + tax;

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* =====================================================
     FORM HANDLERS
  ===================================================== */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     QUANTITY
  ===================================================== */

  const updateQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems
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
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  /* =====================================================
     COUPON
  ===================================================== */

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NEXORA10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (paymentMethod === "card") {
      if (!cardInfo.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      }

      if (!cardInfo.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      }

      if (!cardInfo.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      }

      if (!cardInfo.name.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const valid = validateForm();

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setPlacingOrder(true);

    setTimeout(() => {
      setPlacingOrder(false);
      setOrderPlaced(true);
    }, 1800);
  };

  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-background">
          <div className="checkout-orb checkout-orb-one" />
          <div className="checkout-orb checkout-orb-two" />
          <div className="checkout-orb checkout-orb-three" />
        </div>

        <motion.div
          className="order-success"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 180,
            }}
          >
            <CheckCircle2 size={48} />
          </motion.div>

          <span className="success-badge">
            <Check size={13} />
            ORDER CONFIRMED
          </span>

          <h1>Thank you for your order!</h1>

          <p>
            Your order has been successfully placed. We've sent the
            order confirmation to <strong>{form.email}</strong>.
          </p>

          <div className="success-order-number">
            <span>Order number</span>
            <strong>
              NEX-{Math.floor(100000 + Math.random() * 900000)}
            </strong>
          </div>

          <div className="success-info-grid">
            <div>
              <Truck size={19} />
              <div>
                <strong>Delivery</strong>
                <span>
                  {shippingMethod === "express"
                    ? "1–2 business days"
                    : "3–5 business days"}
                </span>
              </div>
            </div>

            <div>
              <CreditCard size={19} />
              <div>
                <strong>Payment</strong>
                <span>
                  {paymentMethod === "card"
                    ? "Credit / Debit Card"
                    : paymentMethod === "mobile"
                    ? "Mobile Payment"
                    : "Cash on Delivery"}
                </span>
              </div>
            </div>
          </div>

          <button
            className="success-home-btn"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <div className="checkout-page">
      {/* Background */}
      <div className="checkout-background">
        <div className="checkout-orb checkout-orb-one" />
        <div className="checkout-orb checkout-orb-two" />
        <div className="checkout-orb checkout-orb-three" />
      </div>

      <main className="checkout-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.header
          className="checkout-header"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="checkout-brand">
            <div className="checkout-brand-icon">
              <ShoppingBag size={22} />
            </div>

            <div>
              <strong>Nexora</strong>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div className="checkout-security">
            <Lock size={16} />
            <span>Secure & encrypted checkout</span>
          </div>
        </motion.header>

        {/* =================================================
            CHECKOUT STEPS
        ================================================= */}

        <motion.div
          className="checkout-steps"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="checkout-step active">
            <span>1</span>
            <div>
              <strong>Information</strong>
              <small>Delivery details</small>
            </div>
          </div>

          <div className="checkout-step-line active-line" />

          <div className="checkout-step active">
            <span>2</span>
            <div>
              <strong>Shipping</strong>
              <small>Delivery method</small>
            </div>
          </div>

          <div className="checkout-step-line active-line" />

          <div className="checkout-step active">
            <span>3</span>
            <div>
              <strong>Payment</strong>
              <small>Secure payment</small>
            </div>
          </div>
        </motion.div>

        {/* Mobile order summary */}
        <button
          className="mobile-summary-toggle"
          onClick={() =>
            setShowOrderSummary(!showOrderSummary)
          }
        >
          <span>
            <ShoppingBag size={17} />
            Show order summary
          </span>

          <strong>${total.toFixed(2)}</strong>

          <ChevronDown
            size={18}
            className={
              showOrderSummary ? "rotate-chevron" : ""
            }
          />
        </button>

        <div className="checkout-layout">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="checkout-main">

            {/* Contact */}
            <motion.section
              className="checkout-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="checkout-card-header">
                <div className="section-number">01</div>

                <div>
                  <h2>Contact Information</h2>
                  <p>Where should we send your order updates?</p>
                </div>
              </div>

              <div className="checkout-form">

                <div className="form-row">

                  <FormInput
                    label="First name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    icon={<User size={16} />}
                    error={errors.firstName}
                  />

                  <FormInput
                    label="Last name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    icon={<User size={16} />}
                    error={errors.lastName}
                  />

                </div>

                <div className="form-row">

                  <FormInput
                    label="Email address"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    type="email"
                    error={errors.email}
                  />

                  <FormInput
                    label="Phone number"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="+880 1XXX-XXXXXX"
                    icon={<Phone size={16} />}
                    error={errors.phone}
                  />

                </div>
              </div>
            </motion.section>

            {/* Address */}
            <motion.section
              className="checkout-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              <div className="checkout-card-header">
                <div className="section-number">02</div>

                <div>
                  <h2>Shipping Address</h2>
                  <p>Where would you like your order delivered?</p>
                </div>
              </div>

              <div className="checkout-form">

                <FormInput
                  label="Street address"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="House number and street name"
                  icon={<MapPin size={16} />}
                  error={errors.address}
                />

                <FormInput
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleInputChange}
                  placeholder="Apartment, floor, unit..."
                />

                <div className="form-row three-columns">

                  <FormInput
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    placeholder="Dhaka"
                    error={errors.city}
                  />

                  <FormInput
                    label="State / Division"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    placeholder="Dhaka"
                  />

                  <FormInput
                    label="Postal code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleInputChange}
                    placeholder="1200"
                    error={errors.postalCode}
                  />

                </div>

                <div className="checkout-input-group">
                  <label>Country</label>

                  <div className="select-wrapper">
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleInputChange}
                    >
                      <option>Bangladesh</option>
                      <option>India</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>

                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Shipping */}
            <motion.section
              className="checkout-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="checkout-card-header">
                <div className="section-number">03</div>

                <div>
                  <h2>Delivery Method</h2>
                  <p>Choose how you'd like to receive your order.</p>
                </div>
              </div>

              <div className="shipping-options">

                {shippingMethods.map((method) => {
                  const Icon = method.icon;
                  const selected =
                    shippingMethod === method.id;

                  return (
                    <button
                      type="button"
                      key={method.id}
                      className={`shipping-option ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() =>
                        setShippingMethod(method.id)
                      }
                    >
                      <div className="shipping-option-radio">
                        {selected && <div />}
                      </div>

                      <div className="shipping-option-icon">
                        <Icon size={20} />
                      </div>

                      <div className="shipping-option-info">
                        <strong>{method.name}</strong>
                        <span>{method.description}</span>
                      </div>

                      <div className="shipping-option-price">
                        {method.price === 0
                          ? "FREE"
                          : `+$${method.price.toFixed(2)}`}
                      </div>
                    </button>
                  );
                })}

              </div>
            </motion.section>

            {/* Payment */}
            <motion.section
              className="checkout-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="checkout-card-header">
                <div className="section-number">04</div>

                <div>
                  <h2>Payment Method</h2>
                  <p>Your payment information is protected.</p>
                </div>
              </div>

              <div className="payment-options">

                {/* Card */}
                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "card"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="payment-radio">
                    {paymentMethod === "card" && <div />}
                  </div>

                  <CreditCard size={21} />

                  <div>
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, Mastercard, Amex</span>
                  </div>
                </button>

                {/* Mobile */}
                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "mobile"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("mobile")
                  }
                >
                  <div className="payment-radio">
                    {paymentMethod === "mobile" && <div />}
                  </div>

                  <Smartphone size={21} />

                  <div>
                    <strong>Mobile Payment</strong>
                    <span>Mobile wallet payment</span>
                  </div>
                </button>

                {/* COD */}
                <button
                  type="button"
                  className={`payment-option ${
                    paymentMethod === "cod"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="payment-radio">
                    {paymentMethod === "cod" && <div />}
                  </div>

                  <WalletCards size={21} />

                  <div>
                    <strong>Cash on Delivery</strong>
                    <span>Pay when your order arrives</span>
                  </div>
                </button>

              </div>

              {/* Card form */}
              <AnimatePresence mode="wait">
                {paymentMethod === "card" && (
                  <motion.div
                    className="card-payment-form"
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                  >
                    <FormInput
                      label="Cardholder name"
                      name="name"
                      value={cardInfo.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      error={errors.cardName}
                    />

                    <FormInput
                      label="Card number"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      error={errors.cardNumber}
                    />

                    <div className="form-row">

                      <FormInput
                        label="Expiry date"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={handleCardChange}
                        placeholder="MM / YY"
                        error={errors.expiry}
                      />

                      <FormInput
                        label="CVV"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        type="password"
                        error={errors.cvv}
                      />

                    </div>
                  </motion.div>
                )}

                {paymentMethod === "mobile" && (
                  <motion.div
                    className="alternative-payment"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Smartphone size={24} />

                    <div>
                      <strong>Mobile payment</strong>
                      <span>
                        You'll be redirected to your mobile
                        payment provider after placing the order.
                      </span>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "cod" && (
                  <motion.div
                    className="alternative-payment"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <WalletCards size={24} />

                    <div>
                      <strong>Cash on Delivery</strong>
                      <span>
                        Pay for your order when it is delivered
                        to your address.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Security */}
            <div className="checkout-security-card">
              <ShieldCheck size={24} />

              <div>
                <strong>Your information is secure</strong>

                <span>
                  Nexora uses industry-standard encryption to
                  protect your personal and payment information.
                </span>
              </div>
            </div>

          </section>

          {/* =================================================
              RIGHT SIDE ORDER SUMMARY
          ================================================= */}

          <aside
            className={`checkout-sidebar ${
              showOrderSummary ? "mobile-summary-open" : ""
            }`}
          >
            <div className="checkout-summary">

              <div className="summary-header">
                <div>
                  <h2>Order Summary</h2>
                  <span>{itemCount} items</span>
                </div>

                <ShoppingBag size={20} />
              </div>

              {/* Items */}

              <div className="checkout-items">

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      className="checkout-item"
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="checkout-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <span>{item.quantity}</span>
                      </div>

                      <div className="checkout-item-info">
                        <h3>{item.name}</h3>

                        <span>{item.category}</span>

                        <div className="checkout-item-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <strong>{item.quantity}</strong>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            +
                          </button>

                          <button
                            className="checkout-remove"
                            onClick={() =>
                              removeItem(item.id)
                            }
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <strong className="checkout-item-price">
                        $
                        {(item.price * item.quantity).toFixed(
                          2
                        )}
                      </strong>
                    </motion.div>
                  ))}
                </AnimatePresence>

              </div>

              {/* Coupon */}

              <div className="checkout-coupon">
                <div className="coupon-title">
                  <TagIcon />
                  Promo code
                </div>

                <div className="checkout-coupon-input">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                  />

                  <button onClick={applyCoupon}>
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>

                {couponApplied && (
                  <span className="coupon-applied">
                    <Check size={12} />
                    NEXORA10 — 10% discount applied
                  </span>
                )}

                {!couponApplied && (
                  <span className="checkout-coupon-hint">
                    Try <strong>NEXORA10</strong>
                  </span>
                )}
              </div>

              {/* Pricing */}

              <div className="checkout-pricing">

                <div>
                  <span>Subtotal</span>
                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <div>
                  <span>Product discount</span>
                  <strong className="green">
                    -${productDiscount.toFixed(2)}
                  </strong>
                </div>

                {couponApplied && (
                  <div>
                    <span>Coupon discount</span>
                    <strong className="green">
                      -${couponDiscount.toFixed(2)}
                    </strong>
                  </div>
                )}

                <div>
                  <span>Shipping</span>
                  <strong>
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </strong>
                </div>

                <div>
                  <span>Estimated tax</span>
                  <strong>${tax.toFixed(2)}</strong>
                </div>

              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-total">
                <div>
                  <strong>Total</strong>
                  <span>Including estimated tax</span>
                </div>

                <strong>${total.toFixed(2)}</strong>
              </div>

              {/* Place order */}

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={placingOrder || items.length === 0}
              >
                {placingOrder ? (
                  <>
                    <span className="checkout-spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Place Order
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="terms-text">
                By placing your order, you agree to our Terms
                of Service and Privacy Policy.
              </p>

              {/* Guarantee */}

              <div className="checkout-guarantee">

                <div>
                  <ShieldCheck size={18} />

                  <span>
                    Secure payment
                  </span>
                </div>

                <div>
                  <Truck size={18} />

                  <span>
                    Fast delivery
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />

                  <span>
                    Easy returns
                  </span>
                </div>

              </div>

            </div>
          </aside>
        </div>

        <button
          className="back-to-cart"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Back to cart
        </button>

      </main>
    </div>
  );
}

/* =========================================================
   FORM INPUT COMPONENT
========================================================= */

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  error,
}) {
  return (
    <div className="checkout-input-group">
      <label>{label}</label>

      <div
        className={`checkout-input-wrapper ${
          error ? "input-error" : ""
        }`}
      >
        {icon}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>

      {error && (
        <span className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}

/* =========================================================
   SMALL TAG ICON
========================================================= */

function TagIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.83 0l3.35-3.35a2 2 0 0 0 0-2.83Z" />
      <circle cx="7.5" cy="7.5" r=".5" />
    </svg>
  );
}

export default Checkout; 