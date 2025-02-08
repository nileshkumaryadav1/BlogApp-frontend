import { Button, Container, Card, Row, Col, Navbar } from "react-bootstrap";    
import { Links, useNavigate } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/blogs/?userEmail=${loggedInUserEmail}`)
      // .get(`http://localhost:4000/api/blogs/?userEmail=${loggedInUserEmail}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // code for logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setIsLoggedIn(!!userEmail); // make boolean (true when exists, false when it is null)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email"); // clear user data from local storage
    localStorage.removeItem("name");
    setIsLoggedIn(false); // update state
    navigate("/");
    window.location.reload(); // refresh to see changes
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <Link className="navbar-brand fw-bold text-black d-flex" to="/">
            <h2>
              <i class="fa-solid fa-house"></i>
            </h2>
            <p className="pt-1">Home page</p>
          </Link>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </nav>

      <div className="text-center mb-4">
        <h1 className="animate" >Hello {loggedInUserName} !</h1>
        <h5 className="mb-3">Welcome to Your Blog Dashboard <i class="fa-regular fa-id-badge"></i></h5>
        <Button href="/create/blog" variant="success" className="mb-4">
        <i class="fa-regular fa-pen-to-square"></i> Create New Blog
        </Button>
      </div>

      <div className="container mb-3">
        <div className="row mb-3">
          <h2 className="mb-4">Your created Blogs are...</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title ">{post.title}</h5>
                    <p className="card-text">
                      {post.description.substring(0, 100)}...
                    </p>
                    <div className="d-flex d-flex justify-content-between align-items-center">
                      <div>
                        <Link
                          to={`/blog/${post._id}`}
                          className="btn btn-outline-secondary"
                        >
                          View full Blog
                        </Link>
                        <button className="btn btn-secondary mx-1"> Edit</button>
                      </div>

                      <button className="btn btn-light text-warning">Delete <i class="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No Blogs created yet.</p>
          )}
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 ">&copy; 2025 Blog<i class="fa-solid fa-blog"></i>. All rights reserved.</p>
      </footer>
    </div>
  );
}
