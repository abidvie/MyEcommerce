// import React, { useState } from "react";
// import { Outlet, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   Package,
//   Users,
//   Tags,
//   BarChart3,
//   Settings,
//   Menu,
//   X,
//   Search,
//   Bell,
//   ChevronDown,
//   LogOut,
//   Store,
//   CreditCard,
//   Truck,
//   MessageSquare,
// } from "lucide-react";

// import "./AdminLayout.css";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navItems = [
//     {
//       title: "Dashboard",
//       icon: LayoutDashboard,
//       path: "/admin",
//     },
//     {
//       title: "Products",
//       icon: Package,
//       path: "/admin/products",
//     },
//     {
//       title: "Orders",
//       icon: ShoppingBag,
//       path: "/admin/orders",
//     },
//     {
//       title: "Customers",
//       icon: Users,
//       path: "/admin/customers",
//     },
//     {
//       title: "Categories",
//       icon: Tags,
//       path: "/admin/categories",
//     },
//     {
//       title: "Payments",
//       icon: CreditCard,
//       path: "/admin/payments",
//     },
//     {
//       title: "Delivery",
//       icon: Truck,
//       path: "/admin/delivery",
//     },
//     {
//       title: "Messages",
//       icon: MessageSquare,
//       path: "/admin/messages",
//     },
//     {
//       title: "Analytics",
//       icon: BarChart3,
//       path: "/admin/analytics",
//     },
//   ];

//   const handleNavClick = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="admin-layout">

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`admin-sidebar ${
//           sidebarOpen ? "sidebar-open" : ""
//         }`}
//       >

//         {/* Logo */}
//         <div className="admin-logo">
//           <div className="admin-logo-icon">
//             <Store size={21} />
//           </div>

//           <div className="admin-logo-text">
//             <h2>Nexora</h2>
//             <span>Admin Panel</span>
//           </div>

//           <button
//             className="sidebar-close"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X size={21} />
//           </button>
//         </div>

//         {/* Store Status */}
//         <div className="store-status">
//           <span className="status-dot"></span>

//           <div>
//             <strong>Store Online</strong>
//             <small>Everything is running</small>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="sidebar-section-title">
//           MAIN MENU
//         </div>

//         <nav className="admin-nav">
//           {navItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 end={item.path === "/admin"}
//                 onClick={handleNavClick}
//                 className={({ isActive }) =>
//                   `admin-nav-link ${
//                     isActive ? "active" : ""
//                   }`
//                 }
//               >
//                 <Icon size={19} />

//                 <span>{item.title}</span>
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* Bottom Menu */}
//         <div className="sidebar-bottom">

//           <NavLink
//             to="/admin/settings"
//             onClick={handleNavClick}
//             className={({ isActive }) =>
//               `admin-nav-link ${
//                 isActive ? "active" : ""
//               }`
//             }
//           >
//             <Settings size={19} />
//             <span>Settings</span>
//           </NavLink>

//           <button className="logout-button">
//             <LogOut size={19} />
//             <span>Logout</span>
//           </button>

//         </div>
//       </aside>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* ================= MAIN AREA ================= */}
//       <div className="admin-main">

//         {/* ================= HEADER ================= */}
//         <header className="admin-header">

//           <div className="header-left">

//             <button
//               className="mobile-menu-button"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu size={22} />
//             </button>

//             <div className="page-heading">
//               <h1>Admin Dashboard</h1>
//               <p>Manage your Nexora store</p>
//             </div>

//           </div>

//           <div className="header-right">

//             {/* Search */}
//             <div className="admin-search">
//               <Search size={18} />

//               <input
//                 type="text"
//                 placeholder="Search..."
//               />

//               <span className="search-shortcut">
//                 Ctrl K
//               </span>
//             </div>

//             {/* Notification */}
//             <button className="header-icon-button">
//               <Bell size={20} />

//               <span className="notification-dot"></span>
//             </button>

//             {/* Divider */}
//             <div className="header-divider"></div>

//             {/* Profile */}
//             <div className="admin-profile">

