import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function FullBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLikes(response.data.likes || 0);
        setViews((prev) => prev + 1);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  useEffect(() => {
    if (blog?.userName) {
      axios
        .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
        .then((response) => {
          const related = response.data.filter(
            (b) => b._id !== blog._id && b.userName === blog.userName
          );
          setRelatedBlogs(related.slice(0, 3));
        })
        .catch((err) => console.error("Error fetching related blogs:", err));
    }
  }, [blog]);

  const handleLike = () => setLikes((prev) => prev + 1);

  if (!blog)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading blog details...</p>
      </div>
    );

  const estimateReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.split(" ").length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <div className="container">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div
            className="p-5 text-white text-center"
            style={{
              background: "linear-gradient(to right, #141E30, #243B55)",
            }}
          >
            <h1 className="fw-bold mb-3">{blog.title}</h1>
            <p className="mb-1">
              by{" "}
              <a
                href={`/profile/${blog.userName}`}
                className="text-warning fw-semibold text-decoration-none"
              >
                {blog.userName}
              </a>
            </p>
            <small className="text-light">
              🕒 {estimateReadTime(blog.description)} min read
            </small>
            <div className="mt-3">
              <span className="badge bg-success me-2">👁️ {views} views</span>
              <span className="badge bg-danger me-2">❤️ {likes} likes</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLike}
              >
                Like <i className="fa-solid fa-heart ms-1"></i>
              </button>
            </div>
          </div>

          <div className="p-4 bg-white">
            <img
              src={blog.image}
              alt={blog.title}
              className="img-fluid mb-4"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />

            <p
              className="text-dark lh-lg fs-5"
              style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
            >
              {blog.description}
            </p>

            <hr className="my-4" />

            <p className="text-muted">
              Written by{" "}
              <a
                href={`/profile/${blog.userName}`}
                className="fw-semibold text-dark text-decoration-none"
              >
                {blog.userName}
              </a>
            </p>

            <div className="mt-4">
              <h6 className="fw-bold mb-3">🔗 Share this blog:</h6>
              <div className="d-flex flex-wrap gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    blog.title
                  )}&url=https://blogwriting.vercel.app/blog/${blog._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fab fa-twitter me-1"></i> Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blogwriting.vercel.app/blog/${blog._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-info"
                >
                  <i className="fab fa-linkedin me-1"></i> LinkedIn
                </a>
                <a
                  href={`mailto:?subject=${blog.title}&body=Check this out: https://blogwriting.vercel.app/blog/${blog._id}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  <i className="fas fa-envelope me-1"></i> Email
                </a>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://blogwriting.vercel.app/blog/${blog._id}`
                    )
                  }
                  className="btn btn-sm btn-outline-secondary"
                >
                  <i className="fas fa-link me-1"></i> Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="mt-5">
            <h5 className="fw-bold mb-4">📚 More from {blog.userName}</h5>
            <div className="row">
              {relatedBlogs.map((b) => (
                <div key={b._id} className="col-md-4 mb-3">
                  <div className="card h-100 shadow-sm border-0 rounded-4">
                    <div className="card-body d-flex flex-column">
                      <h6 className="fw-bold text-primary">{b.title}</h6>
                      <p className="text-muted small">
                        {b.description.slice(0, 80)}...
                      </p>
                      <a
                        href={`/blog/${b._id}`}
                        className="btn btn-sm btn-outline-primary mt-auto"
                      >
                        Read More{" "}
                        <i className="fa-solid fa-arrow-right ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <h6 className="fw-semibold mb-3">Tags:</h6>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-secondary">#Tech</span>
            <span className="badge bg-secondary">#Coding</span>
            <span className="badge bg-secondary">#JavaScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
