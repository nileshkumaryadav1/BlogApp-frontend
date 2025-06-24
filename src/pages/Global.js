import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Navbar.css";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const loggedInUserName = localStorage.getItem("name");

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingPosts(false));

    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingUsers(false));
  }, []);

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
    return `${Math.floor(seconds / 86400)} day(s) ago`;
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.userName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const blogOfTheDay = posts[Math.floor(Math.random() * posts.length)];

  return (
    <div className="bg-light min-vh-100">
      {/* HERO */}
      <div className="text-white text-center py-5" style={{ background: "linear-gradient(to right, #000, #2575fc)" }}>
        <h2 className="fw-bold mb-2">Hi {loggedInUserName} 👋</h2>
        <h1 className="fw-bold mb-3">Explore Blogs & Creators</h1>
        <p className="lead mb-4">Search through ideas, authors & stories</p>
        <div className="container d-flex justify-content-center">
          <input
            type="text"
            placeholder="Search users or blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control w-75 w-md-50"
          />
        </div>
      </div>

      <div className="container py-5">
        {/* BLOG OF THE DAY */}
        {blogOfTheDay && (
          <section className="mb-5">
            <h4 className="fw-bold mb-3">🌟 Blog of the Day</h4>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">{blogOfTheDay.title}</h5>
                <p className="text-muted small">{blogOfTheDay.description.slice(0, 100)}...</p>
                <Link to={`/blog/${blogOfTheDay._id}`} className="btn btn-sm btn-outline-primary">
                  Read Now
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* USERS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">👑 Top Creators</h4>
            <Link to="/users" className="btn btn-sm btn-outline-primary">View All</Link>
          </div>
          <div className="row">
            {loadingUsers ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-md-3 mb-3">
                  <div className="card h-100 placeholder-glow p-4 rounded text-center">Loading...</div>
                </div>
              ))
            ) : filteredUsers.length === 0 ? (
              <p className="text-muted">No users found.</p>
            ) : (
              filteredUsers.slice(0, 4).map((user) => (
                <div key={user._id} className="col-md-3 mb-3">
                  <div className="card text-center h-100 shadow-sm">
                    <div className="card-body">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                        className="rounded-circle mb-2"
                        style={{ width: "60px", height: "60px" }}
                      />
                      <h6 className="fw-bold mt-2">{user.name}</h6>
                      <div>
                        {user.instagram && <a href={user.instagram} target="_blank" rel="noreferrer" className="text-danger me-2"><i className="fab fa-instagram"></i></a>}
                        {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-primary"><i className="fab fa-linkedin"></i></a>}
                      </div>
                      <Link to={`/profile/${user.name}`} className="btn btn-outline-dark btn-sm mt-2">View Profile</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* BLOGS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">📝 Latest Blogs</h4>
            <Link to="/blogs" className="btn btn-sm btn-outline-secondary">View All</Link>
          </div>
          <div className="row">
            {loadingPosts ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-md-4 mb-4">
                  <div className="card h-100 placeholder-glow p-4 rounded">Loading...</div>
                </div>
              ))
            ) : filteredPosts.length === 0 ? (
              <p className="text-muted">No blogs found.</p>
            ) : (
              filteredPosts.slice(0, 6).map((post) => (
                <div key={post._id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-semibold text-primary">{post.title.length > 40 ? post.title.slice(0, 40) + "..." : post.title}</h6>
                      <p className="text-muted small mb-2">{post.description.length > 60 ? post.description.slice(0, 60) + "..." : post.description}</p>
                      <Link to={`/profile/${post.userName}`} className="text-decoration-none small mb-2">
                        <i className="fa fa-user me-1"></i> {post.userName}
                      </Link>
                      <span className="text-muted small mb-2">{getTimeAgo(post.timestamp)}</span>
                      <Link to={`/blog/${post._id}`} className="btn btn-outline-primary btn-sm mt-auto">Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* TAGS */}
        <section className="mb-5 text-center">
          <h5 className="fw-bold mb-3">🔥 Trending Tags</h5>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {["Tech", "Coding", "Life", "College", "React", "MERN", "Startup"].map((tag, i) => (
              <span key={i} className="badge bg-secondary text-white px-3 py-2">{tag}</span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white border p-4 rounded shadow-sm">
          <h5 className="fw-bold mb-2">🚀 Become a Blogger Today!</h5>
          <p className="text-muted">Sign up to write your own blogs and share your thoughts.</p>
          <div>
            <Link to="/register" className="btn btn-success btn-sm me-2">Register</Link>
            <Link to="/login" className="btn btn-outline-dark btn-sm">Login</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
