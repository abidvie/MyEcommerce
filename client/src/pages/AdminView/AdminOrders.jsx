// import React, { useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   ShoppingBag,
//   Clock3,
//   Truck,
//   CheckCircle2,
//   XCircle,
//   Eye,
//   MoreHorizontal,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   MapPin,
//   CreditCard,
//   User,
//   Package,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./AdminOrders.css";

// const initialOrders = [
//   {
//     id: "#ORD-1048",
//     customer: "Ayaan Rahman",
//     email: "ayaan@example.com",
//     phone: "+880 1712-345678",
//     items: 3,
//     amount: 249.97,
//     payment: "Paid",
//     status: "Delivered",
//     date: "18 Sep 2026",
//     address: "Dhaka, Bangladesh",
//     products: ["Wireless Headphones", "Desk Lamp", "Keyboard"],
//   },
//   {
//     id: "#ORD-1047",
//     customer: "Nusrat Jahan",
//     email: "nusrat@example.com",
//     phone: "+880 1812-654321",
//     items: 2,
//     amount: 184.98,
//     payment: "Paid",
//     status: "Shipped",
//     date: "18 Sep 2026",
//     address: "Chittagong, Bangladesh",
//     products: ["Smart Watch", "Sunglasses"],
//   },
//   {
//     id: "#ORD-1046",
//     customer: "Tanvir Hasan",
//     email: "tanvir@example.com",
//     phone: "+880 1911-876543",
//     items: 1,
//     amount: 129.99,
//     payment: "Paid",
//     status: "Processing",
//     date: "17 Sep 2026",
//     address: "Sylhet, Bangladesh",
//     products: ["Premium Headphones"],
//   },
//   {
//     id: "#ORD-1045",
//     customer: "Sadia Ahmed",
//     email: "sadia@example.com",
//     phone: "+880 1611-223344",
//     items: 4,
//     amount: 329.96,
//     payment: "Pending",
//     status: "Pending",
//     date: "17 Sep 2026",
//     address: "Rajshahi, Bangladesh",
//     products: ["Running Shoes", "Backpack", "Coffee Set", "Lamp"],
//   },
//   {
//     id: "#ORD-1044",
//     customer: "Fahim Karim",
//     email: "fahim@example.com",
//     phone: "+880 1512-998877",
//     items: 2,
//     amount: 219.98,
//     payment: "Paid",
//     status: "Delivered",
//     date: "16 Sep 2026",
//     address: "Dhaka, Bangladesh",
//     products: ["Keyboard", "Smart Watch"],
//   },
//   {
//     id: "#ORD-1043",
//     customer: "Mim Akter",
//     email: "mim@example.com",
//     phone: "+880 1312-445566",
//     items: 1,
//     amount: 74.99,
//     payment: "Refunded",
//     status: "Cancelled",
//     date: "16 Sep 2026",
//     address: "Khulna, Bangladesh",
//     products: ["Running Shoes"],
//   },
//   {
//     id: "#ORD-1042",
//     customer: "Rafi Islam",
//     email: "rafi@example.com",
//     phone: "+880 1412-112233",
//     items: 2,
//     amount: 149.98,
//     payment: "Paid",
//     status: "Shipped",
//     date: "15 Sep 2026",
//     address: "Comilla, Bangladesh",
//     products: ["Backpack", "Sunglasses"],
//   },
// ];

// function AdminOrders() {
//   const [orders, setOrders] = useState(initialOrders);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [paymentFilter, setPaymentFilter] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [page, setPage] = useState(1);

//   const ordersPerPage = 6;

//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const searchText = search.toLowerCase();

//       const matchesSearch =
//         order.id.toLowerCase().includes(searchText) ||
//         order.customer.toLowerCase().includes(searchText) ||
//         order.email.toLowerCase().includes(searchText);

//       const matchesStatus =
//         statusFilter === "All" || order.status === statusFilter;

//       const matchesPayment =
//         paymentFilter === "All" || order.payment === paymentFilter;

//       return matchesSearch && matchesStatus && matchesPayment;
//     });
//   }, [orders, search, statusFilter, paymentFilter]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredOrders.length / ordersPerPage)
//   );

//   const currentOrders = filteredOrders.slice(
//     (page - 1) * ordersPerPage,
//     page * ordersPerPage
//   );

//   const stats = {
//     total: orders.length,
//     pending: orders.filter(
//       (order) =>
//         order.status === "Pending" || order.status === "Processing"
//     ).length,
//     shipped: orders.filter((order) => order.status === "Shipped").length,
//     delivered: orders.filter((order) => order.status === "Delivered").length,
//     cancelled: orders.filter((order) => order.status === "Cancelled").length,
//   };

