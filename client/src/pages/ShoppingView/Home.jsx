// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   ShoppingCart,
//   Star,
//   Sparkles,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   Headphones,
//   Clock3,
//   Zap,
//   Check,
//   Mail,
//   Send,
// } from "lucide-react";

// import "./Home.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllProducts } from "../../store/admin/product_slice";

// function Home() {

// const dispatch=useDispatch();


// useEffect(()=>{
//   dispatch(fetchAllProducts());    
// },[dispatch])




// // const { products = [], isloading, error } = useSelector((state) => state.adminproduct);
//  const { products = [], isloading, error } = useSelector(
//     (state) => state.adminProduct
//   );



// console.log(products);




//   /* =====================================================
//      HERO SLIDER
//   ===================================================== */

//   const heroSlides = [
//     {
//       id: 1,
//       eyebrow: "NEW SEASON 2026",
//       title: "Everything you want.",
//       highlight: "All in one place.",
//       description:
//         "Discover carefully selected products, exclusive deals and a smarter way to shop with Nexora.",
//       button: "Explore Collection",
//       image:
//         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
//     },
//     {
//       id: 2,
//       eyebrow: "TECH COLLECTION",
//       title: "Upgrade your",
//       highlight: "everyday life.",
//       description:
//         "Explore modern gadgets and technology designed to make every moment better.",
//       button: "Shop Technology",
//       image:
//         "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
//     },
//     {
//       id: 3,
//       eyebrow: "PREMIUM STYLE",
//       title: "Style that speaks",
//       highlight: "for itself.",
//       description:
//         "Discover modern fashion pieces carefully selected for your everyday lifestyle.",
//       button: "Discover Fashion",
//       image:
//         "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
//     },
//   ];

//   const [heroIndex, setHeroIndex] = useState(0);

//   const nextHero = () => {
//     setHeroIndex((prev) => (prev + 1) % heroSlides.length);
//   };

//   const previousHero = () => {
//     setHeroIndex(
//       (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextHero();
//     }, 6000);

//     return () => clearInterval(interval);
//   }, []);

//   /* =====================================================
//      LATEST PRODUCTS SLIDER
//   ===================================================== */

//   const latestProducts = [
//     {
//       id: 1,
//       name: "Nexora Smart Watch X1",
//       category: "Electronics",
//       price: 129,
//       oldPrice: 159,
//       rating: 4.9,
//       reviews: 128,
//       badge: "NEW",
//       image:
//         "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       id: 2,
//       name: "Urban Wireless Headphones",
//       category: "Electronics",
//       price: 89,
//       oldPrice: 119,
//       rating: 4.8,
//       reviews: 94,
//       badge: "POPULAR",
//       image:
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       id: 3,
//       name: "Minimal Leather Backpack",
//       category: "Fashion",
//       price: 74,
//       oldPrice: 99,
//       rating: 4.7,
//       reviews: 72,
//       badge: "TRENDING",
//       image:
//         "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       id: 4,
//       name: "Premium Running Sneakers",
//       category: "Fashion",
//       price: 109,
//       oldPrice: 139,
//       rating: 4.9,
//       reviews: 156,
//       badge: "BEST SELLER",
//       image:
//         "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       id: 5,
//       name: "Modern Desk Lamp",
//       category: "Home",
//       price: 49,
//       oldPrice: 65,
//       rating: 4.6,
//       reviews: 51,
//       badge: "NEW",
//       image:
//         "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       id: 6,
//       name: "Aero Mechanical Keyboard",
//       category: "Electronics",
//       price: 119,
//       oldPrice: 149,
//       rating: 4.8,
//       reviews: 88,
//       badge: "HOT",
//       image:
//         "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=85",
//     },
//   ];

//   const [productIndex, setProductIndex] = useState(0);

//   const visibleProducts = 4;

//   const nextProducts = () => {
//     setProductIndex((prev) => {
//       if (prev >= latestProducts.length - visibleProducts) {
//         return 0;
//       }