//               <div className="profile-avatar">
//                 A
//               </div>

//               <div className="profile-info">
//                 <strong>Admin</strong>
//                 <span>Administrator</span>
//               </div>

//               <ChevronDown size={16} />

//             </div>

//           </div>

//         </header>

//         {/* ================= PAGE CONTENT ================= */}
//         <main className="admin-content">

//           <Outlet />

//         </main>

//       </div>

//     </div>
//   );
// };

// export default AdminLayout;




import React, { useState } from "react";

import {
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Tags,
  BarChart3,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Store,
  CreditCard,
  Truck,
  MessageSquare,
  User,
  ShieldCheck,
  Mail,
  ExternalLink,
} from "lucide-react";

import "./AdminLayout.css";


const AdminLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();


  /* =====================================================
     NAVIGATION ITEMS
     ===================================================== */

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      title: "Categories",
      icon: Tags,
      path: "/admin/categories",
    },
    {
      title: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      title: "Delivery",
      icon: Truck,
      path: "/admin/delivery",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/admin/messages",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
    },
  ];


  /* =====================================================
     PAGE TITLES
     ===================================================== */

  const getPageInfo = () => {

    const path = location.pathname;

    if (path === "/admin") {
      return {
        title: "Admin Dashboard",
        subtitle: "Overview of your Nexora store",
      };
    }

    if (path.includes("/products")) {
      return {
        title: "Products",
        subtitle: "Manage your product catalog",
      };
    }

    if (path.includes("/orders")) {
      return {
        title: "Orders",
        subtitle: "Manage and track customer orders",
      };
    }

    if (path.includes("/customers")) {
      return {
        title: "Customers",
        subtitle: "Manage your customer accounts",
      };
    }

    if (path.includes("/categories")) {
      return {
        title: "Categories",
        subtitle: "Organize your product catalog",
      };
    }

    if (path.includes("/payments")) {
      return {
        title: "Payments",
        subtitle: "Monitor your store payments",
      };
    }

    if (path.includes("/delivery")) {
      return {
        title: "Delivery",
        subtitle: "Manage deliveries and shipments",
      };
    }

    if (path.includes("/messages")) {
      return {
        title: "Messages",
        subtitle: "Manage customer conversations",
      };
    }

    if (path.includes("/analytics")) {
      return {
        title: "Analytics",
        subtitle: "Understand your store performance",
      };
    }

    if (path.includes("/settings")) {
      return {
        title: "Settings",
        subtitle: "Manage your store settings",
      };
    }

    return {
      title: "Nexora Admin",
      subtitle: "Manage your ecommerce store",
    };
  };


  const pageInfo = getPageInfo();


  /* =====================================================
     CLOSE MOBILE SIDEBAR
     ===================================================== */

  const handleNavClick = () => {
    setSidebarOpen(false);
  };


  return (

    <div className="admin-layout">


      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* Logo */}

        <div className="admin-logo">

          <div className="admin-logo-icon">
            <Store size={21} />
          </div>

          <div className="admin-logo-text">
            <h2>Nexora</h2>
            <span>Admin Panel</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>

        </div>


        {/* Store status */}

        <motion.div
          className="store-status"
          whileHover={{ scale: 1.02 }}
        >

          <span className="status-dot"></span>

          <div>
            <strong>Store Online</strong>

            <small>
              Everything is running
            </small>
          </div>

        </motion.div>


        {/* Navigation title */}

        <div className="sidebar-section-title">
          MAIN MENU
        </div>


        {/* Scrollable navigation */}

        <nav className="admin-nav">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `admin-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
              >

                <motion.div
                  className="nav-icon"
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  <Icon size={18} />
                </motion.div>

                <span>{item.title}</span>

              </NavLink>

            );

          })}

        </nav>


        {/* Bottom sidebar */}

        <div className="sidebar-bottom">

          <NavLink
            to="/admin/settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `admin-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>


          <button className="logout-button">

            <LogOut size={18} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =================================================
          MOBILE OVERLAY
          ================================================= */}

      <AnimatePresence>

        {sidebarOpen && (

          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />

        )}

      </AnimatePresence>


      {/* =================================================
          MAIN AREA
          ================================================= */}

      <div className="admin-main">


        {/* =================================================
            HEADER
            ================================================= */}

        <motion.header
          className="admin-header"
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          <div className="header-left">


            {/* Mobile menu */}

            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>


            <div className="page-heading">

              <motion.h1
                key={pageInfo.title}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
              >
                {pageInfo.title}
              </motion.h1>

              <motion.p
                key={pageInfo.subtitle}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                {pageInfo.subtitle}
              </motion.p>

            </div>

          </div>


          {/* Header right */}

          <div className="header-right">


            {/* Search */}

            <div className="admin-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search..."
              />

              <span className="search-shortcut">
                Ctrl K
              </span>

            </div>


            {/* Notification */}

            <button className="header-icon-button">

              <Bell size={19} />

              <span className="notification-dot"></span>

            </button>


            <div className="header-divider"></div>


            {/* =================================================
                ADMIN PROFILE
                ================================================= */}

            <div className="profile-wrapper">


              <button
                className="admin-profile"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >

                <div className="profile-avatar">
                  A
                </div>


                <div className="profile-info">

                  <strong>
                    Admin
                  </strong>

                  <span>
                    Administrator
                  </span>

                </div>


                <motion.div
                  animate={{
                    rotate: profileOpen ? 180 : 0,
                  }}
                >
                  <ChevronDown size={16} />
                </motion.div>

              </button>


              {/* =================================================
                  PROFILE DROPDOWN
                  ================================================= */}

              <AnimatePresence>

                {profileOpen && (

                  <motion.div
                    className="profile-dropdown"

                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}

                    transition={{
                      duration: 0.18,
                    }}
                  >


                    {/* Profile header */}

                    <div className="dropdown-profile">

                      <div className="dropdown-avatar">
                        A
                      </div>

                      <div>

                        <strong>
                          Admin User
                        </strong>

                        <span>
                          Super Administrator
                        </span>

                      </div>

                    </div>


                    <div className="dropdown-divider"></div>


                    {/* Email */}

                    <div className="profile-detail">

                      <div className="profile-detail-icon">
                        <Mail size={15} />
                      </div>

                      <div>

                        <span>
                          Email
                        </span>

                        <strong>
                          admin@nexora.com
                        </strong>

                      </div>

                    </div>


                    {/* Role */}

                    <div className="profile-detail">

                      <div className="profile-detail-icon">
                        <ShieldCheck size={15} />
                      </div>

                      <div>

                        <span>
                          Role
                        </span>

                        <strong>
                          Super Administrator
                        </strong>

                      </div>

                    </div>


                    {/* Account */}

                    <div className="profile-detail">

                      <div className="profile-detail-icon">
                        <User size={15} />
                      </div>

                      <div>

                        <span>
                          Account
                        </span>

                        <strong className="account-active">
                          Active
                        </strong>

                      </div>

                    </div>


                    <div className="dropdown-divider"></div>


                    {/* Actions */}

                    <NavLink
                      to="/admin/profile"
                      className="dropdown-action"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >

                      <User size={16} />

                      <span>
                        My Profile
                      </span>

                      <ExternalLink
                        size={13}
                      />

                    </NavLink>


                    <NavLink
                      to="/admin/settings"
                      className="dropdown-action"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >

                      <Settings size={16} />

                      <span>
                        Settings
                      </span>

                    </NavLink>


                    <button
                      className="dropdown-logout"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >

                      <LogOut size={16} />

                      <span>
                        Logout
                      </span>

                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </motion.header>


        {/* =================================================
            PAGE CONTENT
            ================================================= */}

        <main className="admin-content">

          <AnimatePresence mode="wait">

            <motion.div
              key={location.pathname}

              className="admin-page-wrapper"

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -8,
              }}

              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >

              <Outlet />

            </motion.div>

          </AnimatePresence>

        </main>


      </div>

    </div>
  );
};

export default AdminLayout;