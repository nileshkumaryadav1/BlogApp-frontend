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
  const loggedInUser_id = localStorage.getItem("_id");

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

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`);
      // await axios.delete(`http://localhost:4000/api/blogs/${id}`);
      alert("Blog deleted ❌!");
      setPosts(posts.filter((post) => post._id !== id)); // Remove blog from state
    } catch (err) {
      console.error(err);
      alert("Error deleting blog.");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <Link className="navbar-brand fw-bold text-black d-flex" to="/">
            <h2>
              <i class="fa-solid fa-blog fa-bounce"></i>log{" "}
              <button className="btn btn-light">Home</button>
            </h2>
          </Link>

          <div className="d-flex">
            <Link
              to={`/edit-user/${loggedInUser_id}`}
              variant="success"
              className="btn btn-primary"
            >
              <i class="fa-solid fa-pen fa-flip"></i> Edit Profile Details
            </Link>

            <Link
              to={`/profile/${loggedInUserName}`}
              className="btn btn-primary mx-4"
            >
              <i class="fa-regular fa-user"></i> Profile
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="text-center mb-4">
        <h1 className="animate">Hello {loggedInUserName} !</h1>
        <h5 className="mb-3">
          Welcome to Your Blog Dashboard <i class="fa-regular fa-id-badge"></i>
        </h5>
        <Link
          to="/create/blog"
          variant="success"
          className="btn btn-primary mb-4"
        >
          <i class="fa-regular fa-pen-to-square fa-beat"></i> Create New Blog
        </Link>
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
                      </div>

                      {post && post.userName === loggedInUserName && (
                        <>
                          <button
                            className="btn btn-secondary mx-1"
                            onClick={() => handleEdit(post._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-light text-warning"
                            onClick={() => handleDelete(post._id)}
                          >
                            Delete <i class="fa-solid fa-trash"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">You have not created any Blogs.</p>
          )}
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 ">
          &copy; 2025 Blog<i class="fa-solid fa-blog fa-bounce"></i>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