//       return prev + 1;
//     });
//   };

//   const previousProducts = () => {
//     setProductIndex((prev) => {
//       if (prev <= 0) {
//         return latestProducts.length - visibleProducts;
//       }

//       return prev - 1;
//     });
//   };

//   /* =====================================================
//      CATEGORIES
//   ===================================================== */

//   const categories = [
//     {
//       name: "Electronics",
//       count: "128 Products",
//       image:
//         "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       name: "Fashion",
//       count: "246 Products",
//       image:
//         "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       name: "Home & Living",
//       count: "184 Products",
//       image:
//         "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       name: "Accessories",
//       count: "96 Products",
//       image:
//         "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=700&q=85",
//     },
//   ];

//   /* =====================================================
//      TRENDING PRODUCTS
//   ===================================================== */

//   const trendingProducts = [
//     {
//       name: "Classic Chronograph",
//       category: "Watches",
//       price: "$149",
//       image:
//         "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       name: "Studio Wireless Pro",
//       category: "Audio",
//       price: "$129",
//       image:
//         "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85",
//     },
//     {
//       name: "Essential Sneakers",
//       category: "Footwear",
//       price: "$95",
//       image:
//         "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85",
//     },
//   ];

//   return (
//     <div className="nexora-home">

//       {/* =================================================
//           HERO
//       ================================================= */}

//       <section className="home-hero">

//         <div className="hero-background-orb hero-orb-one" />
//         <div className="hero-background-orb hero-orb-two" />

//         <div className="home-container hero-container">

//           <div className="hero-content">

//             <AnimatePresence mode="wait">

//               <motion.div
//                 key={heroSlides[heroIndex].id}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: -20,
//                 }}
//                 transition={{
//                   duration: 0.45,
//                 }}
//               >

//                 <div className="hero-eyebrow">
//                   <Sparkles size={14} />
//                   {heroSlides[heroIndex].eyebrow}
//                 </div>

//                 <h1>
//                   {heroSlides[heroIndex].title}
//                   <span>
//                     {heroSlides[heroIndex].highlight}
//                   </span>
//                 </h1>

//                 <p>
//                   {heroSlides[heroIndex].description}
//                 </p>

//                 <div className="hero-buttons">

//                   <button className="primary-home-button">
//                     {heroSlides[heroIndex].button}
//                     <ArrowRight size={17} />
//                   </button>

//                   <button className="secondary-home-button">
//                     View Deals
//                     <ArrowUpRight size={16} />
//                   </button>

//                 </div>

//               </motion.div>

//             </AnimatePresence>


//             {/* HERO CONTROLS */}

//             <div className="hero-controls">

//               <button onClick={previousHero}>
//                 <ChevronLeft size={17} />
//               </button>

//               <div className="hero-dots">

//                 {heroSlides.map((slide, index) => (
//                   <button
//                     key={slide.id}
//                     className={
//                       heroIndex === index
//                         ? "active"
//                         : ""
//                     }
//                     onClick={() => setHeroIndex(index)}
//                   />
//                 ))}

//               </div>

//               <button onClick={nextHero}>
//                 <ChevronRight size={17} />
//               </button>

//             </div>

//           </div>


//           {/* HERO IMAGE */}

//           <div className="hero-visual">

//             <div className="hero-image-glow" />

//             <AnimatePresence mode="wait">

//               <motion.div
//                 key={heroSlides[heroIndex].id}
//                 className="hero-product-image"
//                 initial={{
//                   opacity: 0,
//                   scale: 0.9,
//                   x: 30,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1,
//                   x: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   scale: 1.05,
//                   x: -25,
//                 }}
//                 transition={{
//                   duration: 0.55,
//                 }}
//               >

//                 <img
//                   src={heroSlides[heroIndex].image}
//                   alt={heroSlides[heroIndex].title}
//                 />

//               </motion.div>

//             </AnimatePresence>


//             {/* FLOATING CARDS */}