//   const totalRevenue = orders
//     .filter((order) => order.payment === "Paid")
//     .reduce((sum, order) => sum + order.amount, 0);

//   const updateStatus = (orderId, newStatus) => {
//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === orderId
//           ? {
//               ...order,
//               status: newStatus,
//             }
//           : order
//       )
//     );

//     setSelectedOrder((prev) =>
//       prev
//         ? {
//             ...prev,
//             status: newStatus,
//           }
//         : null
//     );
//   };

//   return (
//     <div className="orders-page">
//       {/* HEADER */}

//       <motion.div
//         className="orders-page-header"
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="orders-title-row">
//           <div className="orders-title-icon">
//             <ShoppingBag size={23} />
//           </div>

//           <div>
//             <h1>Orders</h1>
//             <p>Monitor and manage all customer orders.</p>
//           </div>
//         </div>
//       </motion.div>

//       {/* STATS */}

//       <div className="orders-stats-grid">
//         <OrderStat
//           icon={<ShoppingBag size={20} />}
//           title="Total Orders"
//           value={stats.total}
//           text="All orders"
//         />

//         <OrderStat
//           icon={<Clock3 size={20} />}
//           title="Pending"
//           value={stats.pending}
//           text="Need processing"
//         />

//         <OrderStat
//           icon={<Truck size={20} />}
//           title="Shipped"
//           value={stats.shipped}
//           text="On the way"
//         />

//         <OrderStat
//           icon={<CheckCircle2 size={20} />}
//           title="Delivered"
//           value={stats.delivered}
//           text="Successfully delivered"
//         />
//       </div>

//       {/* REVENUE STRIP */}

//       <motion.div
//         className="orders-revenue-strip"
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.08 }}
//       >
//         <div>
//           <span>Total Paid Revenue</span>
//           <strong>${totalRevenue.toFixed(2)}</strong>
//         </div>

//         <div className="revenue-decoration">
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </motion.div>

//       {/* TOOLBAR */}

//       <motion.div
//         className="orders-toolbar"
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.12 }}
//       >
//         <div className="orders-search">
//           <Search size={18} />

//           <input
//             type="text"
//             placeholder="Search order, customer or email..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//           />
//         </div>

//         <div className="orders-filters">
//           <div className="order-filter">
//             <SlidersHorizontal size={16} />

//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="All">All Status</option>
//               <option value="Pending">Pending</option>
//               <option value="Processing">Processing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>

//           <div className="order-filter">
//             <select
//               value={paymentFilter}
//               onChange={(e) => {
//                 setPaymentFilter(e.target.value);
//                 setPage(1);
//               }}
//             >
//               <option value="All">All Payments</option>
//               <option value="Paid">Paid</option>
//               <option value="Pending">Pending</option>
//               <option value="Refunded">Refunded</option>
//             </select>
//           </div>
//         </div>
//       </motion.div>

//       {/* TABLE */}

//       <motion.div
//         className="orders-card"
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.15 }}
//       >
//         <div className="orders-card-header">
//           <div>
//             <h2>Recent Orders</h2>
//             <p>{filteredOrders.length} orders found</p>
//           </div>

//           <div className="orders-live">
//             <span></span>
//             Live
//           </div>
//         </div>

//         <div className="orders-table-wrapper">
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>ORDER</th>
//                 <th>CUSTOMER</th>
//                 <th>ITEMS</th>
//                 <th>AMOUNT</th>
//                 <th>PAYMENT</th>
//                 <th>STATUS</th>
//                 <th>DATE</th>
//                 <th>ACTION</th>
//               </tr>
//             </thead>

//             <tbody>
//               <AnimatePresence mode="popLayout">
//                 {currentOrders.map((order, index) => (
//                   <motion.tr
//                     key={order.id}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 10 }}
//                     transition={{ delay: index * 0.04 }}
//                   >
//                     <td>
//                       <strong className="order-id">{order.id}</strong>
//                     </td>

//                     <td>
//                       <div className="customer-info">
//                         <div className="customer-avatar">
//                           {order.customer.charAt(0)}
//                         </div>

//                         <div>
//                           <strong>{order.customer}</strong>
//                           <span>{order.email}</span>
//                         </div>
//                       </div>
//                     </td>

//                     <td>
//                       <span className="items-count">
//                         <Package size={14} />
//                         {order.items}
//                       </span>
//                     </td>

