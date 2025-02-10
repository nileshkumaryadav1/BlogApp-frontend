import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

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

// testing

function App() {
  return (
    <Router>
      <Routes>
        {/* <Toaster position="top-right" reverseOrder={false} />  */}

        <Route path="/" element={<GlobalPage />} />

        <Route path="/profile/:name" element={<UserProfile />} />

        <Route
          path="/register"
          element={
            <ProtectedAuthRoute>
              <RegistrationPage />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedAuthRoute>
              <LoginPage />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create/blog/"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route path="/blog/:id" element={<FullBlog />} />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