//             <motion.div
//               className="floating-rating-card"
//               animate={{
//                 y: [0, -8, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//               }}
//             >
//               <div className="floating-stars">
//                 <Star size={11} fill="currentColor" />
//                 <Star size={11} fill="currentColor" />
//                 <Star size={11} fill="currentColor" />
//                 <Star size={11} fill="currentColor" />
//                 <Star size={11} fill="currentColor" />
//               </div>

//               <strong>4.9/5</strong>
//               <span>Customer rating</span>
//             </motion.div>


//             <motion.div
//               className="floating-delivery-card"
//               animate={{
//                 y: [0, 9, 0],
//               }}
//               transition={{
//                 duration: 3.5,
//                 repeat: Infinity,
//               }}
//             >
//               <div>
//                 <Truck size={18} />
//               </div>

//               <span>
//                 <strong>Fast delivery</strong>
//                 <small>Across Bangladesh</small>
//               </span>
//             </motion.div>

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           FEATURE STRIP
//       ================================================= */}

//       <section className="home-feature-strip">

//         <div className="home-container feature-grid">

//           <div className="feature-item">
//             <div className="feature-icon">
//               <Truck size={19} />
//             </div>

//             <div>
//               <strong>Fast & Reliable</strong>
//               <span>Quick delivery</span>
//             </div>
//           </div>


//           <div className="feature-item">
//             <div className="feature-icon">
//               <ShieldCheck size={19} />
//             </div>

//             <div>
//               <strong>Secure Payment</strong>
//               <span>100% protected</span>
//             </div>
//           </div>


//           <div className="feature-item">
//             <div className="feature-icon">
//               <RotateCcw size={19} />
//             </div>

//             <div>
//               <strong>Easy Returns</strong>
//               <span>Simple & stress-free</span>
//             </div>
//           </div>


//           <div className="feature-item">
//             <div className="feature-icon">
//               <Headphones size={19} />
//             </div>

//             <div>
//               <strong>24/7 Support</strong>
//               <span>We're here for you</span>
//             </div>
//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           CATEGORIES
//       ================================================= */}

//       <section className="home-section">

//         <div className="home-container">

//           <div className="section-heading">

//             <div>
//               <span className="section-eyebrow">
//                 EXPLORE COLLECTIONS
//               </span>

//               <h2>
//                 Shop by <span>category.</span>
//               </h2>

//               <p>
//                 Find exactly what you're looking for.
//               </p>
//             </div>

//             <button className="section-link">
//               View all categories
//               <ArrowRight size={15} />
//             </button>

//           </div>


//           <div className="category-grid">

//             {categories.map((category, index) => (

//               <motion.div
//                 key={category.name}
//                 className="category-card"
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: true,
//                 }}
//                 transition={{
//                   duration: 0.4,
//                   delay: index * 0.08,
//                 }}
//               >

//                 <img
//                   src={category.image}
//                   alt={category.name}
//                 />

//                 <div className="category-overlay" />

//                 <div className="category-content">

//                   <span>{category.count}</span>

//                   <h3>{category.name}</h3>

//                   <button>
//                     Explore
//                     <ArrowUpRight size={14} />
//                   </button>

//                 </div>

//               </motion.div>

//             ))}

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           LATEST PRODUCTS
//       ================================================= */}

//       <section className="home-section latest-section">

//         <div className="home-container">

//           <div className="section-heading">

//             <div>

//               <span className="section-eyebrow">
//                 JUST ARRIVED
//               </span>

//               <h2>
//                 Latest <span>products.</span>
//               </h2>

//               <p>
//                 Fresh picks added to Nexora.
//               </p>

//             </div>


//             <div className="product-slider-controls">

//               <button onClick={previousProducts}>
//                 <ChevronLeft size={17} />
//               </button>

//               <button onClick={nextProducts}>
//                 <ChevronRight size={17} />
//               </button>

//             </div>

//           </div>


//           <div className="latest-products-wrapper">