//                     <td>
//                       <strong className="order-amount">
//                         ${order.amount.toFixed(2)}
//                       </strong>
//                     </td>

//                     <td>
//                       <span
//                         className={`payment-badge payment-${order.payment
//                           .toLowerCase()
//                           .replace(" ", "-")}`}
//                       >
//                         {order.payment}
//                       </span>
//                     </td>

//                     <td>
//                       <span
//                         className={`order-status status-${order.status
//                           .toLowerCase()
//                           .replace(" ", "-")}`}
//                       >
//                         <i></i>
//                         {order.status}
//                       </span>
//                     </td>

//                     <td>
//                       <span className="order-date">{order.date}</span>
//                     </td>

//                     <td>
//                       <div className="order-actions">
//                         <button
//                           onClick={() => setSelectedOrder(order)}
//                           title="View order"
//                         >
//                           <Eye size={16} />
//                         </button>

//                         <button title="More options">
//                           <MoreHorizontal size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>

//           {currentOrders.length === 0 && (
//             <div className="empty-orders">
//               <ShoppingBag size={42} />
//               <h3>No orders found</h3>
//               <p>Try changing your search or filters.</p>
//             </div>
//           )}
//         </div>

//         {/* PAGINATION */}

//         <div className="orders-pagination">
//           <span>
//             Showing {currentOrders.length} of {filteredOrders.length}
//           </span>

//           <div>
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//             >
//               <ChevronLeft size={17} />
//             </button>

//             <strong>
//               {page} / {totalPages}
//             </strong>

//             <button
//               disabled={page === totalPages}
//               onClick={() =>
//                 setPage((p) => Math.min(totalPages, p + 1))
//               }
//             >
//               <ChevronRight size={17} />
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* ORDER DETAILS */}

//       <AnimatePresence>
//         {selectedOrder && (
//           <OrderModal
//             order={selectedOrder}
//             onClose={() => setSelectedOrder(null)}
//             onUpdateStatus={updateStatus}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function OrderStat({ icon, title, value, text }) {
//   return (
//     <motion.div
//       className="order-stat-card"
//       whileHover={{ y: -4 }}
//       transition={{ type: "spring", stiffness: 300 }}
//     >
//       <div className="order-stat-icon">{icon}</div>

//       <div>
//         <span>{title}</span>
//         <strong>{value}</strong>
//         <small>{text}</small>
//       </div>
//     </motion.div>
//   );
// }

// function OrderModal({ order, onClose, onUpdateStatus }) {
//   return (
//     <motion.div
//       className="order-modal-overlay"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onMouseDown={onClose}
//     >
//       <motion.div
//         className="order-modal"
//         initial={{ opacity: 0, scale: 0.94, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.94, y: 20 }}
//         onMouseDown={(e) => e.stopPropagation()}
//       >
//         <div className="order-modal-header">
//           <div>
//             <span>ORDER DETAILS</span>
//             <h2>{order.id}</h2>
//           </div>

//           <button onClick={onClose}>
//             <X size={19} />
//           </button>
//         </div>

//         {/* CUSTOMER */}

//         <div className="order-detail-section">
//           <div className="detail-section-title">
//             <User size={16} />
//             Customer
//           </div>

//           <div className="customer-detail">
//             <div className="large-customer-avatar">
//               {order.customer.charAt(0)}
//             </div>

//             <div>
//               <strong>{order.customer}</strong>

//               <span>
//                 <Mail size={12} />
//                 {order.email}
//               </span>

//               <span>
//                 <Phone size={12} />
//                 {order.phone}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ORDER INFO */}

//         <div className="order-info-grid">
//           <div>
//             <span>
//               <CreditCard size={13} />
//               Payment
//             </span>

//             <strong>{order.payment}</strong>
//           </div>

//           <div>
//             <span>
//               <Package size={13} />
//               Items
//             </span>

//             <strong>{order.items}</strong>
//           </div>

//           <div>
//             <span>Amount</span>

//             <strong>${order.amount.toFixed(2)}</strong>
//           </div>
//         </div>

//         {/* PRODUCTS */}

//         <div className="order-detail-section">
//           <div className="detail-section-title">
//             <ShoppingBag size={16} />
//             Products
//           </div>

//           <div className="order-product-list">
//             {order.products.map((product, index) => (
//               <div key={index}>
//                 <span>{product}</span>
//                 <small>Item {index + 1}</small>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ADDRESS */}

//         <div className="order-address">
//           <MapPin size={17} />

//           <div>
//             <span>Delivery Address</span>
//             <strong>{order.address}</strong>
//           </div>
//         </div>

