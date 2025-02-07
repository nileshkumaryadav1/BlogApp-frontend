import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from "react-hot-toast";
import { Toaster } from "react-hot-toast";


import GlobalPage from './components/Global';
import HomePage from './components/Home';
import RegistrationPage from './components/Register';
import LoginPage from './components/Login';
import CreateBlog from './components/CreateBlog';
import FullBlog from './components/BlogPages/FullBlog'
import UserBlog from './components/BlogPages/UserBlog';

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Toaster position="top-right" reverseOrder={false} />  */}
        
        <Route path="/" element={<GlobalPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create/blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<FullBlog />} />

        <Route path="/user-blogs" element={<UserBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
