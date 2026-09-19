// import React, { useState } from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import {
//   Search,
//   ShoppingCart,
//   Heart,
//   UserRound,
//   Menu,
//   X,
//   ChevronDown,
//   Sparkles,
//   Truck,
//   ShieldCheck,
//   Headphones,
//   Instagram,
//   Facebook,
//   Twitter,
//   ArrowUpRight,
//   MapPin,
//   Mail,
//   Phone,
// } from "lucide-react";

// import "./ShopingLayout.css";

// const ShopingLayout = () => {
//   const navigate = useNavigate();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);

//   const [search, setSearch] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (!search.trim()) return;

//     navigate(`/shop/products?search=${encodeURIComponent(search)}`);
//     setSearchOpen(false);
//   };

//   const navItems = [
//     {
//       label: "Home",
//       path: "/shop",
//     },
//     {
//       label: "Shop",
//       path: "/shop/products",
//     },
//     {
//       label: "Categories",
//       path: "/shop/categories",
//       dropdown: true,
//     },
//     {
//       label: "New Arrivals",
//       path: "/shop/new-arrivals",
//     },
//     {
//       label: "Deals",
//       path: "/shop/deals",
//     },
//   ];

//   return (
//     <div className="shopping-layout">

//       {/* =====================================================
//           TOP ANNOUNCEMENT BAR
//       ===================================================== */}

//       <div className="shopping-announcement">
//         <div className="announcement-content">

//           <Sparkles size={14} />

//           <span>
//             New season is here — discover products you'll love.
//           </span>

//           <button
//             onClick={() => navigate("/shop/new-arrivals")}
//           >
//             Explore now
//             <ArrowUpRight size={13} />
//           </button>

//         </div>
//       </div>

//       {/* =====================================================
//           MAIN NAVBAR
//       ===================================================== */}

//       <header className="shopping-header">

//         <div className="shopping-header-inner">

//           {/* LOGO */}

//           <NavLink
//             to="/shop"
//             className="shopping-logo"
//           >
//             <div className="shopping-logo-icon">
//               <ShoppingCart size={22} />
//             </div>

//             <div className="shopping-logo-text">
//               <strong>Nexora</strong>
//               <span>Shop smarter. Live better.</span>
//             </div>
//           </NavLink>


//           {/* DESKTOP NAVIGATION */}

//           <nav className="shopping-navigation">

//             {navItems.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 end={item.path === "/shop"}
//                 className={({ isActive }) =>
//                   `shopping-nav-link ${
//                     isActive ? "active" : ""
//                   }`
//                 }
//               >
//                 {item.label}

//                 {item.dropdown && (
//                   <ChevronDown size={13} />
//                 )}
//               </NavLink>
//             ))}

//           </nav>


//           {/* HEADER ACTIONS */}

//           <div className="shopping-header-actions">

//             {/* SEARCH */}

//             <button
//               className="shopping-icon-button search-button"
//               onClick={() => setSearchOpen(true)}
//               aria-label="Search"
//             >
//               <Search size={19} />
//             </button>


//             {/* WISHLIST */}

//             <button
//               className="shopping-icon-button wishlist-button"
//               onClick={() => navigate("/shop/wishlist")}
//               aria-label="Wishlist"
//             >
//               <Heart size={19} />

//               <span className="shopping-badge">
//                 3
//               </span>
//             </button>


//             {/* CART */}

//             <button
//               className="shopping-icon-button cart-button"
//               onClick={() => navigate("/shop/cart")}
//               aria-label="Cart"
//             >
//               <ShoppingCart size={20} />

//               <span className="shopping-badge cart-badge">
//                 2
//               </span>
//             </button>


//             {/* ACCOUNT */}

//             <div className="shopping-account-wrapper">

//               <button
//                 className="shopping-account-button"
//                 onClick={() =>
//                   setAccountOpen((prev) => !prev)
//                 }
//               >
//                 <div className="account-avatar">
//                   <UserRound size={17} />
//                 </div>

//                 <div className="account-text">
//                   <span>Hello,</span>
//                   <strong>Account</strong>
//                 </div>

//                 <ChevronDown size={14} />
//               </button>


