import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://blogapp-server-wa7m.onrender.com/api/blogs");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.userName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortOrder === "oldest") return new Date(a.timestamp) - new Date(b.timestamp);
      return 0;
    });

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
    return `${Math.floor(seconds / 86400)} day(s) ago`;
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <h3 className="text-center fw-bold mb-4">
          <i className="fa-solid fa-blog me-2 text-primary"></i>Latest Blogs
        </h3>

        {/* Search & Sort */}
        <div className="row mb-4 justify-content-between align-items-center">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              placeholder="Search blogs or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control shadow-sm"
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              className="form-select shadow-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-muted text-center">No blogs found.</p>
        ) : (
          <div className="row">
            {filteredPosts.map((post) => (
              <div key={post._id} className="col-md-6 col-lg-4 mb-4 d-flex">
                <div className="card shadow-sm border-0 w-100 h-100 rounded-4">
                  <div className="card-body d-flex flex-column">
                    {/* Title & Tag */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-semibold text-primary mb-0">
                        {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}
                      </h5>
                      <span className="badge bg-info text-white text-uppercase small">
                        {post.tag || "Blog"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted small mb-2">
                      {post.description.length > 100
                        ? post.description.slice(0, 100) + "..."
                        : post.description}
                    </p>

                    {/* Meta */}
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        <i className="fa-regular fa-clock me-1"></i>
                        {getTimeAgo(post.timestamp)}
                      </span>
                      <span>
                        <i className="fa-regular fa-eye me-1"></i>
                        {post.views || 0} views
                      </span>
                    </div>

                    {/* Author */}
                    <Link
                      to={`/profile/${post.userName}`}
                      className="text-decoration-none small text-dark mb-2"
                    >
                      <i className="fa-solid fa-user me-1"></i>
                      {post.userName}
                    </Link>

                    {/* Actions */}
                    <div className="d-flex justify-content-between gap-2 mt-auto">
                      <Link
                        to={`/blog/${post._id}`}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        Read More <i className="fa-solid fa-arrow-right ms-1"></i>
                      </Link>
                      <button className="btn btn-sm btn-outline-secondary w-auto">
                        <i className="fa-solid fa-share-nodes"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBlog;