//             <motion.div
//               className="latest-products-track"
//               animate={{
//                 x: `-${productIndex * 25}%`,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 120,
//                 damping: 20,
//               }}
//             >

//               {latestProducts.map((product) => (

//                 <div
//                   className="home-product-card"
//                   key={product.id}
//                 >

//                   <div className="product-image-wrapper">

//                     <img
//                       src={product.image}
//                       alt={product.name}
//                     />

//                     <span className="product-badge">
//                       {product.badge}
//                     </span>


//                     <button className="product-wishlist">
//                       <Heart size={16} />
//                     </button>


//                     <button className="quick-add-button">
//                       <ShoppingCart size={15} />
//                       Quick add
//                     </button>

//                   </div>


//                   <div className="home-product-info">

//                     <span className="product-category">
//                       {product.category}
//                     </span>

//                     <h3>{product.name}</h3>


//                     <div className="product-rating">

//                       <div>
//                         <Star
//                           size={12}
//                           fill="currentColor"
//                         />

//                         <span>{product.rating}</span>
//                       </div>

//                       <small>
//                         ({product.reviews})
//                       </small>

//                     </div>


//                     <div className="product-price">

//                       <strong>
//                         ${product.price}
//                       </strong>

//                       <del>
//                         ${product.oldPrice}
//                       </del>

//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </motion.div>

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           PROMOTIONAL BANNER
//       ================================================= */}

//       <section className="home-promo-section">

//         <div className="home-container">

//           <div className="promo-banner">

//             <div className="promo-glow promo-glow-one" />
//             <div className="promo-glow promo-glow-two" />

//             <div className="promo-content">

//               <div className="promo-tag">
//                 <Zap size={13} />
//                 LIMITED TIME
//               </div>

//               <h2>
//                 Upgrade your everyday.
//                 <span> Save up to 40%.</span>
//               </h2>

//               <p>
//                 Discover hand-picked products at prices
//                 you'll love before they're gone.
//               </p>

//               <button>
//                 Shop the deals
//                 <ArrowRight size={16} />
//               </button>

//             </div>


//             <div className="promo-offer">

//               <div className="offer-circle">

//                 <span>UP TO</span>

//                 <strong>40%</strong>

//                 <small>OFF</small>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           TRENDING
//       ================================================= */}

//       <section className="home-section trending-section">

//         <div className="home-container">

//           <div className="section-heading">

//             <div>

//               <span className="section-eyebrow">
//                 WHAT'S HOT
//               </span>

//               <h2>
//                 Trending <span>right now.</span>
//               </h2>

//               <p>
//                 Products everyone's talking about.
//               </p>

//             </div>

//           </div>


//           <div className="trending-grid">

//             {trendingProducts.map(
//               (product, index) => (

//                 <motion.div
//                   key={product.name}
//                   className="trending-card"
//                   whileHover={{
//                     y: -5,
//                   }}
//                 >

//                   <div className="trending-image">

//                     <img
//                       src={product.image}
//                       alt={product.name}
//                     />

//                     <span>
//                       #{index + 1}
//                     </span>

//                   </div>


//                   <div className="trending-info">

//                     <div>

//                       <span>
//                         {product.category}
//                       </span>

//                       <h3>
//                         {product.name}
//                       </h3>

//                     </div>

//                     <strong>
//                       {product.price}
//                     </strong>

//                   </div>

//                 </motion.div>

//               )
//             )}

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           WHY NEXORA
//       ================================================= */}

//       <section className="why-nexora-section">

//         <div className="home-container">

//           <div className="why-nexora-grid">

//             <div className="why-content">

//               <span className="section-eyebrow">
//                 THE NEXORA DIFFERENCE
//               </span>

//               <h2>
//                 Shopping should feel
//                 <span> effortless.</span>
//               </h2>

//               <p>
//                 We combine thoughtful product selection,
//                 seamless technology and customer-first
//                 service to create a shopping experience
//                 that's genuinely enjoyable.
//               </p>


//               <div className="why-check-list">