//               <AnimatePresence>
//                 {accountOpen && (
//                   <motion.div
//                     className="account-dropdown"
//                     initial={{
//                       opacity: 0,
//                       y: 8,
//                       scale: 0.97,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                       scale: 1,
//                     }}
//                     exit={{
//                       opacity: 0,
//                       y: 8,
//                       scale: 0.97,
//                     }}
//                     transition={{
//                       duration: 0.18,
//                     }}
//                   >

//                     <div className="account-dropdown-header">

//                       <div className="account-dropdown-avatar">
//                         <UserRound size={19} />
//                       </div>

//                       <div>
//                         <strong>Welcome back!</strong>
//                         <span>Manage your account</span>
//                       </div>

//                     </div>


//                     <button
//                       onClick={() =>
//                         navigate("/shop/profile")
//                       }
//                     >
//                       My Profile
//                     </button>

//                     <button
//                       onClick={() =>
//                         navigate("/shop/orders")
//                       }
//                     >
//                       My Orders
//                     </button>

//                     <button
//                       onClick={() =>
//                         navigate("/shop/wishlist")
//                       }
//                     >
//                       Wishlist
//                     </button>

//                     <div className="account-dropdown-divider" />

//                     <button
//                       onClick={() =>
//                         navigate("/auth/login")
//                       }
//                     >
//                       Sign In
//                     </button>

//                   </motion.div>
//                 )}
//               </AnimatePresence>

//             </div>


//             {/* MOBILE MENU */}

//             <button
//               className="shopping-mobile-menu"
//               onClick={() =>
//                 setMobileMenuOpen((prev) => !prev)
//               }
//             >
//               {mobileMenuOpen ? (
//                 <X size={22} />
//               ) : (
//                 <Menu size={22} />
//               )}
//             </button>

//           </div>

//         </div>


//         {/* =================================================
//             MOBILE NAVIGATION
//         ================================================= */}

//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               className="shopping-mobile-navigation"
//               initial={{
//                 opacity: 0,
//                 height: 0,
//               }}
//               animate={{
//                 opacity: 1,
//                 height: "auto",
//               }}
//               exit={{
//                 opacity: 0,
//                 height: 0,
//               }}
//             >

//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   end={item.path === "/shop"}
//                   onClick={() =>
//                     setMobileMenuOpen(false)
//                   }
//                   className={({ isActive }) =>
//                     isActive
//                       ? "mobile-nav-link active"
//                       : "mobile-nav-link"
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               ))}

//               <div className="mobile-navigation-divider" />

//               <button
//                 onClick={() => {
//                   navigate("/shop/orders");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 My Orders
//               </button>

//               <button
//                 onClick={() => {
//                   navigate("/shop/wishlist");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 Wishlist
//               </button>

//               <button
//                 onClick={() => {
//                   navigate("/shop/cart");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 Shopping Cart
//               </button>

//             </motion.div>
//           )}
//         </AnimatePresence>

//       </header>


//       {/* =====================================================
//           SEARCH OVERLAY
//       ===================================================== */}

//       <AnimatePresence>
//         {searchOpen && (
//           <motion.div
//             className="shopping-search-overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >

//             <motion.div
//               className="shopping-search-modal"
//               initial={{
//                 opacity: 0,
//                 y: -25,
//                 scale: 0.96,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 y: -25,
//                 scale: 0.96,
//               }}
//             >

//               <div className="search-modal-header">

//                 <div>
//                   <span>SEARCH NEXORA</span>
//                   <h2>What are you looking for?</h2>
//                 </div>

//                 <button
//                   onClick={() => setSearchOpen(false)}
//                 >
//                   <X size={21} />
//                 </button>

//               </div>


//               <form
//                 className="shopping-search-form"
//                 onSubmit={handleSearch}
//               >

//                 <Search size={21} />

//                 <input
//                   type="text"
//                   placeholder="Search products, categories..."
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                   autoFocus
//                 />

//                 <button type="submit">
//                   Search
//                 </button>

//               </form>


//               <div className="popular-searches">

//                 <span>Popular searches</span>

//                 <div>
//                   <button
//                     onClick={() =>
//                       setSearch("Headphones")
//                     }
//                   >
//                     Headphones
//                   </button>

//                   <button
//                     onClick={() =>
//                       setSearch("Smart Watch")
//                     }
//                   >
//                     Smart Watch
//                   </button>

