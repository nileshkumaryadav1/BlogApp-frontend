import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedAuthRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all users from backend
        const res = await axios.get("/api/users");
        const users = res.data;

        // Check if email exists in database
        const userExists = users.some((user) => user.email === email);

        setIsLoggedIn(userExists);
      } catch (err) {
        console.error("Error fetching users:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return null; // You can show a spinner here

  // If user is logged in, redirect to homepage
  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default ProtectedAuthRoute;
