// // import React from 'react'
// // import { Outlet } from 'react-router-dom'

// // function AuthLayout() {
// //   return (
// //     <div>
// //       <div>skdhfusdf</div>
// //       <Outlet/>
// //     </div>
// //   )
// // }

// // export default AuthLayout





// import React from "react";
// import { Outlet } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ShoppingBag,
//   ShieldCheck,
//   Truck,
//   RotateCcw,
//   Heart,
//   Sparkles,
//   LockKeyhole,
// } from "lucide-react";
// import "./AuthLayout.css";

// function AuthLayout() {
//   return (
//     <div className="auth-page">

//       {/* Animated background */}
//       <div className="background-glow glow-one"></div>
//       <div className="background-glow glow-two"></div>

//       <div className="auth-container">

//         {/* ================= LEFT SIDE ================= */}
//         <div className="auth-left">

//           {/* Logo */}
//           <motion.div
//             className="auth-logo"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="logo-icon">
//               <ShoppingBag size={22} />
//             </div>

//             <span>Nexora</span>
//           </motion.div>

//           {/* Main text */}
//           <motion.div
//             className="welcome-text"
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <p className="small-heading">
//               YOUR SHOPPING JOURNEY
//             </p>

//             <h1>
//               Welcome to
//               <br />
//               <span>Nexora.</span>
//             </h1>

//             <p className="description">
//               Discover amazing products, exclusive deals,
//               and a shopping experience designed just for you.
//             </p>
//           </motion.div>

//           {/* 3D Shopping Illustration */}
//           <div className="shopping-scene">

//             {/* Floating icons */}
//             <motion.div
//               className="floating-icon icon-heart"
//               animate={{
//                 y: [0, -15, 0],
//                 rotate: [0, 5, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//               }}
//             >
//               <Heart size={25} />
//             </motion.div>

//             <motion.div
//               className="floating-icon icon-lock"
//               animate={{
//                 y: [0, 15, 0],
//               }}
//               transition={{
//                 duration: 3.5,
//                 repeat: Infinity,
//               }}
//             >
//               <LockKeyhole size={25} />
//             </motion.div>

//             <motion.div
//               className="floating-icon icon-sparkle"
//               animate={{
//                 y: [0, -12, 0],
//                 rotate: [0, 180, 360],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//               }}
//             >
//               <Sparkles size={25} />
//             </motion.div>

//             {/* Orbit */}
//             <motion.div
//               className="orbit"
//               animate={{ rotate: 360 }}
//               transition={{
//                 duration: 15,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               <div className="orbit-dot"></div>
//             </motion.div>

//             {/* Shopping cart */}
//             <motion.div
//               className="cart-wrapper"
//               animate={{
//                 y: [0, -10, 0],
//                 rotate: [0, 1, 0, -1, 0],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <div className="cart">
//                 <div className="cart-handle"></div>

//                 <div className="cart-body">
//                   <div className="cart-item item-one"></div>
//                   <div className="cart-item item-two"></div>
//                   <div className="cart-item item-three"></div>
//                 </div>

//                 <div className="cart-wheel wheel-one"></div>
//                 <div className="cart-wheel wheel-two"></div>
//               </div>

//               {/* Shopping bags */}
//               <div className="shopping-bag bag-one">
//                 <ShoppingBag size={45} />
//               </div>

//               <div className="shopping-bag bag-two">
//                 <ShoppingBag size={35} />
//               </div>
//             </motion.div>

//           </div>

//           {/* Features */}
//           <motion.div
//             className="features"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7, duration: 0.7 }}
//           >

//             <div className="feature">
//               <div className="feature-icon">
//                 <ShieldCheck size={19} />
//               </div>

//               <div>
//                 <strong>Secure & Safe</strong>
//                 <span>Your data is protected</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon pink">
//                 <Truck size={19} />
//               </div>

//               <div>
//                 <strong>Fast Delivery</strong>
//                 <span>At your doorstep</span>
//               </div>
//             </div>

//             <div className="feature">
//               <div className="feature-icon orange">
//                 <RotateCcw size={19} />
//               </div>

//               <div>
//                 <strong>Easy Returns</strong>
//                 <span>Hassle free</span>
//               </div>
//             </div>

