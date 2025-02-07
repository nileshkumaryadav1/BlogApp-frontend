import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import { Axios } from "axios";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from the database (replace with actual API endpoint)
    fetch("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const LoggedInUserName = localStorage.getItem('name');
  const loggedInUserEmail = localStorage.getItem('email');

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">My Blog</a>
          <Link to="/home" className="nav-link" >Hi {LoggedInUserName} !</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <Link to="/register" className="nav-link" >Register</Link>
              </li>
              <li className="nav-item">
              <Link to="/login" className="nav-link" >Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-gradient text-white text-center py-5" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to My Blog</h1>
          <p className="lead">Discover amazing content and insights</p>
        </div>
      </header>

      <div className="container my-5">
        <div className="row">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    <a href={post.link} className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blog posts available.</p>
          )}
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