//                 <div>
//                   <Check size={15} />
//                   <span>Curated quality products</span>
//                 </div>

//                 <div>
//                   <Check size={15} />
//                   <span>Transparent pricing</span>
//                 </div>

//                 <div>
//                   <Check size={15} />
//                   <span>Fast and reliable delivery</span>
//                 </div>

//                 <div>
//                   <Check size={15} />
//                   <span>Friendly customer support</span>
//                 </div>

//               </div>


//               <button className="primary-home-button">
//                 Learn more
//                 <ArrowRight size={16} />
//               </button>

//             </div>


//             <div className="why-visual">

//               <div className="why-main-card">

//                 <div className="why-card-icon">
//                   <Sparkles size={23} />
//                 </div>

//                 <strong>
//                   Designed for you.
//                 </strong>

//                 <span>
//                   A better way to discover
//                   products you'll love.
//                 </span>

//               </div>


//               <div className="why-floating-card">

//                 <div>
//                   <Star
//                     size={15}
//                     fill="currentColor"
//                   />
//                 </div>

//                 <span>
//                   <strong>4.9/5</strong>
//                   <small>from our customers</small>
//                 </span>

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =================================================
//           NEWSLETTER
//       ================================================= */}

//       <section className="newsletter-section">

//         <div className="home-container">

//           <div className="newsletter-card">

//             <div className="newsletter-icon">
//               <Mail size={20} />
//             </div>

//             <div className="newsletter-content">

//               <span>
//                 STAY IN THE LOOP
//               </span>

//               <h2>
//                 Get the latest from Nexora.
//               </h2>

//               <p>
//                 New arrivals, exclusive deals and
//                 shopping inspiration — straight to your inbox.
//               </p>

//             </div>


//             <form className="newsletter-form">

//               <div>
//                 <Mail size={16} />

//                 <input
//                   type="email"
//                   placeholder="Your email address"
//                 />
//               </div>

//               <button type="submit">
//                 Subscribe
//                 <Send size={14} />
//               </button>

//             </form>

//           </div>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default Home;





import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Zap,
  Check,
  Mail,
  Send,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../store/admin/product_slice";
import "./Home.css";

const CART_KEY = "nexoraCart";
const WISHLIST_KEY = "nexoraWishlist";
const VISIBLE_PRODUCTS = 4;

const categoryImages = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=85",
  Fashion:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=85",
  Home:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85",
  Beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=85",
  Sports:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=85",
  Books:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=85",
  Other:
    "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=85",
};

