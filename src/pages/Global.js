import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const loggedInUserName = localStorage.getItem("name");

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoadingPosts(false));
  }, []);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoadingUsers(false));
  }, []);

  const getTimeAgo = (timestamp) => {
    const secondsAgo = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (secondsAgo < 60) return "Just now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} min ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hr ago`;
    return `${Math.floor(secondsAgo / 86400)} day(s) ago`;
  };

  return (
    <div className="bg-light">
      <Navbar />

      {/* Hero Header */}
      <header
        className="text-white text-center py-5"
        style={{ background: "linear-gradient(to right, #000000, #2575fc)" }}
      >
        <h3 className="fw-bold animate">Hi {loggedInUserName} 👋</h3>
        <h1 className="display-5 fw-bold">Welcome to the World of Blogs</h1>
        <p className="lead">Discover insightful stories and creative minds</p>
      </header>

      <div className="container my-4 d-flex flex-wrap">
        {/* Left Column - Creators */}
        <div className="col-md-4 mb-4 pe-md-3">
          <h4 className="text-dark fw-bold">Latest Creators</h4>
          <p className="text-muted">Follow them to read more amazing blogs.</p>

          {loadingUsers ? (
            <div className="text-center my-3 loader"></div>
          ) : users.length === 0 ? (
            <p className="text-muted">No creators found.</p>
          ) : (
            <>
              {/* Mobile: Only 3 latest users */}
              <div className="d-block d-md-none">
                {users.slice(0, 2).map((user) => (
                  <div key={user._id} className="card shadow-sm mb-3">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-semibold">{user.name}</h5>
                      <div className="mb-2 d-flex justify-content-center gap-3">
                        {user.instagram && (
                          <a
                            href={user.instagram}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa-brands fa-instagram fs-5 text-danger"></i>
                          </a>
                        )}
                        {user.linkedin && (
                          <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa-brands fa-linkedin fs-5 text-primary"></i>
                          </a>
                        )}
                      </div>
                      <Link
                        to={`/profile/${user.name}`}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Show all users */}
              <div className="d-none d-md-block">
                {users.map((user) => (
                  <div key={user._id} className="card shadow-sm mb-3">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-semibold">{user.name}</h5>
                      <div className="mb-2 d-flex justify-content-center gap-3">
                        {user.instagram && (
                          <a
                            href={user.instagram}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa-brands fa-instagram fs-5 text-danger"></i>
                          </a>
                        )}
                        {user.linkedin && (
                          <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa-brands fa-linkedin fs-5 text-primary"></i>
                          </a>
                        )}
                      </div>
                      <Link
                        to={`/profile/${user.name}`}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-4 p-3 border rounded text-center bg-white">
            <p className="text-black mb-2">Want to write your own blogs?</p>
            <div>
              <Link to="/register" className="btn btn-success btn-sm mx-1">
                Register
              </Link>
              <Link to="/login" className="btn btn-outline-dark btn-sm mx-1">
                Login
              </Link>
            </div>
            <p className="small text-muted mt-2">
              Unlock extra features once logged in.
            </p>
          </div>
        </div>

        {/* Right Column - Blogs */}
        <div className="col-md-8">
          <h4 className="text-dark fw-bold mb-3">Latest Blogs</h4>
          <div className="row">
            {loadingPosts ? (
              <div className="text-center w-100 loader"></div>
            ) : posts.length === 0 ? (
              <p className="text-muted">No blogs available.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="col-md-6 mb-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary fw-semibold">
                        {post.title.length > 40
                          ? post.title.substring(0, 40) + "..."
                          : post.title}
                      </h5>
                      <p className="card-text text-muted mb-2">
                        {post.description.length > 60
                          ? post.description.substring(0, 60) + "..."
                          : post.description}
                      </p>

                      <Link
                        to={`/profile/${post.userName}`}
                        className="btn btn-sm btn-light text-start mb-2"
                      >
                        <i className="fa-solid fa-user-pen me-1"></i>
                        Author: {post.userName}
                      </Link>

                      <p className="text-muted small mb-2">
                        {getTimeAgo(post.timestamp)}
                      </p>

                      <Link
                        to={`/blog/${post._id}`}
                        className="btn btn-outline-secondary btn-sm mt-auto"
                      >
                        Read More{" "}
                        <i className="fa-solid fa-book-open ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">
          &copy; 2025 Blog <i className="fa-solid fa-blog"></i>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
