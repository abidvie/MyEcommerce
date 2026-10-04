



import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation();

    // User is NOT authenticated
    // and trying to access a protected page
    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // User IS authenticated
    // and trying to access login/register
    if (
        isAuthenticated &&
        (
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {

        // Admin
        if (user?.role === "admin") {
            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }

        // Normal user
        if (user?.role === "user") {
            return (
                <Navigate
                    to="/shop/home"
                    replace
                />
            );
        }
    }

    if(isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")){
        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }

    if(isAuthenticated && user?.role === "user" && location.pathname.includes("/admin")){
        return (
            <Navigate
                to="/shop/home"
                replace
            />
        );
    }

    return <>{children}</>;
}

export default CheckAuth;