const readStorage = (key, fallback = []) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminProductState = useSelector((state) => state.adminProduct || {});
  const products = adminProductState.products || [];
  const isloading =
    adminProductState.isloading ??
    adminProductState.productsLoading ??
    adminProductState.isLoading ??
    false;
  const error = adminProductState.error ?? null;

  const [heroIndex, setHeroIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const heroSlides = [
    {
      id: 1,
      eyebrow: "NEW SEASON 2026",
      title: "Everything you want.",
      highlight: "All in one place.",
      description:
        "Discover carefully selected products, exclusive deals and a smarter way to shop with Nexora.",
      button: "Explore Collection",
      category: "",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 2,
      eyebrow: "TECH COLLECTION",
      title: "Upgrade your",
      highlight: "everyday life.",
      description:
        "Explore modern gadgets and technology designed to make every moment better.",
      button: "Shop Technology",
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: 3,
      eyebrow: "PREMIUM STYLE",
      title: "Style that speaks",
      highlight: "for itself.",
      description:
        "Discover modern fashion pieces carefully selected for your everyday lifestyle.",
      button: "Discover Fashion",
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
    },
  ];

  const availableProducts = useMemo(
    () =>
      Array.isArray(products)
        ? products.filter(
            (product) =>
              product &&
              product._id &&
              Number(product.stock) > 0 &&
              product.status !== "Out of Stock"
          )
        : [],
    [products]
  );

  const latestProducts = useMemo(
    () =>
      [...availableProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        )
        .slice(0, 12),
    [availableProducts]
  );

  const categories = useMemo(() => {
    const counts = availableProducts.reduce((result, product) => {
      const category = product.category || "Other";
      result[category] = (result[category] || 0) + 1;
      return result;
    }, {});

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count: `${count} ${count === 1 ? "Product" : "Products"}`,
      image:
        categoryImages[name] ||
        categoryImages.Other,
    }));
  }, [availableProducts]);

  const trendingProducts = useMemo(
    () =>
      [...availableProducts]
        .sort(
          (a, b) =>
            Number(b.sold || 0) - Number(a.sold || 0) ||
            Number(b.rating || 0) - Number(a.rating || 0)
        )
        .slice(0, 3),
    [availableProducts]
  );

  const maxProductIndex = Math.max(
    0,
    latestProducts.length - VISIBLE_PRODUCTS
  );

  useEffect(() => {
    setProductIndex((current) => Math.min(current, maxProductIndex));
  }, [maxProductIndex]);

  const nextHero = () =>
    setHeroIndex((current) => (current + 1) % heroSlides.length);

  const previousHero = () =>
    setHeroIndex(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length
    );

  useEffect(() => {
    const interval = window.setInterval(nextHero, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const nextProducts = () =>
    setProductIndex((current) =>
      current >= maxProductIndex ? 0 : current + 1
    );

  const previousProducts = () =>
    setProductIndex((current) =>
      current <= 0 ? maxProductIndex : current - 1
    );

  const openListing = (category = "") => {
    navigate(
      category
        ? `/shop/products?category=${encodeURIComponent(category)}`
        : "/shop/products"
    );
  };

  const toggleWishlist = (product) => {
    const productId = String(product._id);
    setWishlist((current) => {
      const exists = current.some(
        (item) => String(item._id || item.id) === productId
      );

      return exists
        ? current.filter(
            (item) => String(item._id || item.id) !== productId
          )
        : [...current, product];
    });
  };

  const addToCart = (product) => {
    const cart = readStorage(CART_KEY);
    const productId = String(product._id);
    const existingItem = cart.find(
      (item) => String(item._id || item.id) === productId
    );

    const updatedCart = existingItem
      ? cart.map((item) =>
          String(item._id || item.id) === productId
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, id: product._id, quantity: 1 }];

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    navigate("/shop/cart");
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const email = newsletterEmail.trim();

    if (!email) {
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    // Connect this handler to your newsletter API when the backend endpoint is ready.
    setNewsletterMessage("Thanks for your interest! Newsletter signup will be available soon.");
    setNewsletterEmail("");
  };

  const formatPrice = (price) =>
    `$${Number(price || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getDiscountedPrice = (product) => {
    const price = Number(product.price || 0);
    const discount = Number(product.discount || 0);
    return price - (price * discount) / 100;
  };

  const getWishlistActive = (product) =>
    wishlist.some(
      (item) => String(item._id || item.id) === String(product._id)
    );

  return (
    <div className="nexora-home">
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-background-orb hero-orb-one" />
        <div className="hero-background-orb hero-orb-two" />

        <div className="home-container hero-container">
          <div className="hero-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[heroIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <div className="hero-eyebrow">
                  <Sparkles size={14} />
                  {heroSlides[heroIndex].eyebrow}
                </div>

                <h1>
                  {heroSlides[heroIndex].title}
                  <span>{heroSlides[heroIndex].highlight}</span>
                </h1>

                <p>{heroSlides[heroIndex].description}</p>

                <div className="hero-buttons">
                  <button
                    className="primary-home-button"
                    onClick={() => openListing(heroSlides[heroIndex].category)}
                  >
                    {heroSlides[heroIndex].button}
                    <ArrowRight size={17} />
                  </button>

                  <button
                    className="secondary-home-button"
                    onClick={() => openListing()}
                  >
                    View Deals
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="hero-controls">
              <button onClick={previousHero} aria-label="Previous slide">
                <ChevronLeft size={17} />
              </button>

              <div className="hero-dots">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    aria-label={`Go to slide ${index + 1}`}
                    className={heroIndex === index ? "active" : ""}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>

              <button onClick={nextHero} aria-label="Next slide">
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-glow" />

            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[heroIndex].id}
                className="hero-product-image"
                initial={{ opacity: 0, scale: 0.9, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -25 }}
                transition={{ duration: 0.55 }}
              >
                <img
                  src={heroSlides[heroIndex].image}
                  alt={heroSlides[heroIndex].title}
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="floating-rating-card"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="floating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={11} fill="currentColor" />
                ))}
              </div>
              <strong>4.9/5</strong>
              <span>Customer rating</span>
            </motion.div>

            <motion.div
              className="floating-delivery-card"
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <div>
                <Truck size={18} />
              </div>
              <span>
                <strong>Fast delivery</strong>
                <small>Across Bangladesh</small>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="home-feature-strip">
        <div className="home-container feature-grid">
          <div className="feature-item">
            <div className="feature-icon"><Truck size={19} /></div>
            <div><strong>Fast & Reliable</strong><span>Quick delivery</span></div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><ShieldCheck size={19} /></div>
            <div><strong>Secure Payment</strong><span>100% protected</span></div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><RotateCcw size={19} /></div>
            <div><strong>Easy Returns</strong><span>Simple & stress-free</span></div>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><Headphones size={19} /></div>
            <div><strong>24/7 Support</strong><span>We're here for you</span></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section">
        <div className="home-container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">EXPLORE COLLECTIONS</span>
              <h2>Shop by <span>category.</span></h2>
              <p>Find exactly what you're looking for.</p>
            </div>
            <button className="section-link" onClick={() => openListing()}>
              View all categories <ArrowRight size={15} />
            </button>
          </div>

          {isloading ? (
            <div className="empty-products">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="empty-products">No categories available yet.</div>
          ) : (
            <div className="category-grid">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="category-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => openListing(category.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") openListing(category.name);
                  }}
                >
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay" />
                  <div className="category-content">
                    <span>{category.count}</span>
                    <h3>{category.name}</h3>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openListing(category.name);
                      }}
                    >
                      Explore <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LATEST PRODUCTS */}
      <section className="home-section latest-section">
        <div className="home-container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">JUST ARRIVED</span>
              <h2>Latest <span>products.</span></h2>
              <p>Fresh picks added to Nexora.</p>
            </div>

            <div className="product-slider-controls">
              <button
                onClick={previousProducts}
                disabled={latestProducts.length <= VISIBLE_PRODUCTS}
                aria-label="Previous products"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={nextProducts}
                disabled={latestProducts.length <= VISIBLE_PRODUCTS}
                aria-label="Next products"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {isloading ? (
            <div className="empty-products">Loading products...</div>
          ) : error ? (
            <div className="empty-products">Unable to load products. Please try again later.</div>
          ) : latestProducts.length === 0 ? (
            <div className="empty-products">No products are available right now.</div>
          ) : (
            <div className="latest-products-wrapper">
              <motion.div
                className="latest-products-track"
                animate={{ x: `-${productIndex * 25}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                {latestProducts.map((product) => {
                  const discountedPrice = getDiscountedPrice(product);
                  const hasDiscount = Number(product.discount) > 0;

                  return (
                    <div className="home-product-card" key={product._id}>
                      <div className="product-image-wrapper">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://placehold.co/600x600?text=Product";
                          }}
                        />

                        {product.badges && (
                          <span className="product-badge">{product.badges}</span>
                        )}

                        <button
                          className="product-wishlist"
                          aria-label={
                            getWishlistActive(product)
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          onClick={() => toggleWishlist(product)}
                        >
                          <Heart
                            size={16}
                            fill={getWishlistActive(product) ? "currentColor" : "none"}
                          />
                        </button>

                        <button
                          className="quick-add-button"
                          disabled={Number(product.stock) <= 0}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart size={15} />
                          Quick add
                        </button>
                      </div>

                      <div className="home-product-info">
                        <span className="product-category">{product.category}</span>
                        <h3>{product.name}</h3>

                        <div className="product-rating">
                          <div>
                            <Star size={12} fill="currentColor" />
                            <span>{Number(product.rating || 0).toFixed(1)}</span>
                          </div>
                          <small>({Number(product.reviewCount || 0)})</small>
                        </div>

                        <div className="product-price">
                          <strong>{formatPrice(discountedPrice)}</strong>
                          {hasDiscount && <del>{formatPrice(product.price)}</del>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="home-promo-section">
        <div className="home-container">
          <div className="promo-banner">
            <div className="promo-glow promo-glow-one" />
            <div className="promo-glow promo-glow-two" />
            <div className="promo-content">
              <div className="promo-tag"><Zap size={13} /> LIMITED TIME</div>
              <h2>Upgrade your everyday.<span> Save on selected products.</span></h2>
              <p>Discover hand-picked products at prices you'll love before they're gone.</p>
              <button onClick={() => openListing()}>
                Shop the deals <ArrowRight size={16} />
              </button>
            </div>
            <div className="promo-offer">
              <div className="offer-circle">
                <span>GREAT</span>
                <strong>DEALS</strong>
                <small>INSIDE</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="home-section trending-section">
        <div className="home-container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">WHAT'S HOT</span>
              <h2>Trending <span>right now.</span></h2>
              <p>Popular products based on sales and ratings.</p>
            </div>
          </div>

          {trendingProducts.length === 0 ? (
            <div className="empty-products">Popular products will appear here.</div>
          ) : (
            <div className="trending-grid">
              {trendingProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="trending-card"
                  whileHover={{ y: -5 }}
                  onClick={() => openListing(product.category)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="trending-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span>#{index + 1}</span>
                  </div>
                  <div className="trending-info">
                    <div>
                      <span>{product.category}</span>
                      <h3>{product.name}</h3>
                    </div>
                    <strong>{formatPrice(getDiscountedPrice(product))}</strong>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY NEXORA */}
      <section className="why-nexora-section">
        <div className="home-container">
          <div className="why-nexora-grid">
            <div className="why-content">
              <span className="section-eyebrow">THE NEXORA DIFFERENCE</span>
              <h2>Shopping should feel <span>effortless.</span></h2>
              <p>
                We combine thoughtful product selection, seamless technology and
                customer-first service to create a shopping experience that's
                genuinely enjoyable.
              </p>

              <div className="why-check-list">
                <div><Check size={15} /><span>Curated quality products</span></div>
                <div><Check size={15} /><span>Transparent pricing</span></div>
                <div><Check size={15} /><span>Fast and reliable delivery</span></div>
                <div><Check size={15} /><span>Friendly customer support</span></div>
              </div>

              <button className="primary-home-button" onClick={() => openListing()}>
                Explore products <ArrowRight size={16} />
              </button>
            </div>

            <div className="why-visual">
              <div className="why-main-card">
                <div className="why-card-icon"><Sparkles size={23} /></div>
                <strong>Designed for you.</strong>
                <span>A better way to discover products you'll love.</span>
              </div>
              <div className="why-floating-card">
                <div><Star size={15} fill="currentColor" /></div>
                <span><strong>Discover</strong><small>products you'll love</small></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="home-container">
          <div className="newsletter-card">
            <div className="newsletter-icon"><Mail size={20} /></div>
            <div className="newsletter-content">
              <span>STAY IN THE LOOP</span>
              <h2>Get the latest from Nexora.</h2>
              <p>New arrivals, exclusive deals and shopping inspiration — straight to your inbox.</p>
              {newsletterMessage && <small role="status">{newsletterMessage}</small>}
            </div>

            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div>
                <Mail size={16} />
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  required
                />
              </div>
              <button type="submit">
                Subscribe <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;















