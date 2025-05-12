import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllBlog() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoadingPosts(false));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4 fw-bold">
        <i className="fa-solid fa-blog me-2"></i>Latest Blogs
      </h3>

      {loadingPosts ? (
        <div className="text-center my-5">
          <div className="spinner-border text-secondary" role="status" />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-muted text-center">No blogs available.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
              <div className="card shadow-sm w-100 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-primary">
                    {post.title.length > 40
                      ? post.title.substring(0, 40) + "..."
                      : post.title}
                  </h5>
                  <p className="card-text text-muted mb-3">
                    {post.description.length > 80
                      ? post.description.substring(0, 80) + "..."
                      : post.description}
                  </p>

                  <Link
                    to={`/profile/${post.userName}`}
                    className="btn btn-sm btn-light mb-2 text-start"
                  >
                    <i className="fa-solid fa-user-pen me-1"></i>
                    Author: {post.userName}
                  </Link>

                  <Link
                    to={`/blog/${post._id}`}
                    className="btn btn-outline-dark btn-sm mt-auto"
                  >
                    Read More <i className="fa-solid fa-book-open ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBlog;