//           </motion.div>

//         </div>

//         {/* ================= RIGHT SIDE ================= */}
//         <motion.div
//           className="auth-right"
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="auth-card">

//             {/* This is where Login / Signup appears */}
//             <Outlet />

//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// }

// export default AuthLayout;




//2nd updated ui      ////////////////////////////






import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Outlet } from "react-router-dom";
import "./Authlayout.css";

function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={`floating-shape ${className}`}
      animate={{
        y: [0, -18, 0],
        x: [0, 8, 0],
        rotate: [0, 8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function AuthLayout() {
  return (
    <div className="auth-page">

      {/* ================= BACKGROUND ================= */}
      <div className="auth-background">

        <div className="gradient-blob blob-one" />
        <div className="gradient-blob blob-two" />
        <div className="gradient-blob blob-three" />

        <FloatingShape className="shape-one" delay={0} />
        <FloatingShape className="shape-two" delay={1} />
        <FloatingShape className="shape-three" delay={2} />
        <FloatingShape className="shape-four" delay={3} />

        {/* Decorative shopping icons */}
        <motion.div
          className="floating-icon cart-icon"
          animate={{
            y: [0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShoppingBag size={28} />
        </motion.div>

        <motion.div
          className="floating-icon sparkle-icon"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={24} />
        </motion.div>

        <motion.div
          className="floating-icon shield-icon"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShieldCheck size={25} />
        </motion.div>

        <motion.div
          className="floating-icon truck-icon"
          animate={{
            x: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Truck size={24} />
        </motion.div>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="auth-container">

        {/* ================= LEFT BRAND PANEL ================= */}
        <motion.div
          className="auth-showcase"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="brand">
            <div className="brand-icon">
              <ShoppingBag size={28} />
            </div>

            <div>
              <h1>Nexora</h1>
              <span>Shop smarter. Live better.</span>
            </div>
          </div>

          <div className="showcase-content">

            <motion.div
              className="mini-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles size={15} />
              <span>Next-generation shopping</span>
            </motion.div>

            <h2>
              Everything you love,
              <span> all in one place.</span>
            </h2>

            <p>
              Discover amazing products, enjoy seamless shopping,
              and experience a smarter way to shop with Nexora.
            </p>

          </div>

          {/* ================= SHOPPING ILLUSTRATION ================= */}
          <div className="shopping-illustration">

            <motion.div
              className="illustration-glow"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

            <motion.div
              className="shopping-bag bag-one"
              animate={{
                y: [0, -12, 0],
                rotate: [-4, 3, -4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="bag-handle" />
              <div className="bag-body">
                <span>N</span>
              </div>
            </motion.div>

            <motion.div
              className="shopping-box"
              animate={{
                y: [0, 10, 0],
                rotate: [2, -2, 2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="box-ribbon" />
              <div className="box-ribbon-horizontal" />
            </motion.div>

            <motion.div
              className="product-card product-card-one"
              animate={{
                y: [0, -10, 0],
                rotate: [4, -2, 4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <div className="product-circle">✦</div>
            </motion.div>

            <motion.div
              className="product-card product-card-two"
              animate={{
                y: [0, 12, 0],
                rotate: [-5, 2, -5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="product-circle">♡</div>
            </motion.div>

          </div>

          {/* ================= TRUST CARDS ================= */}
          <div className="trust-cards">

            <div className="trust-card">
              <ShieldCheck size={20} />
              <div>
                <strong>Secure</strong>
                <span>Shopping</span>
              </div>
            </div>

            <div className="trust-card">
              <Truck size={20} />
              <div>
                <strong>Fast</strong>
                <span>Delivery</span>
              </div>
            </div>

            <div className="trust-card">
              <Sparkles size={20} />
              <div>
                <strong>Premium</strong>
                <span>Experience</span>
              </div>
            </div>

          </div>

        </motion.div>

        {/* ================= RIGHT AUTH CARD ================= */}
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, x: 50, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: "easeOut",
          }}
        >
          <Outlet />
        </motion.div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="auth-footer">
        © {new Date().getFullYear()} Nexora. All rights reserved.
      </div>

    </div>
  );
}

export default AuthLayout;

