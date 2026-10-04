import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/authlayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/AdminViewComponents/AdminLayout";
import AdminOrders from "./pages/AdminView/AdminOrders";
import AdminProducts from "./pages/AdminView/AdminProducts";
import AdminDashBoard from "./pages/AdminView/AdminDashBoard";
import ShopingLayout from "./components/ShoppingVIewCOmponents/ShopingLayout";
import Home from "./pages/ShoppingView/Home";
import Cart from "./pages/ShoppingView/Cart";
import Checkout from "./pages/ShoppingView/Checkout";
import Listing from "./pages/ShoppingView/Listing";
import CheckAuth from "./common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CheckAuthenticatedUser } from "./store/AuthSlice/authslice";


function App() {
 
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(CheckAuthenticatedUser());
  }, [dispatch]);
  const { isAuthenticated, user} = useSelector((state) => state.auth);
  // console.log("App.jsx isAuthenticated:", isAuthenticated, "user:", user);
  return (
    <>
      <Routes>   
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="/auth/login" replace />} />

          <Route path="login" element={<Login />} />

          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopingLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="listing" element={<Listing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
