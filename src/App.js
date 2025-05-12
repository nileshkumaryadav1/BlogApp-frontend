import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalPage from "./pages/Global";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import FullBlog from "./pages/FullBlog";
import DashboardPage from "./pages/Dashboard";
import ProtectedAuthRoute from "./routes/ProtectedAuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditBlog from "./pages/EditBlog";
import UserProfile from "./pages/UserProfile";
import EditUser from "./pages/EditUser";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllBlog from "./pages/AllBlog";
import AllUser from "./pages/AllUser";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<GlobalPage />} />

        {/* All Blog page */}
        <Route path="/blogs" element={<AllBlog />} />

        {/* Full Blog page */}
        <Route path="/blog/:id" element={<FullBlog />} />

        {/* All User page */}
        <Route path="/users" element={<AllUser />} />

        {/* User Profile page */}
        <Route path="/profile/:name" element={<UserProfile />} />

        {/* Auth routes */}
        {/* User Registration */}
        <Route
          path="/register"
          element={
            <ProtectedAuthRoute>
              <RegistrationPage />
            </ProtectedAuthRoute>
          }
        />
        {/* User Login */}
        <Route
          path="/login"
          element={
            <ProtectedAuthRoute>
              <LoginPage />
            </ProtectedAuthRoute>
          }
        />
        {/* User Dashboard */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Edit User */}
        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />

        {/* Protected routes - Blog CRUD */}
        {/* Create Blog */}
        <Route
          path="/create/blog/"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        {/* Edit Blog */}
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