//         {/* STATUS */}

//         <div className="order-update">
//           <label>Update Order Status</label>

//           <select
//             value={order.status}
//             onChange={(e) =>
//               onUpdateStatus(order.id, e.target.value)
//             }
//           >
//             <option>Pending</option>
//             <option>Processing</option>
//             <option>Shipped</option>
//             <option>Delivered</option>
//             <option>Cancelled</option>
//           </select>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default AdminOrders;















import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  User,
  CalendarDays,
  DollarSign,
  Check,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import "./AdminOrders.css";

/* =========================================================
   INITIAL ORDERS
========================================================= */

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    email: "john@example.com",
    product: "Premium Wireless Headphones",
    items: 2,
    amount: 259.98,
    status: "Delivered",
    payment: "Paid",
    date: "Sep 16, 2026",
    address: "New York, USA",
  },

  {
    id: "ORD-1002",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Minimal Leather Backpack",
    items: 1,
    amount: 89.99,
    status: "Processing",
    payment: "Paid",
    date: "Sep 16, 2026",
    address: "London, UK",
  },

  {
    id: "ORD-1003",
    customer: "Michael Brown",
    email: "michael@example.com",
    product: "Smart Fitness Watch",
    items: 1,
    amount: 159.99,
    status: "Shipped",
    payment: "Paid",
    date: "Sep 15, 2026",
    address: "Toronto, Canada",
  },

  {
    id: "ORD-1004",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "Classic Running Shoes",
    items: 2,
    amount: 149.98,
    status: "Pending",
    payment: "Pending",
    date: "Sep 15, 2026",
    address: "Dhaka, Bangladesh",
  },

  {
    id: "ORD-1005",
    customer: "Daniel Miller",
    email: "daniel@example.com",
    product: "Modern Desk Lamp",
    items: 3,
    amount: 149.97,
    status: "Delivered",
    payment: "Paid",
    date: "Sep 14, 2026",
    address: "Sydney, Australia",
  },

  {
    id: "ORD-1006",
    customer: "Olivia Taylor",
    email: "olivia@example.com",
    product: "Mechanical Keyboard",
    items: 1,
    amount: 109.99,
    status: "Cancelled",
    payment: "Refunded",
    date: "Sep 14, 2026",
    address: "Berlin, Germany",
  },

  {
    id: "ORD-1007",
    customer: "James Anderson",
    email: "james@example.com",
    product: "Premium Sunglasses",
    items: 2,
    amount: 119.98,
    status: "Shipped",
    payment: "Paid",
    date: "Sep 13, 2026",
    address: "Paris, France",
  },

  {
    id: "ORD-1008",
    customer: "Sophia Martinez",
    email: "sophia@example.com",
    product: "Ceramic Coffee Set",
    items: 1,
    amount: 39.99,
    status: "Processing",
    payment: "Paid",
    date: "Sep 13, 2026",
    address: "Madrid, Spain",
  },

  {
    id: "ORD-1009",
    customer: "William Thomas",
    email: "william@example.com",
    product: "Premium Wireless Headphones",
    items: 1,
    amount: 129.99,
    status: "Delivered",
    payment: "Paid",
    date: "Sep 12, 2026",
    address: "Chicago, USA",
  },

  {
    id: "ORD-1010",
    customer: "Emma Garcia",
    email: "emma@example.com",
    product: "Smart Fitness Watch",
    items: 2,
    amount: 319.98,
    status: "Pending",
    payment: "Pending",
    date: "Sep 12, 2026",
    address: "Barcelona, Spain",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  /* Three-dot menu */
  const [openMenu, setOpenMenu] = useState(null);

  /* View modal */
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  /* Edit modal */
  const [editingOrder, setEditingOrder] =
    useState(null);

  /* Delete modal */
  const [deleteOrder, setDeleteOrder] =
    useState(null);

  const [page, setPage] = useState(1);

  const ordersPerPage = 6;

  const menuRef = useRef(null);

  /* =========================================================
     CLOSE THREE-DOT MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     FILTER ORDERS
  ========================================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(searchValue) ||
        order.customer
          .toLowerCase()
          .includes(searchValue) ||
        order.product
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.payment === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    paymentFilter,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length /
        ordersPerPage
    )
  );

  const currentOrders =
    filteredOrders.slice(
      (page - 1) * ordersPerPage,
      page * ordersPerPage
    );

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = {
    total: orders.length,

    pending: orders.filter(
      (order) =>
        order.status === "Pending"
    ).length,

    processing: orders.filter(
      (order) =>
        order.status === "Processing"
    ).length,

    shipped: orders.filter(
      (order) =>
        order.status === "Shipped"
    ).length,

    delivered: orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length,

    cancelled: orders.filter(
      (order) =>
        order.status === "Cancelled"
    ).length,

    revenue: orders
      .filter(
        (order) =>
          order.payment === "Paid"
      )
      .reduce(
        (total, order) =>
          total + order.amount,
        0
      ),
  };

  /* =========================================================
     GET STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "order-status-delivered";

      case "Shipped":
        return "order-status-shipped";

      case "Processing":
        return "order-status-processing";

      case "Pending":
        return "order-status-pending";

      case "Cancelled":
        return "order-status-cancelled";

      default:
        return "";
    }
  };

  /* =========================================================
     GET PAYMENT CLASS
  ========================================================= */

  const getPaymentClass = (payment) => {
    switch (payment) {
      case "Paid":
        return "payment-paid";

      case "Pending":
        return "payment-pending";

      case "Refunded":
        return "payment-refunded";

      default:
        return "";
    }
  };

  /* =========================================================
     CHANGE ORDER STATUS
  ========================================================= */

  const handleStatusChange = (
    orderId,
    newStatus
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );

    setOpenMenu(null);

    if (
      selectedOrder &&
      selectedOrder.id === orderId
    ) {
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }

    if (
      editingOrder &&
      editingOrder.id === orderId
    ) {
      setEditingOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  /* =========================================================
     DELETE ORDER
  ========================================================= */

  const handleDeleteOrder = () => {
    if (!deleteOrder) return;

    setOrders((prev) =>
      prev.filter(
        (order) =>
          order.id !== deleteOrder.id
      )
    );

    setDeleteOrder(null);
    setOpenMenu(null);

    /* Prevent invalid page */
    setPage(1);
  };

  /* =========================================================
     EDIT ORDER
  ========================================================= */

  const handleEditOrder = (e) => {
    e.preventDefault();

    if (!editingOrder) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === editingOrder.id
          ? editingOrder
          : order
      )
    );

    setEditingOrder(null);
  };

  /* =========================================================
     RESET FILTER PAGE
  ========================================================= */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePaymentFilter = (value) => {
    setPaymentFilter(value);
    setPage(1);
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="orders-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <motion.div
        className="orders-page-header"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <div className="orders-title-row">

          <div className="orders-title-icon">
            <ShoppingBag size={23} />
          </div>

          <div>
            <h1>Orders</h1>

            <p>
              Manage customer orders,
              payments and delivery.
            </p>
          </div>

        </div>

      </motion.div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="orders-stats-grid">

        <OrderStat
          icon={<ShoppingBag size={21} />}
          title="Total Orders"
          value={stats.total}
          text="All customer orders"
        />

        <OrderStat
          icon={<Clock3 size={21} />}
          title="Pending"
          value={stats.pending}
          text="Awaiting processing"
        />

        <OrderStat
          icon={<Truck size={21} />}
          title="Shipped"
          value={stats.shipped}
          text="Currently in transit"
        />

        <OrderStat
          icon={<CheckCircle2 size={21} />}
          title="Delivered"
          value={stats.delivered}
          text="Successfully delivered"
        />

        <OrderStat
          icon={<DollarSign size={21} />}
          title="Revenue"
          value={`$${stats.revenue.toFixed(
            2
          )}`}
          text="From paid orders"
        />

      </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <motion.div
        className="orders-toolbar"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
      >

        {/* SEARCH */}

        <div className="orders-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search order, customer or product..."
            value={search}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* FILTERS */}

        <div className="orders-filter-group">

          <div className="order-filter-control">

            <SlidersHorizontal
              size={17}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                handleStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          <div className="order-filter-control">

            <CreditCard size={17} />

            <select
              value={paymentFilter}
              onChange={(e) =>
                handlePaymentFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Payments
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Refunded">
                Refunded
              </option>

            </select>

          </div>

        </div>

      </motion.div>

      {/* =====================================================
          ORDERS TABLE
      ===================================================== */}

      <motion.div
        className="orders-card"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
        }}
      >

        {/* CARD HEADER */}

        <div className="orders-card-header">

          <div>
            <h2>Order Management</h2>

            <p>
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="orders-live-label">

            <span></span>

            Live Orders

          </div>

        </div>

        {/* TABLE */}

        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>

              <tr>

                <th>ORDER</th>

                <th>CUSTOMER</th>

                <th>PRODUCT</th>

                <th>AMOUNT</th>

                <th>PAYMENT</th>

                <th>STATUS</th>

                <th>DATE</th>

                <th>ACTION</th>

              </tr>

            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {currentOrders.map(
                  (order, index) => (

                    <motion.tr
                      key={order.id}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 10,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                    >

                      {/* ORDER */}

                      <td>

                        <div className="order-id-cell">

                          <div className="order-id-icon">
                            <Package
                              size={16}
                            />
                          </div>

                          <div>

                            <strong>
                              {order.id}
                            </strong>

                            <span>
                              {order.items}{" "}
                              {order.items === 1
                                ? "item"
                                : "items"}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* CUSTOMER */}

                      <td>

                        <div className="order-customer">

                          <div className="customer-avatar">
                            {order.customer
                              .charAt(0)}
                          </div>

                          <div>

                            <strong>
                              {order.customer}
                            </strong>

                            <span>
                              {order.email}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* PRODUCT */}

                      <td>

                        <div className="order-product">

                          <strong>
                            {order.product}
                          </strong>

                          <span>
                            {order.items}{" "}
                            {order.items === 1
                              ? "unit"
                              : "units"}
                          </span>

                        </div>

                      </td>

                      {/* AMOUNT */}

                      <td>

                        <strong className="order-amount">
                          ${order.amount.toFixed(
                            2
                          )}
                        </strong>

                      </td>

                      {/* PAYMENT */}

                      <td>

                        <span
                          className={`payment-badge ${getPaymentClass(
                            order.payment
                          )}`}
                        >
                          {order.payment}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`order-status-badge ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      {/* DATE */}

                      <td>

                        <div className="order-date">

                          <CalendarDays
                            size={15}
                          />

                          {order.date}

                        </div>

                      </td>

                      {/* ACTION */}

                      <td>

                        <div
                          className="order-actions"
                          ref={
                            openMenu ===
                            order.id
                              ? menuRef
                              : null
                          }
                        >

                          {/* VIEW */}

                          <button
                            className="order-action-btn"
                            title="View Order"
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          {/* THREE DOT */}

                          <div className="order-more-wrapper">

                            <button
                              className="order-action-btn"
                              title="More Actions"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu ===
                                    order.id
                                    ? null
                                    : order.id
                                )
                              }
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>

                            {/* =================================================
                                THREE DOT DROPDOWN
                            ================================================= */}

                            <AnimatePresence>

                              {openMenu ===
                                order.id && (

                                <motion.div
                                  className="order-action-menu"
                                  initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: -5,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: -5,
                                  }}
                                  transition={{
                                    duration: 0.15,
                                  }}
                                >

                                  {/* VIEW */}

                                  <button
                                    onClick={() => {
                                      setSelectedOrder(
                                        order
                                      );

                                      setOpenMenu(
                                        null
                                      );
                                    }}
                                  >
                                    <Eye
                                      size={16}
                                    />

                                    View Order
                                  </button>

                                  {/* EDIT */}

                                  <button
                                    onClick={() => {
                                      setEditingOrder(
                                        {
                                          ...order,
                                        }
                                      );

                                      setOpenMenu(
                                        null
                                      );
                                    }}
                                  >
                                    <Pencil
                                      size={16}
                                    />

                                    Edit Order
                                  </button>

                                  {/* STATUS */}

                                  <div className="menu-section-label">
                                    Change Status
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        order.id,
                                        "Pending"
                                      )
                                    }
                                  >
                                    <Clock3
                                      size={16}
                                    />

                                    Pending

                                    {order.status ===
                                      "Pending" && (
                                      <Check
                                        size={15}
                                        className="menu-check"
                                      />
                                    )}
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        order.id,
                                        "Processing"
                                      )
                                    }
                                  >
                                    <Package
                                      size={16}
                                    />

                                    Processing

                                    {order.status ===
                                      "Processing" && (
                                      <Check
                                        size={15}
                                        className="menu-check"
                                      />
                                    )}
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        order.id,
                                        "Shipped"
                                      )
                                    }
                                  >
                                    <Truck
                                      size={16}
                                    />

                                    Shipped

                                    {order.status ===
                                      "Shipped" && (
                                      <Check
                                        size={15}
                                        className="menu-check"
                                      />
                                    )}
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        order.id,
                                        "Delivered"
                                      )
                                    }
                                  >
                                    <CheckCircle2
                                      size={16}
                                    />

                                    Delivered

                                    {order.status ===
                                      "Delivered" && (
                                      <Check
                                        size={15}
                                        className="menu-check"
                                      />
                                    )}
                                  </button>

                                  {/* DIVIDER */}

                                  <div className="menu-divider"></div>

                                  {/* DELETE */}

                                  <button
                                    className="danger"
                                    onClick={() => {
                                      setDeleteOrder(
                                        order
                                      );

                                      setOpenMenu(
                                        null
                                      );
                                    }}
                                  >
                                    <Trash2
                                      size={16}
                                    />

                                    Delete Order
                                  </button>

                                </motion.div>

                              )}

                            </AnimatePresence>

                          </div>

                        </div>

                      </td>

                    </motion.tr>

                  )
                )}

              </AnimatePresence>

            </tbody>

          </table>

          {/* EMPTY STATE */}

          {currentOrders.length ===
            0 && (

            <div className="empty-orders">

              <ShoppingBag
                size={42}
              />

              <h3>
                No orders found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

            </div>

          )}

        </div>

        {/* ===================================================
            PAGINATION
        =================================================== */}

        <div className="orders-pagination">

          <span>
            Showing{" "}
            {currentOrders.length} of{" "}
            {filteredOrders.length}
          </span>

          <div>

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) =>
                  Math.max(
                    1,
                    p - 1
                  )
                )
              }
            >
              <ChevronLeft
                size={17}
              />
            </button>

            <span className="order-page-number">
              {page} / {totalPages}
            </span>

            <button
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages,
                    p + 1
                  )
                )
              }
            >
              <ChevronRight
                size={17}
              />
            </button>

          </div>

        </div>

      </motion.div>

      {/* =====================================================
          VIEW ORDER MODAL
      ===================================================== */}

      <AnimatePresence>

        {selectedOrder && (

          <ModalOverlay
            onClose={() =>
              setSelectedOrder(null)
            }
          >

            <motion.div
              className="order-view-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
            >

              {/* HEADER */}

              <div className="order-modal-header">

                <div>

                  <span className="order-modal-id">
                    {selectedOrder.id}
                  </span>

                  <h2>
                    Order Details
                  </h2>

                  <p>
                    Complete information
                    about this order.
                  </p>

                </div>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() =>
                    setSelectedOrder(
                      null
                    )
                  }
                >
                  <X size={20} />
                </button>

              </div>

              {/* STATUS */}

              <div className="order-modal-status-row">

                <span>
                  Order Status
                </span>

                <span
                  className={`order-status-badge ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>

              </div>

              {/* CUSTOMER */}

              <div className="order-detail-section">

                <div className="order-detail-heading">

                  <User size={17} />

                  Customer Information

                </div>

                <div className="order-detail-grid">

                  <div>
                    <span>
                      Customer
                    </span>

                    <strong>
                      {selectedOrder.customer}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Email
                    </span>

                    <strong>
                      {selectedOrder.email}
                    </strong>
                  </div>

                </div>

              </div>

              {/* ORDER INFORMATION */}

              <div className="order-detail-section">

                <div className="order-detail-heading">

                  <Package size={17} />

                  Order Information

                </div>

                <div className="order-detail-grid">

                  <div>
                    <span>
                      Product
                    </span>

                    <strong>
                      {selectedOrder.product}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Items
                    </span>

                    <strong>
                      {selectedOrder.items}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Order Date
                    </span>

                    <strong>
                      {selectedOrder.date}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Amount
                    </span>

                    <strong>
                      $
                      {selectedOrder.amount.toFixed(
                        2
                      )}
                    </strong>
                  </div>

                </div>

              </div>

              {/* DELIVERY */}

              <div className="order-detail-section">

                <div className="order-detail-heading">

                  <MapPin size={17} />

                  Delivery Information

                </div>

                <div className="order-address">

                  {selectedOrder.address}

                </div>

              </div>

              {/* PAYMENT */}

              <div className="order-detail-section">

                <div className="order-detail-heading">

                  <CreditCard size={17} />

                  Payment

                </div>

                <span
                  className={`payment-badge ${getPaymentClass(
                    selectedOrder.payment
                  )}`}
                >
                  {selectedOrder.payment}
                </span>

              </div>

            </motion.div>

          </ModalOverlay>

        )}

      </AnimatePresence>

      {/* =====================================================
          EDIT ORDER MODAL
      ===================================================== */}

      <AnimatePresence>

        {editingOrder && (

          <ModalOverlay
            onClose={() =>
              setEditingOrder(null)
            }
          >

            <motion.div
              className="order-edit-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
            >

              <div className="order-modal-header">

                <div>

                  <span className="order-modal-id">
                    {editingOrder.id}
                  </span>

                  <h2>
                    Edit Order
                  </h2>

                  <p>
                    Update order
                    information.
                  </p>

                </div>

                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() =>
                    setEditingOrder(
                      null
                    )
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <form
                onSubmit={
                  handleEditOrder
                }
              >

                {/* CUSTOMER */}

                <div className="order-form-group">

                  <label>
                    Customer Name
                  </label>

                  <input
                    value={
                      editingOrder.customer
                    }
                    onChange={(e) =>
                      setEditingOrder(
                        (prev) => ({
                          ...prev,
                          customer:
                            e.target
                              .value,
                        })
                      )
                    }
                  />

                </div>

                {/* EMAIL */}

                <div className="order-form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={
                      editingOrder.email
                    }
                    onChange={(e) =>
                      setEditingOrder(
                        (prev) => ({
                          ...prev,
                          email:
                            e.target
                              .value,
                        })
                      )
                    }
                  />

                </div>

                {/* PRODUCT */}

                <div className="order-form-group">

                  <label>
                    Product
                  </label>

                  <input
                    value={
                      editingOrder.product
                    }
                    onChange={(e) =>
                      setEditingOrder(
                        (prev) => ({
                          ...prev,
                          product:
                            e.target
                              .value,
                        })
                      )
                    }
                  />

                </div>

                {/* STATUS + PAYMENT */}

                <div className="order-form-row">

                  <div className="order-form-group">

                    <label>
                      Status
                    </label>

                    <select
                      value={
                        editingOrder.status
                      }
                      onChange={(e) =>
                        setEditingOrder(
                          (prev) => ({
                            ...prev,
                            status:
                              e.target
                                .value,
                          })
                        )
                      }
                    >

                      <option>
                        Pending
                      </option>

                      <option>
                        Processing
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Delivered
                      </option>

                      <option>
                        Cancelled
                      </option>

                    </select>

                  </div>

                  <div className="order-form-group">

                    <label>
                      Payment
                    </label>

                    <select
                      value={
                        editingOrder.payment
                      }
                      onChange={(e) =>
                        setEditingOrder(
                          (prev) => ({
                            ...prev,
                            payment:
                              e.target
                                .value,
                          })
                        )
                      }
                    >

                      <option>
                        Paid
                      </option>

                      <option>
                        Pending
                      </option>

                      <option>
                        Refunded
                      </option>

                    </select>

                  </div>

                </div>

                {/* AMOUNT */}

                <div className="order-form-group">

                  <label>
                    Amount
                  </label>

                  <div className="order-input-with-icon">

                    <DollarSign
                      size={16}
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        editingOrder.amount
                      }
                      onChange={(e) =>
                        setEditingOrder(
                          (prev) => ({
                            ...prev,
                            amount:
                              Number(
                                e.target
                                  .value
                              ),
                          })
                        )
                      }
                    />

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="order-edit-buttons">

                  <button
                    type="button"
                    onClick={() =>
                      setEditingOrder(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                  >
                    Save Changes
                  </button>

                </div>

              </form>

            </motion.div>

          </ModalOverlay>

        )}

      </AnimatePresence>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AnimatePresence>

        {deleteOrder && (

          <ModalOverlay
            onClose={() =>
              setDeleteOrder(null)
            }
          >

            <motion.div
              className="order-delete-modal"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
            >

              <div className="order-delete-icon">

                <Trash2 size={23} />

              </div>

              <h2>
                Delete Order?
              </h2>

              <p>
                Are you sure you want to
                delete{" "}
                <strong>
                  {deleteOrder.id}
                </strong>
                ?
              </p>

              <div className="order-delete-buttons">

                <button
                  type="button"
                  onClick={() =>
                    setDeleteOrder(
                      null
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleDeleteOrder
                  }
                >
                  Delete Order
                </button>

              </div>

            </motion.div>

          </ModalOverlay>

        )}

      </AnimatePresence>

    </div>
  );
}

/* =========================================================
   ORDER STAT COMPONENT
========================================================= */

function OrderStat({
  icon,
  title,
  value,
  text,
}) {
  return (
    <motion.div
      className="order-stat-card"
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >

      <div className="order-stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {text}
        </small>

      </div>

    </motion.div>
  );
}

/* =========================================================
   MODAL OVERLAY
========================================================= */

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <motion.div
      className="order-modal-overlay"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onMouseDown={onClose}
    >

      <div
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        {children}
      </div>

    </motion.div>
  );
}

export default AdminOrders;