//                   <button
//                     onClick={() =>
//                       setSearch("Sneakers")
//                     }
//                   >
//                     Sneakers
//                   </button>

//                   <button
//                     onClick={() =>
//                       setSearch("Laptop")
//                     }
//                   >
//                     Laptop
//                   </button>
//                 </div>

//               </div>

//             </motion.div>

//           </motion.div>
//         )}
//       </AnimatePresence>


//       {/* =====================================================
//           MAIN CONTENT
//       ===================================================== */}

//       <main className="shopping-main">

//         <AnimatePresence mode="wait">

//           <motion.div
//             key={window.location.pathname}
//             initial={{
//               opacity: 0,
//               y: 10,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               duration: 0.3,
//               ease: "easeOut",
//             }}
//           >
//             <Outlet />
//           </motion.div>

//         </AnimatePresence>

//       </main>


//       {/* =====================================================
//           TRUST FEATURES
//       ===================================================== */}

//       <section className="shopping-trust-section">

//         <div className="shopping-trust-inner">

//           <div className="shopping-trust-item">

//             <div className="trust-icon">
//               <Truck size={20} />
//             </div>

//             <div>
//               <strong>Fast Delivery</strong>
//               <span>Quick & reliable shipping</span>
//             </div>

//           </div>


//           <div className="shopping-trust-item">

//             <div className="trust-icon">
//               <ShieldCheck size={20} />
//             </div>

//             <div>
//               <strong>Secure Shopping</strong>
//               <span>Your data stays protected</span>
//             </div>

//           </div>


//           <div className="shopping-trust-item">

//             <div className="trust-icon">
//               <Heart size={20} />
//             </div>

//             <div>
//               <strong>Curated Products</strong>
//               <span>Products you'll love</span>
//             </div>

//           </div>


//           <div className="shopping-trust-item">

//             <div className="trust-icon">
//               <Headphones size={20} />
//             </div>

//             <div>
//               <strong>24/7 Support</strong>
//               <span>We're here to help</span>
//             </div>

//           </div>

//         </div>

//       </section>


//       {/* =====================================================
//           FOOTER
//       ===================================================== */}

//       <footer className="shopping-footer">

//         <div className="shopping-footer-main">

//           {/* BRAND */}

//           <div className="footer-brand">

//             <NavLink
//               to="/shop"
//               className="shopping-logo footer-logo"
//             >
//               <div className="shopping-logo-icon">
//                 <ShoppingCart size={21} />
//               </div>

//               <div className="shopping-logo-text">
//                 <strong>Nexora</strong>
//                 <span>Shop smarter. Live better.</span>
//               </div>
//             </NavLink>

//             <p>
//               Discover amazing products and enjoy
//               a smarter, simpler way to shop.
//             </p>


//             <div className="footer-socials">

//               <button>
//                 <Instagram size={16} />
//               </button>

//               <button>
//                 <Facebook size={16} />
//               </button>

//               <button>
//                 <Twitter size={16} />
//               </button>

//             </div>

//           </div>


//           {/* SHOP */}

//           <div className="footer-column">

//             <h4>Shop</h4>

//             <NavLink to="/shop/products">
//               All Products
//             </NavLink>

//             <NavLink to="/shop/new-arrivals">
//               New Arrivals
//             </NavLink>

//             <NavLink to="/shop/deals">
//               Best Deals
//             </NavLink>

//             <NavLink to="/shop/categories">
//               Categories
//             </NavLink>

//           </div>


//           {/* ACCOUNT */}

//           <div className="footer-column">

//             <h4>Account</h4>

//             <NavLink to="/shop/profile">
//               My Profile
//             </NavLink>

//             <NavLink to="/shop/orders">
//               My Orders
//             </NavLink>

//             <NavLink to="/shop/wishlist">
//               Wishlist
//             </NavLink>

//             <NavLink to="/shop/cart">
//               Shopping Cart
//             </NavLink>

//           </div>


//           {/* SUPPORT */}

//           <div className="footer-column">

//             <h4>Support</h4>

//             <NavLink to="/shop/contact">
//               Contact Us
//             </NavLink>

//             <NavLink to="/shop/shipping">
//               Shipping Information
//             </NavLink>

//             <NavLink to="/shop/returns">
//               Returns & Refunds
//             </NavLink>

