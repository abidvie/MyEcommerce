import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
function CheckAuth(isAuthenticated, user, children) {
  const location = useLocation();
  if (
    !isauthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (
    isauthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role == "admin") {
      return (
        <Navigate to="/admin/dashboard" state={{ from: location }} replace />
      );
    }
    if (user?.role == "user") {
      return <Navigate to="/shop/home" state={{ from: location }} replace />;
    }
  }


  return {children};
}

export default CheckAuth;
