import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const user = localStorage.getItem("email"); // if email is exists it redirect to homepage

  return user ? <Navigate to="/" /> : children;
};

export default ProtectedAuthRoute;