//             <NavLink to="/shop/faq">
//               FAQ
//             </NavLink>

//           </div>


//           {/* CONTACT */}

//           <div className="footer-column footer-contact">

//             <h4>Get in touch</h4>

//             <div>
//               <MapPin size={15} />
//               <span>Dhaka, Bangladesh</span>
//             </div>

//             <div>
//               <Mail size={15} />
//               <span>hello@nexora.com</span>
//             </div>

//             <div>
//               <Phone size={15} />
//               <span>+880 1234 567890</span>
//             </div>

//           </div>

//         </div>


//         {/* FOOTER BOTTOM */}

//         <div className="shopping-footer-bottom">

//           <span>
//             © 2026 Nexora. All rights reserved.
//           </span>

//           <div>
//             <button>Privacy Policy</button>
//             <button>Terms of Service</button>
//           </div>

//         </div>

//       </footer>

//     </div>
//   );
// };

// export default ShopingLayout;







import React, { useState } from "react";
import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

import "./ShopingLayout.css";


const ShopingLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();


  // ================================
  // STATES
  // ================================

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [search, setSearch] = useState("");


  // ================================
  // SEARCH
  // ================================

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/shop/products?search=${encodeURIComponent(search)}`
    );

    setSearchOpen(false);
  };


  // ================================
  // NAVIGATION ITEMS
  // ================================

  const navItems = [

    {
      label: "Home",
      path: "/shop/home",
    },

    {
      label: "Shop",
      path: "/shop/products",
    },

    {
      label: "Categories",
      path: "/shop/categories",
      dropdown: true,
    },

    {
      label: "New Arrivals",
      path: "/shop/new-arrivals",
    },

    {
      label: "Deals",
      path: "/shop/deals",
    },

  ];


  return (

    <div className="shopping-layout">


      {/* =====================================================
          TOP ANNOUNCEMENT BAR
      ===================================================== */}

      <div className="shopping-announcement">

        <div className="announcement-content">

          <Sparkles size={14} />

          <span>
            New season is here — discover products you'll love.
          </span>

          <button
            onClick={() =>
              navigate("/shop/new-arrivals")
            }
          >

            Explore now

            <ArrowUpRight size={13} />

          </button>

        </div>

      </div>



      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <header className="shopping-header">

        <div className="shopping-header-inner">


          {/* =========================
              LOGO
          ========================= */}

          <NavLink
            to="/shop"
            className="shopping-logo"
          >

            <div className="shopping-logo-icon">

              <ShoppingCart size={22} />

            </div>


            <div className="shopping-logo-text">

              <strong>
                Nexora
              </strong>

              <span>
                Shop smarter. Live better.
              </span>

            </div>

          </NavLink>



          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <nav className="shopping-navigation">

            {navItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/shop"}

                className={({ isActive }) =>
                  `shopping-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
              >

                {item.label}


                {item.dropdown && (
                  <ChevronDown size={13} />
                )}

              </NavLink>

            ))}

          </nav>



          {/* =========================
              HEADER ACTIONS
          ========================= */}

          <div className="shopping-header-actions">


            {/* SEARCH */}

            <button
              className="shopping-icon-button search-button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >

              <Search size={19} />

            </button>



            {/* WISHLIST */}

            <button
              className="shopping-icon-button wishlist-button"
              onClick={() =>
                navigate("/shop/wishlist")
              }
              aria-label="Wishlist"
            >

              <Heart size={19} />

              <span className="shopping-badge">
                3
              </span>

            </button>



            {/* CART */}

            <button
              className="shopping-icon-button cart-button"
              onClick={() =>
                navigate("/shop/cart")
              }
              aria-label="Cart"
            >

              <ShoppingCart size={20} />

              <span className="shopping-badge cart-badge">
                2
              </span>

            </button>



            {/* =========================
                ACCOUNT
            ========================= */}

            <div className="shopping-account-wrapper">

              <button
                className="shopping-account-button"
                onClick={() =>
                  setAccountOpen((prev) => !prev)
                }
              >

                <div className="account-avatar">

                  <UserRound size={17} />

                </div>


                <div className="account-text">

                  <span>
                    Hello,
                  </span>

                  <strong>
                    Account
                  </strong>

                </div>


                <ChevronDown size={14} />

              </button>



              {/* ACCOUNT DROPDOWN */}

              <AnimatePresence>

                {accountOpen && (

                  <motion.div
                    className="account-dropdown"

                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.97,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.97,
                    }}

                    transition={{
                      duration: 0.18,
                    }}
                  >


                    <div className="account-dropdown-header">

                      <div className="account-dropdown-avatar">

                        <UserRound size={19} />

                      </div>


                      <div>

                        <strong>
                          Welcome back!
                        </strong>

                        <span>
                          Manage your account
                        </span>

                      </div>

                    </div>



                    <button
                      onClick={() =>
                        navigate("/shop/profile")
                      }
                    >
                      My Profile
                    </button>


                    <button
                      onClick={() =>
                        navigate("/shop/orders")
                      }
                    >
                      My Orders
                    </button>


                    <button
                      onClick={() =>
                        navigate("/shop/wishlist")
                      }
                    >
                      Wishlist
                    </button>


                    <div className="account-dropdown-divider" />


                    <button
                      onClick={() =>
                        navigate("/auth/login")
                      }
                    >
                      Sign In
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>



            {/* =========================
                MOBILE MENU
            ========================= */}

            <button
              className="shopping-mobile-menu"

              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
            >

              {mobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}

            </button>

          </div>

        </div>



        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <AnimatePresence>

          {mobileMenuOpen && (

            <motion.div
              className="shopping-mobile-navigation"

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


              {navItems.map((item) => (

                <NavLink
                  key={item.path}

                  to={item.path}

                  end={item.path === "/shop"}

                  onClick={() =>
                    setMobileMenuOpen(false)
                  }

                  className={({ isActive }) =>
                    isActive
                      ? "mobile-nav-link active"
                      : "mobile-nav-link"
                  }
                >

                  {item.label}

                </NavLink>

              ))}


              <div className="mobile-navigation-divider" />


              <button
                onClick={() => {

                  navigate("/shop/orders");

                  setMobileMenuOpen(false);

                }}
              >
                My Orders
              </button>


              <button
                onClick={() => {

                  navigate("/shop/wishlist");

                  setMobileMenuOpen(false);

                }}
              >
                Wishlist
              </button>


              <button
                onClick={() => {

                  navigate("/shop/cart");

                  setMobileMenuOpen(false);

                }}
              >
                Shopping Cart
              </button>


            </motion.div>

          )}

        </AnimatePresence>

      </header>



      {/* =====================================================
          SEARCH OVERLAY
      ===================================================== */}

      <AnimatePresence>

        {searchOpen && (

          <motion.div
            className="shopping-search-overlay"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >


            <motion.div
              className="shopping-search-modal"

              initial={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}
            >


              <div className="search-modal-header">

                <div>

                  <span>
                    SEARCH NEXORA
                  </span>

                  <h2>
                    What are you looking for?
                  </h2>

                </div>


                <button
                  onClick={() =>
                    setSearchOpen(false)
                  }
                >

                  <X size={21} />

                </button>

              </div>



              <form
                className="shopping-search-form"
                onSubmit={handleSearch}
              >

                <Search size={21} />


                <input
                  type="text"
                  placeholder="Search products, categories..."

                  value={search}

                  onChange={(e) =>
                    setSearch(e.target.value)
                  }

                  autoFocus
                />


                <button type="submit">
                  Search
                </button>

              </form>



              <div className="popular-searches">

                <span>
                  Popular searches
                </span>


                <div>

                  <button
                    onClick={() =>
                      setSearch("Headphones")
                    }
                  >
                    Headphones
                  </button>


                  <button
                    onClick={() =>
                      setSearch("Smart Watch")
                    }
                  >
                    Smart Watch
                  </button>


                  <button
                    onClick={() =>
                      setSearch("Sneakers")
                    }
                  >
                    Sneakers
                  </button>


                  <button
                    onClick={() =>
                      setSearch("Laptop")
                    }
                  >
                    Laptop
                  </button>

                </div>

              </div>


            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>



      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="shopping-main">

        <AnimatePresence mode="wait">

          <motion.div
            key={location.pathname}

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >

            <Outlet />

          </motion.div>

        </AnimatePresence>

      </main>



      {/* =====================================================
          TRUST FEATURES
      ===================================================== */}

      <section className="shopping-trust-section">

        <div className="shopping-trust-inner">


          <div className="shopping-trust-item">

            <div className="trust-icon">
              <Truck size={20} />
            </div>

            <div>

              <strong>
                Fast Delivery
              </strong>

              <span>
                Quick & reliable shipping
              </span>

            </div>

          </div>



          <div className="shopping-trust-item">

            <div className="trust-icon">
              <ShieldCheck size={20} />
            </div>

            <div>

              <strong>
                Secure Shopping
              </strong>

              <span>
                Your data stays protected
              </span>

            </div>

          </div>



          <div className="shopping-trust-item">

            <div className="trust-icon">
              <Heart size={20} />
            </div>

            <div>

              <strong>
                Curated Products
              </strong>

              <span>
                Products you'll love
              </span>

            </div>

          </div>



          <div className="shopping-trust-item">

            <div className="trust-icon">
              <Headphones size={20} />
            </div>

            <div>

              <strong>
                24/7 Support
              </strong>

              <span>
                We're here to help
              </span>

            </div>

          </div>


        </div>

      </section>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="shopping-footer">


        <div className="shopping-footer-main">


          {/* =========================
              BRAND
          ========================= */}

          <div className="footer-brand">


            <NavLink
              to="/shop"
              className="shopping-logo footer-logo"
            >

              <div className="shopping-logo-icon">

                <ShoppingCart size={21} />

              </div>


              <div className="shopping-logo-text">

                <strong>
                  Nexora
                </strong>

                <span>
                  Shop smarter. Live better.
                </span>

              </div>

            </NavLink>


            <p>
              Discover amazing products and enjoy
              a smarter, simpler way to shop.
            </p>


            {/* SOCIAL ICONS */}

            <div className="footer-socials">

              <button aria-label="Instagram">
                <FaInstagram size={16} />
              </button>


              <button aria-label="Facebook">
                <FaFacebookF size={16} />
              </button>


              <button aria-label="Twitter">
                <FaTwitter size={16} />
              </button>

            </div>

          </div>



          {/* =========================
              SHOP
          ========================= */}

          <div className="footer-column">

            <h4>
              Shop
            </h4>


            <NavLink to="/shop/products">
              All Products
            </NavLink>


            <NavLink to="/shop/new-arrivals">
              New Arrivals
            </NavLink>


            <NavLink to="/shop/deals">
              Best Deals
            </NavLink>


            <NavLink to="/shop/categories">
              Categories
            </NavLink>

          </div>



          {/* =========================
              ACCOUNT
          ========================= */}

          <div className="footer-column">

            <h4>
              Account
            </h4>


            <NavLink to="/shop/profile">
              My Profile
            </NavLink>


            <NavLink to="/shop/orders">
              My Orders
            </NavLink>


            <NavLink to="/shop/wishlist">
              Wishlist
            </NavLink>


            <NavLink to="/shop/cart">
              Shopping Cart
            </NavLink>

          </div>



          {/* =========================
              SUPPORT
          ========================= */}

          <div className="footer-column">

            <h4>
              Support
            </h4>


            <NavLink to="/shop/contact">
              Contact Us
            </NavLink>


            <NavLink to="/shop/shipping">
              Shipping Information
            </NavLink>


            <NavLink to="/shop/returns">
              Returns & Refunds
            </NavLink>


            <NavLink to="/shop/faq">
              FAQ
            </NavLink>

          </div>



          {/* =========================
              CONTACT
          ========================= */}

          <div className="footer-column footer-contact">

            <h4>
              Get in touch
            </h4>


            <div>

              <MapPin size={15} />

              <span>
                Dhaka, Bangladesh
              </span>

            </div>


            <div>

              <Mail size={15} />

              <span>
                hello@nexora.com
              </span>

            </div>


            <div>

              <Phone size={15} />

              <span>
                +880 1234 567890
              </span>

            </div>

          </div>


        </div>



        {/* =====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="shopping-footer-bottom">

          <span>
            © 2026 Nexora. All rights reserved.
          </span>


          <div>

            <button>
              Privacy Policy
            </button>

            <button>
              Terms of Service
            </button>

          </div>

        </div>


      </footer>


    </div>

  );
};


export default ShopingLayout;






