import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("email"); // if user is not login he can not access the page first redirected to login

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
