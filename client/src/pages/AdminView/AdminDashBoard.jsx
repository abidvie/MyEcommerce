import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CalendarDays,
  Plus,
  Eye,
  Truck,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ChevronDown,
  Star,
  CreditCard,
  UserPlus,
  ShoppingCart,
  Activity,
  BarChart3,
} from "lucide-react";

import "./AdminDashBoard.css";

function AdminDashBoard() {
  const [period, setPeriod] = useState("7 Days");

  const stats = [
    {
      title: "Total Revenue",
      value: "$48,290",
      change: "+12.8%",
      positive: true,
      icon: DollarSign,
      description: "vs. previous period",
      className: "revenue",
    },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8.4%",
      positive: true,
      icon: ShoppingBag,
      description: "vs. previous period",
      className: "orders",
    },
    {
      title: "Customers",
      value: "8,549",
      change: "+6.2%",
      positive: true,
      icon: Users,
      description: "vs. previous period",
      className: "customers",
    },
    {
      title: "Products",
      value: "1,249",
      change: "-2.1%",
      positive: false,
      icon: Package,
      description: "vs. previous period",
      className: "products",
    },
  ];

  const revenueData = useMemo(() => {
    if (period === "30 Days") {
      return [
        3100, 4200, 3600, 5100, 4800, 6200, 5800, 6900, 6100, 7200,
        6800, 7900,
      ];
    }

    if (period === "90 Days") {
      return [
        4200, 5200, 4700, 6800, 6200, 7600, 7200, 8400, 7900, 9200,
        8600, 10100,
      ];
    }

    return [
      4200, 5800, 4900, 7100, 6400, 8300, 7600, 9100, 8200, 10400,
      9700, 11600,
    ];
  }, [period]);

  const recentOrders = [
    {
      id: "#ORD-10482",
      customer: "James Wilson",
      product: "AirPods Pro",
      amount: "$249.00",
      status: "Delivered",
      time: "2 min ago",
    },
    {
      id: "#ORD-10481",
      customer: "Sarah Miller",
      product: "Smart Watch Ultra",
      amount: "$399.00",
      status: "Processing",
      time: "14 min ago",
    },
    {
      id: "#ORD-10480",
      customer: "Michael Brown",
      product: "Nike Air Max",
      amount: "$189.00",
      status: "Shipped",
      time: "32 min ago",
    },
    {
      id: "#ORD-10479",
      customer: "Emily Davis",
      product: "MacBook Air M3",
      amount: "$1,299.00",
      status: "Pending",
      time: "1 hour ago",
    },
    {
      id: "#ORD-10478",
      customer: "Daniel Smith",
      product: "Leather Backpack",
      amount: "$129.00",
      status: "Delivered",
      time: "2 hours ago",
    },
  ];

  const topProducts = [
    {
      name: "AirPods Pro",
      category: "Electronics",
      sales: 248,
      revenue: "$61,752",
      rating: "4.9",
    },
    {
      name: "Smart Watch Ultra",
      category: "Wearables",
      sales: 189,
      revenue: "$75,411",
      rating: "4.8",
    },
    {
      name: "Nike Air Max",
      category: "Footwear",
      sales: 164,
      revenue: "$30,996",
      rating: "4.7",
    },
    {
      name: "MacBook Air M3",
      category: "Computers",
      sales: 96,
      revenue: "$124,704",
      rating: "4.9",
    },
  ];

  const activities = [
    {
      icon: ShoppingCart,
      title: "New order received",
      text: "#ORD-10482 placed an order",
      time: "2 min ago",
    },
    {
      icon: UserPlus,
      title: "New customer",
      text: "Emma Johnson joined your store",
      time: "18 min ago",
    },
    {
      icon: CreditCard,
      title: "Payment completed",
      text: "$399 payment successfully received",
      time: "41 min ago",
    },
    {
      icon: Package,
      title: "Product updated",
      text: "Smart Watch Ultra stock updated",
      time: "1 hour ago",
    },
  ];

  const maxRevenue = Math.max(...revenueData);

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* =========================================
          HEADER
      ========================================= */}
      <div className="dashboard-header">
        <div>
          <div className="dashboard-breadcrumb">
            Admin
            <span>/</span>
            Dashboard
          </div>

          <h1>Good morning, Admin 👋</h1>

          <p>
            Here's what's happening with your store today.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="dashboard-date-btn">
            <CalendarDays size={17} />
            <span>September 18, 2026</span>
            <ChevronDown size={15} />
          </button>

          <button className="dashboard-add-btn">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* =========================================
          STAT CARDS
      ========================================= */}
      <div className="dashboard-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              className={`dashboard-stat-card ${stat.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={21} />
                </div>

                <button className="stat-more-btn">
                  <MoreHorizontal size={19} />
                </button>
              </div>

              <div className="stat-content">
                <span className="stat-title">
                  {stat.title}
                </span>

                <h2>{stat.value}</h2>

                <div className="stat-bottom">
                  <span
                    className={`stat-change ${
                      stat.positive
                        ? "stat-positive"
                        : "stat-negative"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}

                    {stat.change}
                  </span>

                  <span className="stat-description">
                    {stat.description}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================
          MAIN GRID
      ========================================= */}
      <div className="dashboard-main-grid">

        {/* =====================================
            REVENUE CHART
        ===================================== */}
        <motion.section
          className="dashboard-card revenue-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Revenue Overview
              </span>

              <div className="revenue-heading">
                <h2>$48,290.00</h2>

                <span className="revenue-growth">
                  <TrendingUp size={14} />
                  12.8%
                </span>
              </div>

              <p>
                Revenue performance for the selected period
              </p>
            </div>

            <div className="revenue-period">
              {["7 Days", "30 Days", "90 Days"].map((item) => (
                <button
                  key={item}
                  className={
                    period === item
                      ? "active"
                      : ""
                  }
                  onClick={() => setPeriod(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="revenue-chart">

            <div className="chart-y-axis">
              <span>$12k</span>
              <span>$9k</span>
              <span>$6k</span>
              <span>$3k</span>
              <span>$0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart-bars">
                {revenueData.map((value, index) => {
                  const height =
                    (value / maxRevenue) * 100;

                  return (
                    <div
                      className="chart-bar-wrapper"
                      key={index}
                    >
                      <motion.div
                        className="chart-bar"
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${height}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.04,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          opacity: 0.75,
                        }}
                      >
                        <span className="chart-tooltip">
                          $
                          {value.toLocaleString()}
                        </span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <div className="chart-x-axis">
                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                ].map((day, index) => (
                  <span key={index}>{day}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================
            ORDER SUMMARY
        ===================================== */}
        <motion.section
          className="dashboard-card order-summary-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Order Summary
              </span>

              <h3>Today's Orders</h3>
            </div>

            <button className="card-more-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="order-summary-content">

            <div className="order-donut">
              <div className="donut-inner">
                <strong>128</strong>
                <span>Orders</span>
              </div>
            </div>

            <div className="order-status-list">

              <div className="order-summary-item">
                <div className="summary-status">
                  <span className="summary-dot pending"></span>
                  <span>Pending</span>
                </div>
                <strong>18</strong>
              </div>

              <div className="order-summary-item">
                <div className="summary-status">
                  <span className="summary-dot processing"></span>
                  <span>Processing</span>
                </div>
                <strong>32</strong>
              </div>

              <div className="order-summary-item">
                <div className="summary-status">
                  <span className="summary-dot shipped"></span>
                  <span>Shipped</span>
                </div>
                <strong>29</strong>
              </div>

              <div className="order-summary-item">
                <div className="summary-status">
                  <span className="summary-dot delivered"></span>
                  <span>Delivered</span>
                </div>
                <strong>49</strong>
              </div>

            </div>
          </div>

          <button className="view-orders-btn">
            View all orders
            <ArrowUpRight size={15} />
          </button>
        </motion.section>
      </div>

      {/* =========================================
          SECOND GRID
      ========================================= */}
      <div className="dashboard-secondary-grid">

        {/* =====================================
            RECENT ORDERS
        ===================================== */}
        <motion.section
          className="dashboard-card recent-orders-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Orders
              </span>

              <h3>Recent Orders</h3>
            </div>

            <button className="view-all-btn">
              View all
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="recent-orders-list">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="recent-order-row"
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5 + index * 0.06,
                }}
              >
                <div className="order-product-icon">
                  <ShoppingBag size={18} />
                </div>

                <div className="recent-order-info">
                  <strong>{order.id}</strong>
                  <span>{order.customer}</span>
                </div>

                <div className="recent-order-product">
                  {order.product}
                </div>

                <div className="recent-order-time">
                  <Clock3 size={13} />
                  {order.time}
                </div>

                <div
                  className={`dashboard-order-status ${order.status.toLowerCase()}`}
                >
                  {order.status === "Delivered" && (
                    <CheckCircle2 size={13} />
                  )}

                  {order.status === "Shipped" && (
                    <Truck size={13} />
                  )}

                  {order.status === "Processing" && (
                    <Package size={13} />
                  )}

                  {order.status === "Pending" && (
                    <Clock3 size={13} />
                  )}

                  {order.status}
                </div>

                <strong className="recent-order-amount">
                  {order.amount}
                </strong>

                <button className="recent-order-action">
                  <Eye size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =====================================
            TOP PRODUCTS
        ===================================== */}
        <motion.section
          className="dashboard-card top-products-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Performance
              </span>

              <h3>Top Products</h3>
            </div>

            <button className="card-more-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="top-products-list">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                className="top-product-row"
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.55 + index * 0.07,
                }}
              >
                <div className="product-rank">
                  0{index + 1}
                </div>

                <div className="product-mini-image">
                  <Package size={21} />
                </div>

                <div className="top-product-info">
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                </div>

                <div className="product-sales">
                  <strong>{product.sales}</strong>
                  <span>sales</span>
                </div>

                <div className="product-rating">
                  <Star
                    size={13}
                    fill="currentColor"
                  />
                  {product.rating}
                </div>
              </motion.div>
            ))}
          </div>

          <button className="view-products-btn">
            View product analytics
            <BarChart3 size={15} />
          </button>
        </motion.section>
      </div>

      {/* =========================================
          BOTTOM GRID
      ========================================= */}
      <div className="dashboard-bottom-grid">

        {/* CUSTOMER ACTIVITY */}
        <motion.section
          className="dashboard-card customer-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Customers
              </span>

              <h3>Customer Activity</h3>
            </div>

            <div className="customer-growth">
              <TrendingUp size={14} />
              +18.4%
            </div>
          </div>

          <div className="customer-stats">
            <div>
              <span>New Customers</span>
              <strong>284</strong>
            </div>

            <div>
              <span>Returning</span>
              <strong>721</strong>
            </div>

            <div>
              <span>Active Now</span>
              <strong>46</strong>
            </div>
          </div>

          <div className="customer-progress">
            <div className="progress-header">
              <span>Returning customers</span>
              <strong>72%</strong>
            </div>

            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{
                  duration: 1,
                  delay: 0.7,
                }}
              />
            </div>
          </div>
        </motion.section>

        {/* RECENT ACTIVITY */}
        <motion.section
          className="dashboard-card activity-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                System
              </span>

              <h3>Recent Activity</h3>
            </div>

            <Activity size={19} />
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  className="activity-item"
                  key={index}
                  initial={{
                    opacity: 0,
                    x: 10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.7 + index * 0.08,
                  }}
                >
                  <div className="activity-icon">
                    <Icon size={15} />
                  </div>

                  <div className="activity-info">
                    <strong>{activity.title}</strong>
                    <span>{activity.text}</span>
                  </div>

                  <time>{activity.time}</time>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* QUICK ACTIONS */}
        <motion.section
          className="dashboard-card quick-actions-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="dashboard-card-header">
            <div>
              <span className="card-label">
                Shortcuts
              </span>

              <h3>Quick Actions</h3>
            </div>
          </div>

          <div className="quick-actions">

            <button>
              <div>
                <Plus size={18} />
              </div>
              <span>Add Product</span>
              <ArrowUpRight size={14} />
            </button>

            <button>
              <div>
                <Package size={18} />
              </div>
              <span>Manage Inventory</span>
              <ArrowUpRight size={14} />
            </button>

            <button>
              <div>
                <Truck size={18} />
              </div>
              <span>Manage Delivery</span>
              <ArrowUpRight size={14} />
            </button>

            <button>
              <div>
                <BarChart3 size={18} />
              </div>
              <span>View Analytics</span>
              <ArrowUpRight size={14} />
            </button>

          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default AdminDashBoard;