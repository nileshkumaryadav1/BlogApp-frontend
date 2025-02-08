import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from "react-hot-toast";

import GlobalPage from './components/Global';
import RegistrationPage from './components/Register';
import LoginPage from './components/Login';
import CreateBlog from './components/CreateBlog';
import FullBlog from './components/BlogPages/FullBlog'
import DashboardPage from './components/Dashboard';

// testing

function App() {
  return (
    <Router>
      <Routes>
        {/* <Toaster position="top-right" reverseOrder={false} />  */}

        <Route path="/" element={<GlobalPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<DashboardPage />} />
        <Route path="/create/blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<FullBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
